# core/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views # Import views from the current directory

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'profiles', views.StudentProfileViewSet, basename='studentprofile')
router.register(r'companies', views.CompanyViewSet, basename='company')
router.register(r'drives', views.DriveViewSet, basename='drive')
router.register(r'applications', views.ApplicationViewSet, basename='application')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
    # We can add custom API endpoints here later if needed
    # e.g., path('auth/', include('dj_rest_auth.urls')), # If using dj-rest-auth
]