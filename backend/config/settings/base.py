from pathlib import Path
import os

import environ  # type: ignore

BASE_DIR = Path(__file__).resolve().parent.parent.parent

env = environ.Env()

environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

SECRET_KEY = env("SECRET_KEY")

DEBUG = env.bool("DEBUG", default=False)

ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=[])


### Applications

DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

THIRD_PARTY_APPS = [
    "rest_framework",
    "corsheaders",
    "django_filters",
    "drf_spectacular",
    "django_extensions",
    "rest_framework_simplejwt.token_blacklist",
    "storages",
]

LOCAL_APPS = [
    "apps.accounts",
    "apps.academics",
    "apps.resources",
    "apps.common",
    "apps.search",
    "apps.question_bank",
]

INSTALLED_APPS = (
    DJANGO_APPS
    + THIRD_PARTY_APPS
    + LOCAL_APPS
)

### Middleware

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    # "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

### Authentication Backends

# EmailOrUsernameModelBackend lets users log in with either their username
# or their email address. ModelBackend is kept as a fallback so the Django
# admin and standard auth flows continue to work.

### Authentication Backends

AUTHENTICATION_BACKENDS = [
    "apps.accounts.backends.EmailOrUsernameModelBackend",
    "django.contrib.auth.backends.ModelBackend",
]



### Database

DATABASES = {
    "default": env.db(
        "DATABASE_URL",
        default="sqlite:///db.sqlite3"
    )
}


### Password Validation


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
        "OPTIONS": {
            "min_length": 8,
        },
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    }
]


### Password Hashers

PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.Argon2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2PasswordHasher",
]


### Internationalization

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Asia/Kathmandu"

USE_I18N = True
USE_TZ = True


### Static & Media

STATIC_URL = "/static/"
MEDIA_URL = "/media/"

MEDIA_ROOT = BASE_DIR / "media"
STATIC_ROOT = BASE_DIR / "staticfiles"


### DRF

REST_FRAMEWORK = {
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
    ],    
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
    "EXCEPTION_HANDLER": "apps.common.exceptions.custom_exception_handler",
    
    ## This setting specifies the default schema class used by DRF Spectacular to generate API documentation.
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
   
   ## Throttling
   ## rate-limiting mechanism that controld how many requests a user
   ## /client can make in a give time period.
    
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.AnonRateThrottle",
        "rest_framework.throttling.UserRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "anon": "100/hour",
        "user": "1000/day",
        "otp_request": "5/minute",
        "otp_verify": "10/minute",
        "refresh": "20/minute",
    },
}

SPECTACULAR_SETTINGS = {
    "TITLE": "HamroBBA API",
    "DESCRIPTION": "Backend API for HamroBBA academic resource platform",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,

    "SWAGGER_UI_SETTINGS": {
        "persistAuthorization": True,
    },
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

### SIMPLE JWT SETTINGS

from datetime import timedelta

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "UPDATE_LAST_LOGIN": True,
    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    "AUTH_HEADER_TYPES": ("Bearer",),
    "USER_ID_FIELD": "id",
}

### CORS Configuration 
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

### Cashing config
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "hamrobba-cache",
    }
}

### logging configuration
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,

    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {module} {message}",
            "style": "{",
        },
    },

    "handlers": {
        "file": {
            "level": "INFO",
            "class": "logging.FileHandler",
            "filename": BASE_DIR / "logs/app.log",
            "formatter": "verbose",
        },

        "error_file": {
            "level": "ERROR",
            "class": "logging.FileHandler",
            "filename": BASE_DIR / "logs/error.log",
            "formatter": "verbose",
        },
    },

    "loggers": {
        "django": {
            "handlers": ["file", "error_file"],
            "level": "INFO",
            "propagate": True,
        },
        # Dedicated logger for authentication events. Services write
        # registration / login / logout / password-reset / verification
        # events here with IP + device context.
        "accounts": {
            "handlers": ["file", "error_file"],
            "level": "INFO",
            "propagate": True,
        },
    },
}


