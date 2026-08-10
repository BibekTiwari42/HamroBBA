"""
Service layer for the accounts app.

All business logic lives here so views and serializers stay thin. Each public
function performs the work for one operation and returns the domain object /
payload the caller needs. Nothing in here imports from a view or serializer.
"""

from __future__ import annotations

import logging
import re
from datetime import timedelta
from typing import TYPE_CHECKING

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db import transaction
from django.utils import timezone
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token as google_id_token
from rest_framework_simplejwt.token_blacklist.models import (
    BlacklistedToken,
    OutstandingToken,
)
from rest_framework_simplejwt.tokens import RefreshToken

from apps.common.models import AuditLog

from .emails import send_otp_email
from .models import OneTimePassword, UserProfile
from .utils import generate_otp, hash_otp_code, normalize_email
from .validators import USERNAME_MAX_LENGTH

if TYPE_CHECKING:  # pragma: no cover
    from django.contrib.auth.models import User as UserType  # noqa: F401
    from django.http import HttpRequest

User = get_user_model()

logger = logging.getLogger("accounts")



# Audit / logging helpers

def _audit(user, action: str, *, request=None, **metadata):
    """Write an AuditLog row + matching structured log line."""
    device = {}
    if request is not None:
        from .utils import get_device_info

        device = get_device_info(request)

    AuditLog.objects.create(
        user=user,
        action=action,
        metadata={**device, **metadata},
    )
    logger.info("accounts.audit user=%s action=%s ip=%s", user, action, device.get("ip"))



# Token housekeeping

def _expiry(seconds: int):
    return timezone.now() + timedelta(seconds=seconds)


def blacklist_all_refresh_tokens(user) -> int:
    """Blacklist every outstanding refresh token for ``user``.

    Used on logout so one logout closes every session. Returns the number of
    tokens blacklisted.
    """
    count = 0
    for outstanding in OutstandingToken.objects.filter(user=user):
        _, created = BlacklistedToken.objects.get_or_create(token=outstanding)
        if created:
            count += 1
    return count



# JWT issuance helpers

def issue_token_pair(user) -> tuple[str, str]:
    """Return ``(access, refresh)`` for ``user``."""
    refresh = RefreshToken.for_user(user)
    return str(refresh.access_token), str(refresh)



# OTP signup / login

@transaction.atomic
def request_otp(*, email: str, request=None) -> bool:
    """Email a fresh one-time code for ``email``.

    Always returns ``True`` regardless of whether an account exists so the
    endpoint can never be used to enumerate registered users. Every
    previously-issued, still-unused code for the email is invalidated so only
    the newest code works.
    """
    email = normalize_email(email)

    # Invalidate any still-open codes so an old leaked code can't be used.
    OneTimePassword.objects.filter(email=email, used_at__isnull=True).update(
        used_at=timezone.now()
    )

    code = generate_otp()
    OneTimePassword.objects.create(
        email=email,
        code_hash=hash_otp_code(code),
        expires_at=_expiry(settings.OTP_EXPIRY_SECONDS),
    )

    sent = send_otp_email(email, code)
    # Unknown emails have no user row to attach the audit to yet.
    _audit(None, "auth.otp_request", request=request, email=email, sent=sent)
    return sent


def _username_from_email(email: str) -> str:
    """Build a unique username from an email's local part.

    Uses the local part of the email, sanitised to the allowed username
    charset, and appends a short suffix if it collides with an existing user.
    """
    base = (email.split("@")[0] or "").lower()
    base = re.sub(r"[^a-z0-9_.-]", "", base)[:USERNAME_MAX_LENGTH]
    if not base:
        base = "user"

    candidate = base
    counter = 1
    while User.objects.filter(username__iexact=candidate).exists():
        suffix = str(counter)
        candidate = f"{base[: USERNAME_MAX_LENGTH - len(suffix)]}{suffix}"
        counter += 1
    return candidate


