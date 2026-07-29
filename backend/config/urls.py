"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # Authentication endpoints (otp request/verify, google, logout, refresh,
    # me, profile). There is no password-based auth flow anymore.
    path("api/v1/auth/", include("apps.accounts.urls")),

    path("api/v1/", include("apps.resources.urls")),

    path("api/v1/academics/", include("apps.academics.urls")),

    path("api/v1/search/", include("apps.search.urls")),

    path(
        "api/v1/question-bank/",
        include("apps.question_bank.urls"),
    )
]

# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 
# // expose media pubilicly




urlpatterns += [
    path(
        "api/schema/",
        SpectacularAPIView.as_view(),
        name="schema",
    ),

    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(
            url_name="schema"
        ),
        name="swagger-ui",
    ),

    path(
        "api/redoc/",
        SpectacularRedocView.as_view(
            url_name="schema"
        ),
        name="redoc",
    ),
]