from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SemesterViewSet, SubjectViewSet, SyllabusUnitViewSet

router = DefaultRouter()
router.register(r"semesters", SemesterViewSet, basename="semesters")
router.register(r"subjects", SubjectViewSet, basename="subjects")
router.register(r"units", SyllabusUnitViewSet, basename="units")

urlpatterns = router.urls