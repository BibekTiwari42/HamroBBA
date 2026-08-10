"""
Custom permission classes for the accounts app.

These read the ``role`` / ``email_verified`` claims straight from the JWT
when available, and fall back to the database ``UserProfile`` otherwise —
so they keep working for session-authenticated requests (e.g. admin tests)
and for tokens minted before the claims were added.
"""

from __future__ import annotations

from rest_framework.permissions import BasePermission, SAFE_METHODS


def _profile(user):
    return getattr(user, "profile", None)


def _role_from_claims(request):
    """Return the role claim if the request carries a SimpleJWT token."""
    auth = getattr(request, "auth", None)
    if auth is None:
        return None
    try:
        return auth.get("role") or auth["role"]
    except (AttributeError, KeyError, TypeError):
        return None


def _email_verified_from_claims(request):
    auth = getattr(request, "auth", None)
    if auth is None:
        return None
    try:
        value = auth.get("email_verified")
    except (AttributeError, TypeError):
        return None
    return value if isinstance(value, bool) else None


class IsOwner(BasePermission):
    """Allow access only to the owner of the target object.

    The object must expose ``user`` (e.g. ``UserProfile``). For list/detail
    actions, pair with ``get_queryset`` scoping.
    """

    def has_object_permission(self, request, view, obj):
        target_user = getattr(obj, "user", obj)
        return request.user == target_user


class IsStudent(BasePermission):
    """Allow access only to users whose role is ``student``."""

    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        role = _role_from_claims(request)
        if role is None:
            profile = _profile(request.user)
            role = profile.role if profile else None
        return role == "student"


class IsAdmin(BasePermission):
    """Allow access only to users whose role is ``admin``.

    Note: this checks the application role on ``UserProfile``, independent of
    Django's ``is_staff`` / ``is_superuser`` flags.
    """

    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        role = _role_from_claims(request)
        if role is None:
            profile = _profile(request.user)
            role = profile.role if profile else None
        return role == "admin"


class IsVerifiedUser(BasePermission):
    """Allow access only to users who have verified their email.

    Applied on a per-endpoint basis — verification is optional for the
    platform as a whole (see ``EMAIL_VERIFICATION_REQUIRED``).
    """

    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        verified = _email_verified_from_claims(request)
        if verified is None:
            profile = _profile(request.user)
            verified = profile.email_verified if profile else False
        return bool(verified)


class ReadOnly(BasePermission):
    """Convenience permission restricting access to safe (GET/HEAD/OPTIONS)."""

    def has_permission(self, request, view):
        return request.method in SAFE_METHODS
