from django.db import models
from apps.academics.models import Subject


class PastPaper(models.Model):
    subject = models.ForeignKey(
        Subject, 
        on_delete=models.CASCADE, 
        related_name="past_papers"
    )
    year = models.PositiveIntegerField()
    
    full_marks = models.PositiveIntegerField(
        default=100
        )
    
    pass_marks = models.PositiveIntegerField(
        default=40
        )
    
    duration = models.CharField(
        max_length=100,
        default="3 Hours"
        )
    
    instructions = models.TextField(
        blank=True, 
        null=True
        )
    
    is_published = models.BooleanField(
        default=True
        )
    
    created_at = models.DateTimeField(
        auto_now_add=True
        )
    
    updated_at = models.DateTimeField(
        auto_now=True)

    class Meta:
        ordering = ["-year"]
        
        unique_together = [
            ("subject", "year")
            ]
        
        indexes = [
            models.Index(fields=["subject"]),
            models.Index(fields=["year"]),
            models.Index(fields=["is_published"]),
        ]
        

    def __str__(self):
        return f"{self.subject.name} ({self.year})"


class PastQuestion(models.Model):
    class Section(models.TextChoices):
        GROUP_A = "A", "Group A"
        GROUP_B = "B", "Group B"
        GROUP_C = "C", "Group C"
        GROUP_D = "D", "Group D"

    paper = models.ForeignKey(
        PastPaper, 
        on_delete=models.CASCADE, 
        related_name="questions"
    )
    
    section = models.CharField(
        max_length=10, 
        choices=Section.choices
        )
    
    question_number = models.PositiveIntegerField()
    
    question_text = models.TextField()
    
    marks = models.PositiveIntegerField(
        blank=True, 
        null=True
        )
    
    display_order = models.PositiveIntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = [
            "section",
            "display_order",
            "question_number",
        ]
        
        indexes = [
            models.Index(fields=["paper"]),
            models.Index(fields=["section"]),
        ]

    def __str__(self):
        return f"{self.paper.year} - Q{self.question_number}"
