from django.contrib import admin

from .models import (
    EmailVerificationToken,
    OneTimePassword,
    PasswordResetToken,
    UserProfile,
)


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "role",
        "university",
        "college",
        "email_verified",
        "google_sub",
        "created_at",
    )
    list_filter = ("role", "theme_preference", "email_verified_at")
    search_fields = ("user__username", "user__email", "university", "college")
    readonly_fields = ("email_verified_at", "created_at", "updated_at")
    date_hierarchy = "created_at"


@admin.register(OneTimePassword)
class OneTimePasswordAdmin(admin.ModelAdmin):
    """Read-only view of issued OTP codes (only the hash is stored)."""

    list_display = ("email", "created_at", "expires_at", "used_at")
    list_filter = ("used_at",)
    search_fields = ("email",)
    readonly_fields = ("email", "code_hash", "created_at", "expires_at", "used_at")
    date_hierarchy = "created_at"


@admin.register(EmailVerificationToken)
class EmailVerificationTokenAdmin(admin.ModelAdmin):
    list_display = ("user", "created_at", "expires_at", "used_at")
    search_fields = ("user__username", "user__email")
    readonly_fields = ("token", "created_at")
    date_hierarchy = "created_at"


@admin.register(PasswordResetToken)
class PasswordResetTokenAdmin(admin.ModelAdmin):
    list_display = ("user", "created_at", "expires_at", "used_at")
    search_fields = ("user__username", "user__email")
    readonly_fields = ("token", "created_at")
    date_hierarchy = "created_at"