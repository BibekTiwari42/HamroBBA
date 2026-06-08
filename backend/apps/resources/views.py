from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Resource
from .serializers import ResourceSerializer
from apps.common.permissions import IsAdminUserOnly


class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.select_related("subject", "subject__semester").all()
    serializer_class = ResourceSerializer

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]

    filterset_fields = [
        "subject",
        "subject__semester",
        "resource_type",
        "is_published",
    ]

    search_fields = [
        "title",
        "description",
        "subject__name",
    ]

    ordering_fields = [
        "created_at",
        "title",
    ]

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAdminUserOnly()]
        return [permissions.IsAuthenticated()]