from rest_framework import serializers
from .models import Resource


class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = [
            "id",
            "subject",
            "title",
            "slug",
            "description",
            "resource_type",
            "unit_number",
            "question_year",
            "display_order",
            "viewer_type",
            "allow_preview",
            "file",
            "file_size",
            "is_published",
            "created_at",
            "updated_at"
        ]
        read_only_fields = ("file_size", "created_at", "updated_at")