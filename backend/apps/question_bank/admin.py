from django.contrib import admin
from .models import PastPaper, PastQuestion


class PastQuestionInline(admin.TabularInline):
    model = PastQuestion
    extra = 1


@admin.register(PastPaper)
class PastPaperAdmin(admin.ModelAdmin):
    list_display = (
        "subject",
        "year",
        "is_published",
    )
    list_filter = (
        "year",
        "is_published",
    )
    search_fields = (
        "subject__name",
    )
    inlines = [PastQuestionInline]


@admin.register(PastQuestion)
class PastQuestionAdmin(admin.ModelAdmin):
    list_display = (
        "paper",
        "section",
        "question_number",
    )
    list_filter = (
        "section",
    )
    search_fields = (
        "question_text",
    )
