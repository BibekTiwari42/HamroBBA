from rest_framework import serializers
from .models import Semester, Subject


class SubjectSerializer(serializers.ModelSerializer):
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
            "semester"
        ]


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