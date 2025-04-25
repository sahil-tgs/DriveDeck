# core/views.py
from rest_framework import viewsets, permissions
from .models import User, StudentProfile, Company, Drive, Application
from .serializers import (
    UserSerializer, StudentProfileSerializer, CompanySerializer,
    DriveSerializer, ApplicationSerializer
)
# Import custom permissions later if needed

# Basic permission: Allow any user (authenticated or not) to view, but only authenticated to change.
class ReadOnlyOrAuthenticatedCreate(permissions.IsAuthenticatedOrReadOnly):
     def has_permission(self, request, view):
        # Allow read-only methods (GET, HEAD, OPTIONS) for anyone
        if request.method in permissions.SAFE_METHODS:
            return True
        # Allow POST (create) only for authenticated users
        return request.user and request.user.is_authenticated

# More specific permissions will be needed, e.g. IsStudent, IsTnpOfficer

class UserViewSet(viewsets.ReadOnlyModelViewSet): # Read-only for now
    """
    API endpoint that allows users to be viewed.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser] # Only admins can list all users

class StudentProfileViewSet(viewsets.ModelViewSet):
    """
    API endpoint for student profiles.
    Students should only be able to view/edit their own profile.
    TNP officers might view all/edit some fields.
    """
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer
    # TODO: Add custom permissions: IsOwnerOrReadOnly, IsTnpOfficerOrReadOnly
    permission_classes = [permissions.IsAuthenticated] # Basic: Must be logged in

    def get_queryset(self):
        """ Ensure users only see/edit their own profile unless they are TNP/admin """
        user = self.request.user
        if user.is_superuser or user.is_tnp_officer:
            return StudentProfile.objects.all()
        elif user.is_student:
            return StudentProfile.objects.filter(user=user)
        return StudentProfile.objects.none() # No profile for other users

    def perform_create(self, serializer):
        # Ensure profile is created for the requesting user if they are a student
        if self.request.user.is_student:
            serializer.save(user=self.request.user)
        else:
             # Handle error - non-student trying to create profile? Or maybe TNP creates?
             # For now, let's assume students create their own via a dedicated endpoint/signal later.
             # This basic ViewSet might allow TNP to create for any user if permissions allow.
             # serializer.save() # Allow saving if logic permits elsewhere
             pass # Prevent creation via this generic endpoint for now if not student


class CompanyViewSet(viewsets.ModelViewSet):
    """
    API endpoint for companies.
    Viewing allowed for all, creation/editing for TNP officers.
    """
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    # TODO: Add custom permission: IsTnpOfficerOrReadOnly
    permission_classes = [permissions.IsAuthenticatedOrReadOnly] # Allow viewing, restrict edits

class DriveViewSet(viewsets.ModelViewSet):
    """
    API endpoint for drives.
    Viewing allowed for all, creation/editing for TNP officers.
    """
    queryset = Drive.objects.all().order_by('-application_deadline') # Order for display
    serializer_class = DriveSerializer
    # TODO: Add custom permission: IsTnpOfficerOrReadOnly
    permission_classes = [permissions.IsAuthenticatedOrReadOnly] # Allow viewing, restrict edits

class ApplicationViewSet(viewsets.ModelViewSet):
    """
    API endpoint for applications.
    Students can create/view their own.
    TNP can view all/change status.
    """
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    # TODO: Add custom permissions: IsStudentOwnerOrTnpReadOnly etc.
    permission_classes = [permissions.IsAuthenticated] # Must be logged in

    def get_queryset(self):
        """ Filter applications based on user role """
        user = self.request.user
        if user.is_superuser or user.is_tnp_officer:
            return Application.objects.all().select_related('student', 'drive', 'drive__company')
        elif user.is_student:
            return Application.objects.filter(student=user).select_related('student', 'drive', 'drive__company')
        return Application.objects.none()

    def perform_create(self, serializer):
        """ Ensure the application is created for the requesting student """
        if self.request.user.is_student:
             # Prevent applying if already applied (handled by unique_together, but good practice)
            drive = serializer.validated_data.get('drive')
            if Application.objects.filter(student=self.request.user, drive=drive).exists():
                raise serializers.ValidationError("You have already applied to this drive.")
            serializer.save(student=self.request.user)
        else:
            # Raise error or handle case where non-student tries to apply
             raise serializers.ValidationError("Only students can submit applications.")