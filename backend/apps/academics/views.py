from rest_framework import viewsets, permissions
from .models import Semester, Subject
from .serializers import SemesterSerializer, SubjectSerializer


class SemesterViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer
    permission_classes = [permissions.IsAuthenticated]


class SubjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Subject.objects.select_related("semester").all()
    serializer_class = SubjectSerializer
    permission_classes = [permissions.IsAuthenticated]