# drivedeck_project/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Add the API urls under the 'api/' namespace
    path('api/', include('core.urls')),
]

# Include URL patterns for TokenAuthentication if needed
from rest_framework.authtoken import views as auth_views
urlpatterns += [
    path('api-token-auth/', auth_views.obtain_auth_token, name='api_token_auth'),
]