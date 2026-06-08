from rest_framework import viewsets, permissions
from .models import Resource
from .serializers import ResourceSerializer
from apps.common.permissions import IsAdminUserOnly


class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all().order_by("-created_at")
    serializer_class = ResourceSerializer

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAdminUserOnly()]
        return [permissions.IsAuthenticated()]