// src/types/application.ts

export type ApplicationStatus = 'AP' | 'SH' | 'SL' | 'RJ' | 'WD';

export interface Application {
  id: number;
  student: number;
  student_username: string;
  drive: number;
  drive_title: string;
  company_name: string;
  applied_at: string;
  status: ApplicationStatus;
  tnp_comments?: string;
}

export interface ApplicationFormData {
  drive: number;
  // Student is automatically set from the current user
}

// Enums for display
export const ApplicationStatusDisplay: Record<ApplicationStatus, string> = {
  'AP': 'Applied',
  'SH': 'Shortlisted',
  'SL': 'Selected',
  'RJ': 'Rejected',
  'WD': 'Withdrawn'
};

// Status colors for UI
export const ApplicationStatusColor: Record<ApplicationStatus, string> = {
  'AP': 'bg-blue-100 text-blue-800',
  'SH': 'bg-yellow-100 text-yellow-800',
  'SL': 'bg-green-100 text-green-800',
  'RJ': 'bg-red-100 text-red-800',
  'WD': 'bg-gray-100 text-gray-800'
};