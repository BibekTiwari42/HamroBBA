from django.db import models
from django.utils.text import slugify

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

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
        
    def __str__(self):
        return self.name
    
class SyllabusUnit(models.Model):
    subject = models.ForeignKey(
        Subject,
        on_delete=models.CASCADE,
        related_name="units"
    )

    unit_number = models.PositiveSmallIntegerField()

    title = models.CharField(max_length=255)

    description = models.TextField(
        blank=True,
        help_text="Short summary shown on chapter cards."
    )

    lecture_hours = models.PositiveSmallIntegerField(
        default=0,
        help_text="Official lecture hours from TU syllabus."
    )

    display_order = models.PositiveSmallIntegerField(
        default=1
    )

    class Meta:
        ordering = ["display_order", "unit_number"]

        unique_together = (
            "subject",
            "unit_number",
        )

        indexes = [
            models.Index(fields=["subject"]),
            models.Index(fields=["display_order"]),
        ]

    def __str__(self):
        return f"{self.subject.name} - Unit {self.unit_number}"