from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import PastPaper
from .serializers import (
    PastPaperListSerializer,
    PastPaperDetailSerializer,
)


class PastPaperListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        subject_slug = request.query_params.get(
            "subject_slug"
        )

        if not subject_slug:
            return Response(
                {
                    "error":
                    "subject_slug parameter required"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        papers = (
            PastPaper.objects
            .select_related("subject")
            .filter(
                subject__slug=subject_slug,
                is_published=True,
            )
            .order_by("-year")
        )

        serializer = PastPaperListSerializer(
            papers,
            many=True,
        )

        return Response(serializer.data)


class PastPaperDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, year):
        subject_slug = request.query_params.get(
            "subject_slug"
        )

        if not subject_slug:
            return Response(
                {
                    "error":
                    "subject_slug parameter required"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        paper = get_object_or_404(
            PastPaper.objects.prefetch_related(
                "questions"
            ),
            subject__slug=subject_slug,
            year=year,
            is_published=True,
        )

        serializer = PastPaperDetailSerializer(
            paper
        )

        return Response(serializer.data)