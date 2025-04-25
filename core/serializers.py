# core/serializers.py
from rest_framework import serializers
from .models import User, StudentProfile, Company, Drive, Application

# Note: Exposing the full User model via API needs care regarding sensitive fields like password.
# Consider using libraries like 'djoser' for more robust user management endpoints later.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Select fields carefully - avoid exposing password hash etc.
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_student', 'is_tnp_officer']


class StudentProfileSerializer(serializers.ModelSerializer):
    # Optionally include related user details (read-only)
    # user = UserSerializer(read_only=True) # Include nested user data
    username = serializers.CharField(source='user.username', read_only=True) # Simpler: just username

    class Meta:
        model = StudentProfile
        # Include 'user' field if you want to *set* the user on creation (usually done automatically)
        # But since it's the primary key, it's implicitly handled.
        fields = ['user', 'username', 'enrollment_number', 'branch', 'cgpa', 'phone_number', 'skills', 'projects', 'resume_text']
        read_only_fields = ['user'] # User cannot be changed after creation


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name', 'website', 'description', 'address', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']


class DriveSerializer(serializers.ModelSerializer):
    # Show company name instead of just ID (read-only)
    company_name = serializers.CharField(source='company.name', read_only=True)

    class Meta:
        model = Drive
        fields = [
            'id', 'company', 'company_name', 'job_title', 'job_description',
            'role_type', 'eligibility_criteria', 'package_details',
            'application_deadline', 'drive_date', 'status',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


class ApplicationSerializer(serializers.ModelSerializer):
    # Show readable names/details for related fields
    student_username = serializers.CharField(source='student.username', read_only=True)
    drive_title = serializers.CharField(source='drive.job_title', read_only=True)
    company_name = serializers.CharField(source='drive.company.name', read_only=True)

    class Meta:
        model = Application
        fields = [
            'id', 'student', 'student_username', 'drive', 'drive_title', 'company_name',
            'applied_at', 'status', 'tnp_comments'
        ]
        # Student and drive are required on creation, status defaults to 'AP', applied_at is auto.
        # Make student read-only after creation? Usually yes.
        read_only_fields = ['applied_at', 'student'] # Can't change who applied

        # Add validation if needed, e.g., ensure student is_student=True