## AWS S3 Storage Configuration
AWS_S3_SIGNATURE_VERSION = "s3v4"
AWS_DEFAULT_ACL = None
AWS_QUERYSTRING_AUTH = True
AWS_S3_FILE_OVERWRITE = False

# AWS S3 Credentials (for production use)
AWS_STORAGE_BUCKET_NAME = env("AWS_STORAGE_BUCKET_NAME", default="")
AWS_S3_REGION_NAME = env("AWS_S3_REGION_NAME", default="us-east-1")
AWS_ACCESS_KEY_ID = env("AWS_ACCESS_KEY_ID", default="")
AWS_SECRET_ACCESS_KEY = env("AWS_SECRET_ACCESS_KEY", default="")


### Email

# Real delivery uses Django's SMTP backend with credentials from .env. When
# no SMTP host is configured (e.g. .env was never filled in), the console
# backend keeps local development usable by printing messages to the
# runserver console. Production (config/settings/production.py) always forces
# the SMTP backend so emails can never be silently swallowed.
_default_email_backend = (
    "django.core.mail.backends.smtp.EmailBackend"
    if env("EMAIL_HOST", default="")
    else "django.core.mail.backends.console.EmailBackend"
)
# An explicitly-set EMAIL_BACKEND wins; an empty value is treated as unset so
# it falls back to the host-based default above.
EMAIL_BACKEND = env("EMAIL_BACKEND", default="") or _default_email_backend
EMAIL_HOST = env("EMAIL_HOST", default="")
EMAIL_PORT = env.int("EMAIL_PORT", default=587)
EMAIL_HOST_USER = env("EMAIL_HOST_USER", default="")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD", default="")
EMAIL_USE_TLS = env.bool("EMAIL_USE_TLS", default=True)
EMAIL_USE_SSL = env.bool("EMAIL_USE_SSL", default=False)
# Hard timeout for SMTP connections so a slow / unreachable mail server can
# never hang an auth request. Send failures are already swallowed and logged
# in apps.accounts.emails._send so auth flows stay resilient.
EMAIL_TIMEOUT = env.int("EMAIL_TIMEOUT", default=10)
DEFAULT_FROM_EMAIL = env("DEFAULT_FROM_EMAIL", default="HamroBBA <bibektiwaricsz@gmail.com>")
SERVER_EMAIL = DEFAULT_FROM_EMAIL


### Application URLs (used for link generation in emails)

FRONTEND_URL = env("FRONTEND_URL", default="http://localhost:3000")
BACKEND_URL = env("BACKEND_URL", default="http://localhost:8000")


### OTP login / signup settings

# One-time login codes expire after 10 minutes. The password-based auth flow
# has been replaced by OTP 

OTP_EXPIRY_SECONDS = env.int("OTP_EXPIRY_SECONDS", default=600)


### Google Sign-In

# OAuth 2.0 web client ID from the Google Cloud Console. Used to verify the
# ID token sent by the client during Google Sign-In. Set to empty (the
# default) to disable the /auth/google/ endpoint entirely.
GOOGLE_CLIENT_ID = env("GOOGLE_CLIENT_ID", default="")


### JWT refresh-token cookie settings

# The short-lived access token is returned in the JSON body (held in JS
# memory on the client). The long-lived refresh token is stored in an
# HttpOnly cookie so it is never exposed to JavaScript.
JWT_COOKIE_NAME = "refresh_token"
JWT_COOKIE_SECURE = env.bool("JWT_COOKIE_SECURE", default=False)  # True in production
JWT_COOKIE_HTTPONLY = True
JWT_COOKIE_SAMESITE = env("JWT_COOKIE_SAMESITE", default="Lax")
JWT_COOKIE_DOMAIN = env("JWT_COOKIE_DOMAIN", default=None)
JWT_COOKIE_PATH = "/"
