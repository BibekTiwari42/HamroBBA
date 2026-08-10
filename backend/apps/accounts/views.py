"""
Views for the accounts app.

Every view is intentionally thin: input is validated by a serializer, the
real work happens in ``services.py`` and the response is shaped with the
shared envelope helpers. JWT refresh tokens are transported via HttpOnly
cookie (see ``_set_refresh_cookie`` / ``_get_refresh_from_request``).

Authentication is OTP + Google only — there is no password flow.
"""

from __future__ import annotations

from django.conf import settings
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken

from apps.common.responses import error_response, success_response

from .permissions import IsOwner
from .serializers import (
    GoogleLoginSerializer,
    LogoutSerializer,
    OtpRequestSerializer,
    OtpVerifySerializer,
    UserProfileSerializer,
    UserSerializer,
)
from .services import (
    blacklist_all_refresh_tokens,
    google_login,
    issue_token_pair,
    request_otp,
    verify_otp,
)
from .throttles import OtpRequestThrottle, OtpVerifyThrottle

# Refresh-token cookie lifetime (seconds) — matches SIMPLE_JWT REFRESH lifetime.
_REFRESH_COOKIE_MAX_AGE = int(
    settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"].total_seconds()
)


### Cookie helpers

def _set_refresh_cookie(response: Response, refresh: str) -> None:
    response.set_cookie(
        key=settings.JWT_COOKIE_NAME,
        value=refresh,
        max_age=_REFRESH_COOKIE_MAX_AGE,
        httponly=settings.JWT_COOKIE_HTTPONLY,
        secure=settings.JWT_COOKIE_SECURE,
        samesite=settings.JWT_COOKIE_SAMESITE,
        domain=settings.JWT_COOKIE_DOMAIN,
        path=settings.JWT_COOKIE_PATH,
    )


def _clear_refresh_cookie(response: Response) -> None:
    response.delete_cookie(
        key=settings.JWT_COOKIE_NAME,
        domain=settings.JWT_COOKIE_DOMAIN,
        path=settings.JWT_COOKIE_PATH,
    )


def _get_refresh_from_request(request) -> str | None:
    """Prefer the cookie; fall back to the request body for Swagger/tests."""
    cookie_value = request.COOKIES.get(settings.JWT_COOKIE_NAME)
    if cookie_value:
        return cookie_value
    return request.data.get("refresh")


### OTP signup / login

class OtpRequestAPIView(APIView):
    """POST /api/v1/auth/otp/request/ — email a one-time login code.

    Always returns 200 with a generic message so the endpoint cannot be used
    to enumerate which emails have accounts. Covers both login and signup —
    a new address simply gets its account auto-created at ``otp/verify``.
    """

    permission_classes = [AllowAny]
    throttle_classes = [OtpRequestThrottle]

    def post(self, request, *args, **kwargs):
        serializer = OtpRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        request_otp(email=serializer.validated_data["email"], request=request)
        return Response(
            success_response(
                message="If that email is valid, a login code has been sent."
            ),
            status=status.HTTP_200_OK,
        )


class OtpVerifyAPIView(APIView):
    """POST /api/v1/auth/otp/verify/ — exchange the emailed code for a session.

    Logs in an existing user or auto-creates an account for a new email, then
    returns the JWT pair (access in the body, refresh in an HttpOnly cookie)
    plus ``is_new_user`` so the frontend can tailor its welcome message.
    """

    permission_classes = [AllowAny]
    throttle_classes = [OtpVerifyThrottle]

    def post(self, request, *args, **kwargs):
        serializer = OtpVerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        from django.core.exceptions import ValidationError

        try:
            user, is_new_user = verify_otp(
                email=serializer.validated_data["email"],
                code=serializer.validated_data["otp"],
                request=request,
            )
        except ValidationError as exc:
            return Response(
                error_response(message="Verification failed.", errors=str(exc)),
                status=status.HTTP_400_BAD_REQUEST,
            )

        access, refresh = issue_token_pair(user)
        response = Response(
            success_response(
                data={
                    "access": access,
                    "refresh": refresh,
                    "is_new_user": is_new_user,
                    "user": UserSerializer(user).data,
                },
                message=(
                    "Signed in successfully."
                    if not is_new_user
                    else "Account created — welcome to HamroBBA!"
                ),
            ),
            status=status.HTTP_200_OK,
        )
        _set_refresh_cookie(response, refresh)
        return response


