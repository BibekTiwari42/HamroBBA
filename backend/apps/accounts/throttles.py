"""
Throttle classes for the accounts app.

Scopes are configured under REST_FRAMEWORK["DEFAULT_THROTTLE_RATES"] in
config/settings/base.py. Each class is intentionally tiny so the rates can be
tuned in one place (settings) without touching view code.

- ``otp_request`` caps how many one-time codes a single IP can ask for, so
  inboxes can't be spammed with sign-in emails.
- ``otp_verify`` caps verification attempts per IP, slowing brute-forcing of
  the 6-digit code space.
"""

from rest_framework.throttling import AnonRateThrottle, UserRateThrottle


class OtpRequestThrottle(AnonRateThrottle):
    scope = "otp_request"


class OtpVerifyThrottle(AnonRateThrottle):
    scope = "otp_verify"


class RefreshTokenThrottle(AnonRateThrottle):
    scope = "refresh"


class AuthenticatedUserThrottle(UserRateThrottle):
    scope = "user"