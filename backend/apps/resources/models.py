from django.db import models
from apps.academics.models import Subject

from config.storage import PrivateMediaStorage
class Resource(models.Model):

    class ResourceType(models.TextChoices):
        NOTES = "notes", "Notes"
        SYLLABUS = "syllabus", "Syllabus"
        PAST_QUESTIONS = "past_questions", "Past Questions"
        MODEL_QUESTIONS = "model_questions", "Model Questions"
        IMPORTANT = "important", "Important"

    subject = models.ForeignKey(
        Subject,
        on_delete=models.PROTECT, ##Prevents accidental deletion of a subject that deletes all PDFs
        related_name="resources"
    )

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)

    description = models.TextField(blank=True, null=True)

    resource_type = models.CharField(
        max_length=50,
        choices=ResourceType.choices
    )
    
    viewer_type = models.CharField(
        max_length=50,
        choices=[
            ("inline", "Inline Viewer"),
            ("download", "Download Only"),
        ]
        default="inline"
    )
    
    allow_preview = models.BooleanField(default=True)
    

    file = models.FileField(upload_to="resources/pdfs/",
                            storage=PrivateMediaStorage())


    file_size = models.BigIntegerField(blank=True, null=True)

    is_published = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        indexes = [
            models.Index(fields=["slug"]),
            models.Index(fields=["subject"]),
            models.Index(fields=["resource_type"]),
            models.Index(fields=["created_at"]),
        ]
    def save(self, *args, **kwargs):
        if self.file and not self.file_size:
            self.file_size = self.file.size
        super().save(*args, **kwargs)
        
    def __str__(self):
        return self.title