class GoogleLoginAPIView(APIView):
    """POST /api/v1/auth/google/ — verify a Google ID token and log in.

    Accepts the Google credential (ID token) in the body, resolves or creates
    the user, and returns the same JWT payload as the OTP flow. The refresh
    token is set as an HttpOnly cookie, matching the existing flow.
    """

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = GoogleLoginSerializer(
            data=request.data, context={"request": request}
        )
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
        except Exception as exc:
            return Response(
                error_response(message="Google Sign-In failed.", errors=str(exc)),
                status=status.HTTP_400_BAD_REQUEST,
            )

        access, refresh = issue_token_pair(user)
        response = Response(
            success_response(
                data={
                    "access": access,
                    "refresh": refresh,
                    "user": UserSerializer(user).data,
                },
                message="Google Sign-In successful.",
            ),
            status=status.HTTP_200_OK,
        )
        _set_refresh_cookie(response, refresh)
        return response


class LogoutAPIView(APIView):
    """POST /api/v1/auth/logout/ — blacklist the refresh token + clear cookie."""

    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        refresh_value = _get_refresh_from_request(request)

        if refresh_value:
            try:
                token = RefreshToken(refresh_value)
                token.blacklist()
            except TokenError:
                # Already blacklisted / invalid — still clear the cookie.
                pass
            except Exception:
                # No token_blacklist app etc. — fail soft, clear cookie.
                pass

        blacklist_all_refresh_tokens(request.user)
        response = Response(
            success_response(message="Logout successful."),
            status=status.HTTP_200_OK,
        )
        _clear_refresh_cookie(response)
        return response


class RefreshTokenAPIView(APIView):
    """POST /api/v1/auth/refresh/ — rotate the refresh token (from cookie).

    The new refresh token is returned in the body AND set as a fresh cookie
    so the client keeps working whether it reads the body or the cookie.
    """

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        refresh_value = _get_refresh_from_request(request)
        if not refresh_value:
            return Response(
                error_response(message="Refresh token is required."),
                status=status.HTTP_401_UNAUTHORIZED,
            )

        from django.contrib.auth import get_user_model

        try:
            token = RefreshToken(refresh_value)
            user_id = token.payload.get("user_id")
        except TokenError as exc:
            return Response(
                error_response(
                    message="Invalid or expired refresh token.",
                    errors=str(exc),
                ),
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Resolve the owning user from the token payload, blacklist the old
        # refresh token, and mint a fresh pair (rotation).
        try:
            user = get_user_model().objects.get(pk=user_id)
        except get_user_model().DoesNotExist:
            return Response(
                error_response(message="Invalid or expired refresh token."),
                status=status.HTTP_401_UNAUTHORIZED,
            )

        try:
            token.blacklist()
        except Exception:
            # Best effort — already blacklisted / blacklist app missing.
            pass

        new_refresh = RefreshToken.for_user(user)
        access = str(new_refresh.access_token)

        response = Response(
            success_response(
                data={"access": access, "refresh": str(new_refresh)},
                message="Token refreshed.",
            ),
            status=status.HTTP_200_OK,
        )
        _set_refresh_cookie(response, str(new_refresh))
        return response



### Current user + profile

class MeAPIView(APIView):
    """GET /api/v1/auth/me/ — the authenticated user + profile."""

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response(
            success_response(data=UserSerializer(request.user).data),
            status=status.HTTP_200_OK,
        )


class ProfileAPIView(generics.RetrieveUpdateAPIView):
    """GET/PATCH /api/v1/auth/profile/ — read/update the caller's profile."""

    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_object(self):
        # Each user owns exactly one profile.
        profile, _ = type(
            self.request.user.profile
        )._default_manager.get_or_create(user=self.request.user)
        return profile

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        return Response(
            success_response(data=self.get_serializer(instance).data),
            status=status.HTTP_200_OK,
        )

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # first_name / last_name live on the User, not the profile. Pull them
        # out of the payload and persist them if provided.
        user_dirty = False
        for field in ("first_name", "last_name"):
            value = request.data.get(field)
            if value is not None and getattr(instance.user, field) != value:
                setattr(instance.user, field, value)
                user_dirty = True
        if user_dirty:
            instance.user.save(update_fields=["first_name", "last_name"])

        # Re-read so the returned payload reflects the user changes too.
        serializer = self.get_serializer(instance)
        return Response(
            success_response(
                data=serializer.data, message="Profile updated."
            ),
            status=status.HTTP_200_OK,
        )