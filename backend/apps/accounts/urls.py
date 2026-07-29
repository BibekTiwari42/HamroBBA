"""
URL routes for the accounts (auth) app — mounted under /api/v1/auth/.

Authentication is OTP + Google only: users sign in with a 6-digit code they
receive by email (a new address auto-creates its account on verification), or
with Google. There is no password flow.
"""

from django.urls import path

from .views import (
    GoogleLoginAPIView,
    LogoutAPIView,
    MeAPIView,
    OtpRequestAPIView,
    OtpVerifyAPIView,
    ProfileAPIView,
    RefreshTokenAPIView,
)

urlpatterns = [
    path("otp/request/", OtpRequestAPIView.as_view(), name="otp-request"),
    path("otp/verify/", OtpVerifyAPIView.as_view(), name="otp-verify"),
    path("google/", GoogleLoginAPIView.as_view(), name="google-login"),
    path("logout/", LogoutAPIView.as_view(), name="logout"),
    path("refresh/", RefreshTokenAPIView.as_view(), name="refresh"),
    path("me/", MeAPIView.as_view(), name="me"),
    path("profile/", ProfileAPIView.as_view(), name="profile"),
]