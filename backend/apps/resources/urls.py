from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ResourceViewSet, SecureResourceDownloadView, ResourceStreamView

router = DefaultRouter()
router.register(r"resources", ResourceViewSet, basename="resources")

urlpatterns = [
    path("", include(router.urls)),

    path(
        "resources/download/<int:pk>/",
        SecureResourceDownloadView.as_view(),
        name="secure-download"
    ),
    
    path(
        "resources/view/<int:pk>/",
        ResourceStreamView.as_view(),
        name="resource-stream"
    ),
]