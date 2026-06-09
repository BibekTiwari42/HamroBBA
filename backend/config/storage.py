import os
from django.conf import settings
from storages.backends.s3 import S3Storage
from django.core.files.storage import FileSystemStorage


class PrivateMediaStorage(FileSystemStorage):
    """
    Use local filesystem storage for development.
    In production, override with S3Storage by setting USE_S3=True
    """
    def __init__(self):
        location = os.path.join(settings.MEDIA_ROOT, "resources")
        super().__init__(location=location)


class ProductionPrivateMediaStorage(S3Storage):
    """S3 storage for production"""
    location = "resources"
    default_acl = "private"
    file_overwrite = False