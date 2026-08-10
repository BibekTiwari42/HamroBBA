"""
Custom authentication backends.

``EmailOrUsernameModelBackend`` lets users authenticate using either their
username or their email address. A single login form field (e.g. ``login``)
is accepted and we transparently resolve it to the right lookup.
"""

from __future__ import annotations

from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.db.models import Q

User = get_user_model()


class EmailOrUsernameModelBackend(ModelBackend):
    """Authenticate against either a username or an email address."""

    def authenticate(self, request, username=None, password=None, **kwargs):
        if username is None:
            # Allow callers to pass ``email=`` / ``login=`` instead of
            # ``username=`` for a friendlier API surface.
            username = kwargs.get("login") or kwargs.get("email")

        if username is None or password is None:
            return None

        # Normalise the identifier so an upper-case email still matches.
        identifier = username.strip().lower()

        try:
            user = User.objects.get(
                Q(username__iexact=username) | Q(email__iexact=identifier)
            )
        except User.DoesNotExist:
            # Run the default password hasher anyway to avoid timing attacks
            # that would otherwise reveal whether an account exists.
            User().set_password(password)
            return None
        except User.MultipleObjectsReturned:
            user = User.objects.filter(email__iexact=identifier).first()

        if user is None or not user.check_password(password):
            return None

        # ``user_can_authenticate`` rejects inactive / banned users.
        return user if self.user_can_authenticate(user) else None
