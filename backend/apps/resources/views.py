from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Resource
from .serializers import ResourceSerializer
from apps.common.permissions import IsAdminUserOnly
from django.http import FileResponse, Http404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from apps.common.responses import success_response



class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.select_related(
    "subject",
    "subject__semester"
    ).all().order_by("-created_at")
    
    serializer_class = ResourceSerializer
    
    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        
        return Response(
            success_response(response.data)
        )

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
    
    
class SecureResourceDownloadView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            resource = Resource.objects.get(pk=pk)
        except Resource.DoesNotExist:
            raise Http404("Resource not found or not published.")
        
        # Optional: role-based restriction (can extend later)
        if not resource.is_published:
            return Response({"detail": "Resource is not published."}, status=403)
        
        file_path = resource.file.path
        
        response = FileResponse(open(file_path, 'rb'))
        response['Content-Disposition'] = f'attachment; filename="{resource.title}.pdf"'
        
        return response