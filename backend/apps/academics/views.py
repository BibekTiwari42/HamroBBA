from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator

from .models import Semester, Subject
from .serializers import (
    SemesterSerializer,
    SubjectSerializer,
)


class SemesterViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Semester.objects.all().order_by("order")
    serializer_class = SemesterSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=["get"])
    def by_slug(self, request):
        """Get semester by slug"""
        slug = request.query_params.get("slug")
        if not slug:
            return Response(
                {"error": "slug parameter required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            semester = Semester.objects.get(slug=slug)
            serializer = self.get_serializer(semester)
            return Response(serializer.data)
        except Semester.DoesNotExist:
            return Response(
                {"error": "Semester not found"},
                status=status.HTTP_404_NOT_FOUND
            )
 ## Caching the SubjectViewSet for better performance since subjects and their details don't change frequently.
@method_decorator(
    cache_page(60 * 60),  # Cache for 1 hour
    name='dispatch'
)

class SubjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Subject.objects.select_related("semester").all()
    serializer_class = SubjectSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"

    @action(detail=False, methods=["get"])
    def by_slug(self, request):
        """Get subject by slug"""
        slug = request.query_params.get("slug")
        if not slug:
            return Response(
                {"error": "slug parameter required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            subject = Subject.objects.select_related("semester").get(slug=slug)
            serializer = self.get_serializer(subject)
            return Response(serializer.data)
        except Subject.DoesNotExist:
            return Response(
                {"error": "Subject not found"},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=["get"])
    def by_semester_slug(self, request):
        """Get all subjects for a semester by slug"""
        semester_slug = request.query_params.get("semester_slug")
        if not semester_slug:
            return Response(
                {"error": "semester_slug parameter required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            semester = Semester.objects.get(slug=semester_slug)
            subjects = Subject.objects.filter(semester=semester).order_by("id")
            serializer = self.get_serializer(subjects, many=True)
            return Response(serializer.data)
        except Semester.DoesNotExist:
            return Response(
                {"error": "Semester not found"},
                status=status.HTTP_404_NOT_FOUND
            )