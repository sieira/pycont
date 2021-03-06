"""pycont URL Configuration.

Two routers are defined:
    * `API_ROUTER` points to the app itself
    * `DOC_ROUTER` points to the documentation endpoints
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include

from drf_yasg import openapi
from drf_yasg.views import get_schema_view

from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView, TokenCookieDeleteView

from pycont.apps.accounts.views import AccountViewSet
from pycont.apps.users.views import user_profile, ObtainJwtPairView

API_ROUTER = DefaultRouter()
DOC_ROUTER = DefaultRouter()

API_ROUTER.register(r'accounts', AccountViewSet, basename='accounts')
API_ROUTER.urls.extend([
    path(r'auth/', ObtainJwtPairView.as_view(), name='login'),
    path(r'auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path(r'auth/delete/', TokenCookieDeleteView.as_view(), name='logout'),
    path(r'profile/', user_profile),
])

# pylint: disable=invalid-name
schema_view = get_schema_view(
    openapi.Info(
        title="PYCONT",
        default_version='v0.0.1',
        description="A perpetually incomplete personal finances app",
        contact=openapi.Contact(email="luis.sieira@spacebar.fr"),
        license=openapi.License(name="BSD-3-Clause License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

DOC_ROUTER.urls.extend([
    url(
        r'^swagger(?P<format>\.json|\.yaml)$',
        schema_view.without_ui(cache_timeout=0),
        name='schema-json'
    ),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
])

urlpatterns = [
    path(r'', include(API_ROUTER.urls)),
    path(r'doc/', include(DOC_ROUTER.urls)),
    url(r'^admin/', admin.site.urls),
]
