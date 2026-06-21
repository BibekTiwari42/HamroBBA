from django.contrib import admin
from .models import Resource


@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "subject",
        "resource_type",
        "unit_number",
        "question_year",
        "display_order",
        "is_published",
    )

    list_filter = (
        "resource_type",
        "is_published",
        "subject",
    )

    search_fields = (
        "title",
        "subject__name",
    )

    ordering = (
        "subject",
        "display_order",
    )