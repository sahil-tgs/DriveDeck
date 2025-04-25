# drivedeck_project/urls.py
from django.contrib import admin
from django.urls import path, include # Make sure include is imported

urlpatterns = [
    path('admin/', admin.site.urls),
    # Add the API urls under the 'api/' namespace
    path('api/', include('core.urls')),
    # Add other URL patterns for your project if needed
]

# Include URL patterns for built-in auth views if using SessionAuthentication
# urlpatterns += [
#     path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
# ]