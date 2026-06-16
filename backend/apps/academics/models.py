from django.db import models


class Semester(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(unique=True)
    order = models.IntegerField(unique=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ["order"]
        indexes = [
            models.Index(fields=["slug"]),
        ]

    def __str__(self):
        return self.name


class Subject(models.Model):
    semester = models.ForeignKey(
        Semester,
        on_delete=models.CASCADE,
        related_name="subjects"
    )
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True, null=True)
    syllabus = models.JSONField(
        default=dict,
        blank=True,
        null=True,
        help_text="Syllabus structure with units and topics"
    )
    past_questions = models.JSONField(
        default=dict,
        blank=True,
        null=True,
        help_text="Past year questions grouped by year"
    )

    class Meta:
        indexes = [
            models.Index(fields=["slug"]),
            models.Index(fields=["semester"]),
        ]

    def __str__(self):
        return self.name