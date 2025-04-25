# core/models.py

from django.conf import settings # Import settings to reference AUTH_USER_MODEL easily
from django.db import models
from django.contrib.auth.models import AbstractUser

# --- Custom User Model ---
class User(AbstractUser):
    """
    Custom User model inheriting from AbstractUser.
    Adds role flags for Students and TNP Officers.
    """
    is_student = models.BooleanField('student status', default=False)
    is_tnp_officer = models.BooleanField('tnp officer status', default=False)

    def __str__(self):
        return self.username


# --- Student Profile Model ---
class StudentProfile(models.Model):
    """
    Stores additional information specific to users who are students.
    Linked one-to-one with the User model.
    """
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True
    )
    enrollment_number = models.CharField(max_length=20, unique=True, blank=False, null=False)
    branch = models.CharField(max_length=100, blank=True)
    cgpa = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    skills = models.TextField(blank=True, help_text="Enter skills relevant to placements, comma-separated or one per line.")
    projects = models.TextField(blank=True, help_text="Describe key academic or personal projects.")
    resume_text = models.TextField(blank=True, help_text="Paste resume text or summarize key qualifications.")

    def __str__(self):
        return f"{self.user.username}'s Profile"


# --- Company Model ---
class Company(models.Model):
    """
    Represents a company participating in placement drives.
    """
    name = models.CharField(max_length=200, unique=True, help_text="Name of the company")
    website = models.URLField(blank=True, help_text="Company's official website")
    description = models.TextField(blank=True, help_text="Brief description of the company")
    address = models.TextField(blank=True, help_text="Company's primary address (optional)")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Companies"
        ordering = ['name']

    def __str__(self):
        return self.name


# --- Drive Model ---
class Drive(models.Model):
    """
    Represents a specific placement or internship drive by a company.
    """
    ROLE_FULL_TIME = 'FT'
    ROLE_INTERNSHIP = 'IN'
    ROLE_CHOICES = [
        (ROLE_FULL_TIME, 'Full-Time'),
        (ROLE_INTERNSHIP, 'Internship'),
    ]
    STATUS_UPCOMING = 'UP'
    STATUS_ACTIVE = 'AC'
    STATUS_CLOSED = 'CL'
    STATUS_CHOICES = [
        (STATUS_UPCOMING, 'Upcoming'),
        (STATUS_ACTIVE, 'Active'),
        (STATUS_CLOSED, 'Closed'),
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='drives'
    )
    job_title = models.CharField(max_length=255)
    job_description = models.TextField()
    role_type = models.CharField(
        max_length=2,
        choices=ROLE_CHOICES,
        default=ROLE_FULL_TIME
    )
    eligibility_criteria = models.TextField(
        blank=True,
        help_text="Mention required branch, CGPA cutoff, backlogs allowed, etc."
    )
    package_details = models.CharField(
        max_length=100,
        blank=True,
        help_text="e.g., '15 LPA CTC' or '30,000/month stipend'"
    )
    application_deadline = models.DateTimeField(
        null=True,
        blank=True,
        help_text="Last date and time for students to apply"
    )
    drive_date = models.DateField(
        null=True,
        blank=True,
        help_text="Date when the drive process (e.g., test/interview) is scheduled"
    )
    status = models.CharField(
        max_length=2,
        choices=STATUS_CHOICES,
        default=STATUS_UPCOMING
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-application_deadline', 'company__name']

    def __str__(self):
        return f"{self.company.name} - {self.job_title} ({self.get_role_type_display()})"


# --- Application Model ---
class Application(models.Model):
    """
    Represents a student's application to a specific drive.
    """
    STATUS_APPLIED = 'AP'
    STATUS_SHORTLISTED = 'SH'
    STATUS_SELECTED = 'SL'
    STATUS_REJECTED = 'RJ'
    STATUS_WITHDRAWN = 'WD'
    STATUS_CHOICES = [
        (STATUS_APPLIED, 'Applied'),
        (STATUS_SHORTLISTED, 'Shortlisted'),
        (STATUS_SELECTED, 'Selected'),
        (STATUS_REJECTED, 'Rejected'),
        (STATUS_WITHDRAWN, 'Withdrawn'),
    ]

    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='applications',
        limit_choices_to={'is_student': True} # Helps filter in admin/forms
    )
    drive = models.ForeignKey(
        Drive,
        on_delete=models.CASCADE,
        related_name='applications'
    )
    applied_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=2,
        choices=STATUS_CHOICES,
        default=STATUS_APPLIED
    )
    tnp_comments = models.TextField(
        blank=True,
        help_text="Internal comments by TNP cell regarding this application (e.g., screening notes)"
    )

    class Meta:
        unique_together = ('student', 'drive')
        ordering = ['-applied_at']

    def __str__(self):
        # Need to handle potential None for student or drive if relations aren't solid
        # But ForeignKeys usually ensure they exist if the Application exists
        student_username = self.student.username if self.student else 'N/A'
        drive_title = self.drive.job_title if self.drive else 'N/A'
        company_name = self.drive.company.name if self.drive and self.drive.company else 'N/A'
        return f"{student_username} applied to {drive_title} ({company_name})"