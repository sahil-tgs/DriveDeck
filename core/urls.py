# core/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from . import auth_views

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'profiles', views.StudentProfileViewSet, basename='studentprofile')
router.register(r'companies', views.CompanyViewSet, basename='company')
router.register(r'drives', views.DriveViewSet, basename='drive')
router.register(r'applications', views.ApplicationViewSet, basename='application')

# The API URLs are now determined automatically by the router
urlpatterns = [
    path('', include(router.urls)),
    # Authentication endpoints
    path('auth/register/', auth_views.register, name='register'),
    path('auth/login/', auth_views.login, name='login'),
    path('auth/logout/', auth_views.logout, name='logout'),
    path('auth/user/', auth_views.get_current_user, name='current_user'),
]