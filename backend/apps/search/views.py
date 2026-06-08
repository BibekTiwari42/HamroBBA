from rest_framework.views import APIView
from rest_framework.response import Response
from apps.resources.models import Resource
from apps.resources.serializers import ResourceSerializer


class SearchAPIView(APIView):
    def get(self, request):
        query = request.GET.get("q", "")

        results = Resource.objects.filter(
            title__icontains=query
        )[:20]

        serializer = ResourceSerializer(results, many=True)

        return Response({
            "success": True,
            "query": query,
            "results": serializer.data
        })