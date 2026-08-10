"""
Custom SimpleJWT serializers.

The access token is enriched with ``role`` and ``email_verified`` claims so
the frontend / permission classes can branch on them without an extra DB
hit for every request.
"""

from __future__ import annotations

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


def _get_profile_claims(user):
    """Pull role + email_verified from the related profile, if present."""
    profile = getattr(user, "profile", None)
    if profile is None:
        return {"role": "student", "email_verified": False}
    return {
        "role": profile.role,
        "email_verified": profile.email_verified,
    }


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """JWT pair serializer that adds role/email_verified claims + username."""

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        for key, value in _get_profile_claims(user).items():
            token[key] = value
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        # Surface the key user fields on the login response itself so the
        # frontend doesn't have to immediately call /me/.
        data["user"] = {
            "id": self.user.id,
            "username": self.user.username,
            "email": self.user.email,
            "first_name": self.user.first_name,
            "last_name": self.user.last_name,
            **_get_profile_claims(self.user),
        }
        return data
