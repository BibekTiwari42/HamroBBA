from django.urls import path

from .views import (
    PastPaperListView,
    PastPaperDetailView,
)

urlpatterns = [
    path(
        "papers/",
        PastPaperListView.as_view(),
        name="past-paper-list",
    ),

    path(
        "papers/<int:year>/",
        PastPaperDetailView.as_view(),
        name="past-paper-detail",
    ),
]