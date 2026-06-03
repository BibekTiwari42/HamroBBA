from django.contrib import admin
from .models import Semester, Subject


@admin.register(Semester)
class SemesterAdmin(admin.ModelAdmin):
    list_display = ("name", "order", "slug")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ("name", "semester", "code")
    list_filter = ("semester",)
    search_fields = ("name", "code")
    prepopulated_fields = {"slug": ("name",)}