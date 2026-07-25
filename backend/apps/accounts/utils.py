"""
Small helpers shared across the accounts app.

Keeping these as plain functions (rather than a mixin) makes them trivial to
unit-test and reuse from services, signals and views alike.
"""

from __future__ import annotations

import hashlib
import logging
import secrets

from django.conf import settings

logger = logging.getLogger("accounts")

OTP_DIGITS = 6


def normalize_email(email: str | None) -> str:
    """Lower-case and strip whitespace from an email address."""
    if not email:
        return ""
    return email.strip().lower()


def generate_otp() -> str:
    """Return a cryptographically-random ``OTP_DIGITS``-digit code."""
    return f"{secrets.randbelow(10**OTP_DIGITS):0{OTP_DIGITS}d}"


def hash_otp_code(code: str) -> str:
    """Return the SHA-256 hex digest of an OTP code.

    Codes are never persisted in plaintext; only the digest is stored so the
    database is useless to an attacker even if it is fully exfiltrated.
    """
    return hashlib.sha256(code.encode("utf-8")).hexdigest()


def get_client_ip(request) -> str:
    """Best-effort extraction of the client IP from a request.

    Falls back through ``X-Forwarded-For`` ( honouring the first hop ) and
    ``X-Real-IP`` before landing on ``REMOTE_ADDR``.
    """
    if request is None:
        return ""

    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        # First entry is the originating client.
        return x_forwarded_for.split(",")[0].strip()

    return (
        request.META.get("HTTP_X_REAL_IP")
        or request.META.get("REMOTE_ADDR")
        or ""
    )


def get_device_info(request) -> dict:
    """Return a compact description of the client device for audit/logging."""
    user_agent = ""
    if request is not None:
        user_agent = request.META.get("HTTP_USER_AGENT", "")

    return {
        "ip": get_client_ip(request),
        "user_agent": user_agent,
    }


def build_frontend_url(*parts: str) -> str:
    """Join ``FRONTEND_URL`` with path parts, normalising slashes."""
    base = settings.FRONTEND_URL.rstrip("/")
    joined = "/".join(str(p).strip("/") for p in parts if p)
    return f"{base}/{joined}" if joined else base
