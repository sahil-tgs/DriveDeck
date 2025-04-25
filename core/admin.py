# core/admin.py

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# Import ALL your models
from .models import User, StudentProfile, Company, Drive, Application # Add Application

# --- Custom Admin for the Custom User Model ---
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_student', 'is_tnp_officer', 'is_active')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups', 'is_student', 'is_tnp_officer')
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Roles', {'fields': ('is_student', 'is_tnp_officer')}),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        (None, {'fields': ('is_student', 'is_tnp_officer')}),
    )
admin.site.register(User, UserAdmin)


# --- Custom Admin for the StudentProfile Model ---
@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'enrollment_number', 'branch', 'cgpa')
    search_fields = ('user__username', 'enrollment_number', 'branch')
    list_filter = ('branch', 'cgpa')


# --- Custom Admin for the Company Model ---
@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'website', 'created_at', 'updated_at')
    search_fields = ('name', 'description', 'address')
    readonly_fields = ('created_at', 'updated_at')


# --- Custom Admin for the Drive Model ---
@admin.register(Drive)
class DriveAdmin(admin.ModelAdmin):
    list_display = ('company', 'job_title', 'role_type', 'application_deadline', 'status', 'created_at')
    list_filter = ('status', 'role_type', 'company', 'drive_date', 'application_deadline')
    search_fields = ('company__name', 'job_title', 'job_description', 'eligibility_criteria')
    autocomplete_fields = ['company']
    readonly_fields = ('created_at', 'updated_at')


# --- Custom Admin for the Application Model ---
@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    """
    Admin options for Application model.
    """
    list_display = ('student', 'drive', 'status', 'applied_at')
    list_filter = ('status', 'drive__company', 'drive__role_type', 'drive') # Filter by status, company, role, or specific drive
    search_fields = (
        'student__username',        # Search by student username
        'student__first_name',      # Search by student first name
        'student__last_name',       # Search by student last name
        'drive__job_title',         # Search by drive job title
        'drive__company__name'      # Search by company name
    )
    autocomplete_fields = ['student', 'drive'] # Makes selecting easier
    readonly_fields = ('applied_at',)          # This is set automatically on creation

    # Customize the edit page layout
    fieldsets = (
        (None, { # Main application details
            'fields': ('student', 'drive', 'status', 'applied_at')
        }),
        ('TNP Notes', { # Section for internal comments
            'fields': ('tnp_comments',)
        }),
    )