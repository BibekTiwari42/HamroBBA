"""
Signals for the accounts app.

- Auto-create a ``UserProfile`` whenever a ``User`` is created.
- Remove the previous avatar file from storage when it is replaced, so we
  don't accumulate orphaned uploads.

Token invalidation on password change is handled synchronously inside
``services.change_password`` (within the same transaction) rather than via a
signal — that keeps the security-critical behaviour co-located with the
operation that triggers it.
"""

import logging

from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

from .models import UserProfile

User = get_user_model()
logger = logging.getLogger("accounts")


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """Ensure every new user has a matching ``UserProfile``."""
    if created:
        UserProfile.objects.get_or_create(user=instance)


@receiver(pre_save, sender=UserProfile)
def delete_previous_avatar(sender, instance: UserProfile, **kwargs):
    """Delete the old avatar file from storage when a new one is uploaded.

    Compares the in-memory instance against the persisted row to detect a
    changed / cleared avatar and removes the now-orphaned file.
    """
    if not instance.pk:
        return

    try:
        current = UserProfile.objects.get(pk=instance.pk)
    except UserProfile.DoesNotExist:
        return

    old_avatar = current.avatar
    new_avatar = instance.avatar

    if old_avatar and old_avatar != new_avatar:
        try:
            old_avatar.delete(save=False)
        except Exception:  # pragma: no cover - storage errors are non-fatal
            logger.warning(
                "accounts.signals: failed to delete previous avatar for user %s",
                instance.user_id,
            )