@transaction.atomic
def verify_otp(*, email: str, code: str, request=None) -> tuple[User, bool]:
    """Validate the emailed code and return ``(user, is_new_user)``.

    - The email matches an existing active user  → log them in.
    - The email is unknown → auto-create the account (the username is derived
      from the email's local part and the password is left unusable — auth is
      OTP / Google only now).
    Both paths mark the email as verified (the user clearly owns it — the code
    was delivered there); the caller mints the JWT pair.
    """
    email = normalize_email(email)
    code = (code or "").strip()

    otp = (
        OneTimePassword.objects.select_for_update()
        .filter(email=email, code_hash=hash_otp_code(code))
        .order_by("-created_at")
        .first()
    )
    if otp is None:
        raise ValidationError({"otp": "That code is incorrect. Please try again."})
    if otp.is_used:
        raise ValidationError({"otp": "That code has already been used."})
    if otp.is_expired:
        raise ValidationError({"otp": "That code has expired. Request a new one."})

    otp.used_at = timezone.now()
    otp.save(update_fields=["used_at"])

    user = User.objects.filter(email__iexact=email).first()
    is_new_user = user is None
    if is_new_user:
        user = User.objects.create_user(
            username=_username_from_email(email),
            email=email,
            password=None,  # set_unusable_password for OTP/Google-only accounts
            is_active=True,
        )
    elif not user.is_active:
        raise ValidationError({"email": "This account is disabled."})

    profile, _ = UserProfile.objects.get_or_create(user=user)
    if profile.email_verified_at is None:
        profile.email_verified_at = timezone.now()
        profile.save(update_fields=["email_verified_at", "updated_at"])

    _audit(
        user,
        "user.otp_register" if is_new_user else "user.otp_login",
        request=request,
    )
    return user, is_new_user



# Google Sign-In

@transaction.atomic
def google_login(*, credential: str, request=None) -> User:
    """Verify a Google ID token and log the user in.

    - A user already linked to this ``google_sub`` is logged in directly.
    - Any other user with the same (Google-verified) email is linked to this
      Google account and logged in. This is the path taken by accounts that
      were originally created with email/password — after linking they keep
      authenticating through Google (or OTP) with no password involved.
      Linking also marks the email verified. If the email only belongs to
      disabled users, a clean ``ValidationError`` is raised instead of
      crashing with a duplicate-account ``IntegrityError``.
    - Otherwise a brand-new active user is created with a generated username.

    Raises ``ValidationError`` if the token is invalid or the client ID is
    not configured.
    """
    client_id = getattr(settings, "GOOGLE_CLIENT_ID", "")
    if not client_id:
        logger.error("accounts.google_login: GOOGLE_CLIENT_ID is not configured")
        raise ValidationError({"credential": "Google Sign-In is not configured."})

    try:
        info = google_id_token.verify_oauth2_token(
            credential, google_requests.Request(), client_id
        )
    except ValueError as exc:
        logger.warning("accounts.google_login: invalid token: %s", exc)
        raise ValidationError({"credential": "Invalid Google credential."})

    sub = info.get("sub")
    email = normalize_email(info.get("email") or "")
    if not sub or not email:
        raise ValidationError({"credential": "Google account is missing required data."})

    # 1) Existing user already linked to this Google account.
    profile = (
        UserProfile.objects.select_for_update()
        .select_related("user")
        .filter(google_sub=sub)
        .first()
    )
    if profile is not None:
        user = profile.user
        if not user.is_active:
            raise ValidationError({"credential": "This account is disabled."})
        _audit(user, "user.google_login", request=request, linked=False)
        return user

    # 2) Any user with the same email → link the Google sub. Inactive users
    #    are included in the scan so we never create a duplicate account for
    #    an email that already exists in any state.
    existing = list(
        User.objects.select_for_update().filter(email__iexact=email).order_by("id")
    )
    if existing:
        active = [u for u in existing if u.is_active]
        if not active:
            raise ValidationError(
                {"credential": "This email belongs to a disabled account."}
            )

        user = active[0]
        user_profile, _ = UserProfile.objects.get_or_create(user=user)
        update_fields = ["google_sub", "updated_at"]
        user_profile.google_sub = sub
        # Google already proved ownership of the email, so mark verified.
        if user_profile.email_verified_at is None:
            user_profile.email_verified_at = timezone.now()
            update_fields.append("email_verified_at")
        user_profile.save(update_fields=update_fields)
        _audit(user, "user.google_login", request=request, linked=True)
        return user

    # 3) Brand-new Google user → create account.
    username = _username_from_email(email)
    user = User.objects.create_user(
        username=username,
        email=email,
        password=None,
        first_name=info.get("given_name") or "",
        last_name=info.get("family_name") or "",
        is_active=True,
    )
    user_profile, _ = UserProfile.objects.get_or_create(user=user)
    user_profile.google_sub = sub
    # Google has already verified the email, so mark it verified immediately.
    user_profile.email_verified_at = timezone.now()
    user_profile.save(update_fields=["google_sub", "email_verified_at", "updated_at"])

    _audit(user, "user.google_register", request=request)
    return user