from django.contrib import admin
from .models import Resource


@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ("title", "subject", "resource_type", "created_at", "is_published")
    list_filter = ("resource_type", "subject")
    search_fields = ("title", "description")
    prepopulated_fields = {"slug": ("title",)}