from rest_framework import serializers

from .models import (
    PastPaper,
    PastQuestion,
)


class PastQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PastQuestion
        fields = [
            "id",
            "section",
            "question_number",
            "question_text",
            "marks",
            "display_order",
        ]


class PastPaperListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PastPaper
        fields = [
            "id",
            "year",
            "full_marks",
            "pass_marks",
            "duration",
        ]


class PastPaperDetailSerializer(serializers.ModelSerializer):
    questions = PastQuestionSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = PastPaper
        fields = [
            "id",
            "year",
            "full_marks",
            "pass_marks",
            "duration",
            "instructions",
            "questions",
        ]