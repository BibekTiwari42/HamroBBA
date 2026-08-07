from rest_framework import serializers
from .models import Semester, Subject, SyllabusUnit


class SubjectSerializer(serializers.ModelSerializer):
    chapter_count = serializers.SerializerMethodField()

    class Meta:
        model = Subject
        fields = [
            "id",
            "name",
            "code",
            "slug",
            "description",
            "syllabus",
            "past_questions",
            "semester",
            "chapter_count"
        ]

    def get_chapter_count(self, obj):
        """Return the count of syllabus units (chapters) for this subject."""
        return obj.units.count()

class SyllabusUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = SyllabusUnit
        fields = (
            "id",
            "subject",
            "unit_number",
            "title",
            "description",
            "lecture_hours",
            "display_order",
        )

class SemesterSerializer(serializers.ModelSerializer):
    subjects = SubjectSerializer(many=True, read_only=True)

    class Meta:
        model = Semester
        fields = [
            "id",
            "name",
            "slug",
            "order",
            "description",
            "subjects"
        ]