"""
Serializers for the accounts app.

These are deliberately thin: they handle serialization + input validation,
delegating business rules to ``validators.py`` and side effects to
``services.py``.
"""

from __future__ import annotations

from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import UserProfile

User = get_user_model()


class UserProfileSerializer(serializers.ModelSerializer):
    """Read/update the owning user's ``UserProfile``."""

    email_verified = serializers.BooleanField(read_only=True)

    class Meta:
        model = UserProfile
        fields = (
            "role",
            "avatar",
            "university",
            "college",
            "semester",
            "phone",
            "bio",
            "theme_preference",
            "language",
            "timezone",
            "email_verified_at",
            "email_verified",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "role",
            "email_verified_at",
            "email_verified",
            "created_at",
            "updated_at",
        )


class UserSerializer(serializers.ModelSerializer):
    """Public representation of a user + their profile."""

    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "is_active",
            "date_joined",
            "profile",
        )
        read_only_fields = fields


class OtpRequestSerializer(serializers.Serializer):
    """Input for POST /auth/otp/request/ — just an email address.

    ``request_otp`` (services.py) decides whether an account exists; the
    serializer only checks that the address is well-formed. Uniqueness is
    deliberately NOT enforced here — existing users must be able to request a
    code too.
    """

    email = serializers.EmailField()


class OtpVerifySerializer(serializers.Serializer):
    """Input for POST /auth/otp/verify/ — email + the emailed 6-digit code."""

    email = serializers.EmailField()
    otp = serializers.RegexField(
        regex=r"^\d{6}$",
        error_messages={
            "invalid": "Enter the 6-digit code sent to your email.",
            "blank": "Enter the 6-digit code sent to your email.",
        },
    )


class GoogleLoginSerializer(serializers.Serializer):
    """Input serializer for Google Sign-In.

    Accepts the Google ID token credential and delegates verification +
    account resolution to ``services.google_login``.
    """

    credential = serializers.CharField(write_only=True)

    def create(self, validated_data):
        from .services import google_login

        request = self.context.get("request")
        return google_login(
            credential=validated_data["credential"],
            request=request,
        )


class LogoutSerializer(serializers.Serializer):
    """Optional body serializer — refresh token usually comes via cookie."""

    refresh = serializers.CharField(required=False, allow_blank=True)