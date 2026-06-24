from rest_framework import viewsets, permissions, filters,status
from django_filters.rest_framework import DjangoFilterBackend
from .models import Resource
from .serializers import ResourceSerializer
from apps.common.permissions import IsAdminUserOnly
from django.http import FileResponse, Http404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from apps.common.responses import success_response
from rest_framework.decorators import action



class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.select_related(
    "subject",
    "subject__semester"
    ).all().order_by("-created_at")
    
    serializer_class = ResourceSerializer
    

        

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter]

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
        return [permissions.AllowAny()]
    
    
    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        
        for item in response.data.get("results",[]):
            item["viewer_url"] = request.build_absolute_uri(
                f"/api/v1/resources/view/{item['id']}/"
            )
        
        return Response(response.data)
    
## Syllabus endpoint

    @action(detail=False, methods=["get"])
    def syllabus(self, request):
        subject_slug = request.query_params.get("subject_slug")
    
        if not subject_slug:
            return Response(
                {"error": "subject_slug parameter required"},
                status=status.HTTP_400_BAD_REQUEST
            )      
        
        resource = (
            Resource.objects.select_related("subject")
            .filter(
                subject__slug=subject_slug,
                resource_type="syllabus",
                is_published=True
            )
            .first()
        )
    
        if not resource:
            return Response(
                {"error": "Syllabus not found for the given subject."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        data = self.get_serializer(resource).data
        data["viewer_url"] = request.build_absolute_uri(
            f"/api/v1/resources/view/{resource.id}/"
        )
    
        return Response(data)

## notes (multiple) endpoint

    @action(detail=False, methods=["get"])
    def notes(self, request):
        subject_slug = request.query_params.get("subject_slug")
    
        if not subject_slug:
            return Response(
                {"error": "subject_slug parameter required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        resources = (
            Resource.objects.select_related("subject")
            .filter(
                subject__slug=subject_slug,
                resource_type=Resource.ResourceType.NOTES,
                is_published=True
            )
            .order_by("display_order","unit_number")
        )
        
        serializer = self.get_serializer(resources, many=True)
        data = serializer.data
    
        for item in data:
            item["viewer_url"] = request.build_absolute_uri(
                f"/api/v1/resources/view/{item['id']}/"
            )
    
        return Response(data)


## Past questions (groupby year) endpoint

    @action(detail=False, methods=["get"], url_path="past-questions")
    def past_questions(self, request):
        subject_slug = request.query_params.get("subject_slug")
        
        if not subject_slug:
            return Response(
                {"error": "subject_slug parameter required"},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        resources = (
            Resource.objects.select_related("subject")
            .filter(
                subject__slug=subject_slug,
                resource_type=Resource.ResourceType.PAST_QUESTIONS,
                is_published=True
            )
            .order_by("-question_year")
     )
            
        serializer = self.get_serializer(resources, many=True)
        data = serializer.data
        
        for item in data:
            item["viewer_url"] = request.build_absolute_uri(
                f"/api/v1/resources/view/{item['id']}/"
            )
        
        return Response(data)
        
## secure download endpoint
        
class SecureResourceDownloadView(APIView):
    permission_classes = [  IsAuthenticated]

    def get(self, request, pk):
        try:
            resource = Resource.objects.get(pk=pk)
        except Resource.DoesNotExist:
            raise Http404("Resource not found or not published.")
        
        # Optional: role-based restriction (can extend later)
        if not resource.is_published:
            return Response(
                {"detail": "Resource is not published."}, 
                status=403)
        
        
        
        response = FileResponse(
            resource.open("rb"),
            content_type="application/pdf"
            )
        
        response['Content-Disposition'] = (
        f'attachment; filename="{resource.title}.pdf"'
        )
        return response
    

## secure streaming endpoint

class ResourceStreamView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        try:    
            resource = Resource.objects.get(pk=pk)
        except Resource.DoesNotExist:
            raise Http404("Resource not found or not published.")
        
        if not resource.allow_preview:
            return Response({"detail": "Preview not available."}, status=403)
        
        file = resource.file
        return FileResponse(file.open("rb"), 
                            content_type="application/pdf"
                            )
              
        if resource.viewer_type == "inline":
             response['Content-Disposition'] = (
                 f'inline; filename="{resource.title}.pdf"'
             )
        else:
             response['Content-Disposition'] = (
                 f'attachment; filename="{resource.title}.pdf"'
             )
        
        return response