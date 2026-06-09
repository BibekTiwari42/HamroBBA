from django.db.models import Q, Case, When, Value, IntegerField
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.resources.models import Resource
from apps.resources.serializers import ResourceSerializer


class SearchAPIView(APIView):
    def get(self, request):
        query = request.GET.get("q", "").strip()

        subject_id = request.GET.get("subject")
        semester_id = request.GET.get("semester")
        resource_type = request.GET.get("type")

        if not query:
            return Response({
                "success": False,
                "message": "Query is required",
                "results": []
            })

        results = Resource.objects.select_related(
            "subject",
            "subject__semester"
        ).annotate(
            relevance=Case(
                When(title__icontains=query, then=Value(3)),
                When(subject__name__icontains=query, then=Value(2)),
                When(description__icontains=query, then=Value(1)),
                default=Value(0),
                output_field=IntegerField()
            )
        ).filter(
            Q(title__icontains=query) |
            Q(description__icontains=query) |
            Q(subject__name__icontains=query) |
            Q(subject__semester__name__icontains=query)
        ).order_by("-relevance")[:20]

        if subject_id:
            results = results.filter(subject_id=subject_id)

        if semester_id:
            results = results.filter(subject__semester_id=semester_id)

        if resource_type:
            results = results.filter(resource_type=resource_type)

        serializer = ResourceSerializer(results, many=True)

        return Response({
            "success": True,
            "query": query,
            "count": len(serializer.data),
            "results": serializer.data
        })
        query = request.GET.get("q", "").strip()

        if not query:
            return Response({
                "success": False,
                "message": "Query parameter 'q' is required",
                "results": []
            })

        results = Resource.objects.select_related(
            "subject",
            "subject__semester"
        ).filter(
            Q(title__icontains=query) |
            Q(description__icontains=query) |
            Q(subject__name__icontains=query) |
            Q(subject__semester__name__icontains=query)
        ).distinct()[:20]

        serializer = ResourceSerializer(results, many=True)

        return Response({
            "success": True,
            "query": query,
            "count": len(serializer.data),
            "results": serializer.data
        })