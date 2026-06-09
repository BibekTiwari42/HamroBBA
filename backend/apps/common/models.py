from django.conf import settings #type: ignore
from django.db import models  #type: ignore


class AuditLog(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    action = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)

    metadata = models.JSONField(
        blank=True,
        null=True
    )

    def __str__(self):
        return self.action