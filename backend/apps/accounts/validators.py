"""
Reusable validators for the accounts app.

These keep all reusable validation logic out of serializers and views, as the
project conventions require. Each function raises ``django.core.validators.
ValidationError`` so they integrate cleanly with DRF and Django forms alike.
"""

from __future__ import annotations

import re

from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator, RegexValidator
from django.utils.translation import gettext_lazy as _

User = get_user_model()

# Keep these as module-level constants so they can be reused / tuned in one
# place if the password policy changes.
USERNAME_MIN_LENGTH = 3
USERNAME_MAX_LENGTH = 30
PASSWORD_MIN_LENGTH = 8

username_regex = RegexValidator(
    regex=r"^[A-Za-z0-9_.-]+$",
    message=_(
        "Username may only contain letters, numbers, underscores, "
        "dots and hyphens."
    ),
)

_email_validator = EmailValidator(message=_("Enter a valid email address."))


def validate_username(value: str) -> str:
    """Validate username length, allowed characters and uniqueness."""
    value = (value or "").strip()

    if len(value) < USERNAME_MIN_LENGTH:
        raise ValidationError(
            _("Username must be at least %(n)s characters long.")
            % {"n": USERNAME_MIN_LENGTH}
        )

    if len(value) > USERNAME_MAX_LENGTH:
        raise ValidationError(
            _("Username may not exceed %(n)s characters.")
            % {"n": USERNAME_MAX_LENGTH}
        )

    username_regex(value)

    if User.objects.filter(username__iexact=value).exists():
        raise ValidationError(_("This username is already taken."))

    return value


def validate_email(value: str, *, exclude_user=None) -> str:
    """Validate email format + uniqueness (case-insensitive).

    ``exclude_user`` lets a profile update keep the user's own email.
    """
    from apps.accounts.utils import normalize_email

    value = normalize_email(value)
    _email_validator(value)

    qs = User.objects.filter(email__iexact=value)
    if exclude_user is not None:
        qs = qs.exclude(pk=exclude_user.pk)

    if qs.exists():
        raise ValidationError(_("An account with this email already exists."))

    return value


def validate_strong_password(password: str) -> str:
    """Enforce the project password policy on top of Django's validators.

    Adds explicit checks for uppercase, lowercase, digit and special
    character so the error messages are user-friendly, then defers to
    Django's ``validate_password`` for the common / attribute / length rules.
    """
    if password is None:
        raise ValidationError(_("Password is required."))

    if len(password) < PASSWORD_MIN_LENGTH:
        raise ValidationError(
            _("Password must be at least %(n)s characters long.")
            % {"n": PASSWORD_MIN_LENGTH}
        )

    if not re.search(r"[A-Z]", password):
        raise ValidationError(
            _("Password must contain at least one uppercase letter.")
        )

    if not re.search(r"[a-z]", password):
        raise ValidationError(
            _("Password must contain at least one lowercase letter.")
        )

    if not re.search(r"\d", password):
        raise ValidationError(_("Password must contain at least one digit."))

    if not re.search(r"[^A-Za-z0-9]", password):
        raise ValidationError(
            _("Password must contain at least one special character.")
        )

    # Defer the common-password / numeric / user-attribute similarity rules
    # to Django's configured validators (see AUTH_PASSWORD_VALIDATORS).
    validate_password(password)

    return password
