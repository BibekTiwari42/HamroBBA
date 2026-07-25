import uuid

from django.conf import settings
from django.db import models
from django.utils import timezone


class UserProfile(models.Model):
    class Role(models.TextChoices):
        STUDENT = "student", "Student"
        ADMIN = "admin", "Admin"

    class ThemePreference(models.TextChoices):
        LIGHT = "light", "Light"
        DARK = "dark", "Dark"
        SYSTEM = "system", "System"

    user: models.OneToOneField = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
    )

    role: models.CharField = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.STUDENT,
    )

    # Optional profile fields — all nullable so existing accounts and the
    # registration flow keep working without forcing users to fill these in.
    avatar = models.ImageField(
        upload_to="avatars/",
        blank=True,
        null=True,
    )
    university = models.CharField(max_length=255, blank=True, default="")
    college = models.CharField(max_length=255, blank=True, default="")
    semester = models.CharField(max_length=100, blank=True, default="")
    phone = models.CharField(max_length=20, blank=True, default="")
    bio = models.TextField(blank=True, default="")
    theme_preference = models.CharField(
        max_length=10,
        choices=ThemePreference.choices,
        default=ThemePreference.SYSTEM,
    )
    language = models.CharField(max_length=10, default="en")
    timezone = models.CharField(max_length=50, default="Asia/Kathmandu")

    # Populated when the user clicks the (optional) email-verification link.
    email_verified_at = models.DateTimeField(blank=True, null=True)

    # Google's unique subject identifier, set when the user signs in via
    # Google. Blank for password-only accounts. Used to link a Google account
    # to an existing user and to prevent duplicate account creation.
    google_sub = models.CharField(max_length=64, blank=True, default="", db_index=True)

    created_at: models.DateTimeField = models.DateTimeField(auto_now_add=True)
    updated_at: models.DateTimeField = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "User Profile"
        verbose_name_plural = "User Profiles"

    def __str__(self) -> str:
        return f"{self.user.username} - {self.role}"

    @property
    def email_verified(self) -> bool:
        return self.email_verified_at is not None


class BaseToken(models.Model):
    """
    Abstract base for single-use, time-limited tokens shared by the email
    verification and password reset flows.

    Subclasses define ``expires_at`` via the owning service layer using the
    relevant ``PASSWORD_RESET_TIMEOUT`` / ``EMAIL_VERIFICATION_TIMEOUT``
    settings when creating rows.
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="+",
    )
    token = models.UUIDField(
        default=uuid.uuid4,
        editable=False,
        unique=True,
        db_index=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    used_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        abstract = True

    @property
    def is_expired(self) -> bool:
        return timezone.now() >= self.expires_at

    @property
    def is_used(self) -> bool:
        return self.used_at is not None

    @property
    def is_valid(self) -> bool:
        """A token is valid only if unused and not past its expiry."""
        return not self.is_used and not self.is_expired


class EmailVerificationToken(BaseToken):
    """
    Single-use token emailed to a user so they can (optionally) verify their
    email address. Verification is not required to log in unless
    ``EMAIL_VERIFICATION_REQUIRED`` is enabled.
    """

    class Meta:
        verbose_name = "Email Verification Token"
        verbose_name_plural = "Email Verification Tokens"

    def __str__(self) -> str:
        return f"Verification token for {self.user.username}"


class PasswordResetToken(BaseToken):
    """Single-use token used to reset a forgotten password."""

    class Meta:
        verbose_name = "Password Reset Token"
        verbose_name_plural = "Password Reset Tokens"

    def __str__(self) -> str:
        return f"Password reset token for {self.user.username}"


class OneTimePassword(models.Model):
    """A six-digit one-time code emailed for OTP-based signup / login.

    Keyed by the *email address* rather than a ``User`` FK because the code is
    issued before an account exists — signing in with an unknown email
    auto-creates the account on verification.

    Only the SHA-256 hash of the code is stored, so a leaked database can
    never be replayed to impersonate a user. Requesting a new code for the
    same email invalidates every previously-issued (still open) code.
    """

    email = models.EmailField(blank=False, db_index=True)
    code_hash = models.CharField(max_length=64)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    used_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        verbose_name = "One-Time Password"
        verbose_name_plural = "One-Time Passwords"

    def __str__(self) -> str:
        return f"OTP for {self.email} at {self.created_at:%Y-%m-%d %H:%M}"

    @property
    def is_expired(self) -> bool:
        return timezone.now() >= self.expires_at

    @property
    def is_used(self) -> bool:
        return self.used_at is not None

    @property
    def is_valid(self) -> bool:
        """A code is valid only if unused and not past its expiry."""
        return not self.is_used and not self.is_expired
