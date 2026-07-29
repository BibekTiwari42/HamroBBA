from .base import *  # noqa: F401, F403

DEBUG = False


### Production security headers

# HTTPS enforcement and transport security.
SECURE_SSL_REDIRECT = True
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_HSTS_SECONDS = 60 * 60 * 24 * 365  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_REFERRER_POLICY = "same-origin"
SECURE_CONTENT_TYPE_NOSNIFF = True

# Browsers must only transmit cookies (including the JWT refresh cookie) over
# HTTPS, and session/CSRF cookies should never be readable by JavaScript.
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# Clickjacking protection.
X_FRAME_OPTIONS = "DENY"


### Production JWT cookie + email overrides

# In production the refresh-token cookie must be marked Secure so browsers
# only send it over HTTPS.
JWT_COOKIE_SECURE = True

# Production always uses a real SMTP backend (credentials from env vars in
# base.py). Forcing it here means a missing/invalid EMAIL_HOST fails loudly
# at the first send instead of silently falling back to the dev-only console
# backend and dropping verification / password-reset emails.
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
