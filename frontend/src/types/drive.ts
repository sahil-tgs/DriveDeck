// src/types/drive.ts

export type RoleType = 'FT' | 'IN';
export type DriveStatus = 'UP' | 'AC' | 'CL';

export interface Drive {
  id: number;
  company: number;
  company_name: string;
  job_title: string;
  job_description: string;
  role_type: RoleType;
  eligibility_criteria?: string;
  package_details?: string;
  application_deadline?: string | null;
  drive_date?: string | null;
  status: DriveStatus;
  created_at: string;
  updated_at: string;
}

export interface DriveFormData {
  company: number;
  job_title: string;
  job_description: string;
  role_type: RoleType;
  eligibility_criteria?: string;
  package_details?: string;
  application_deadline?: string | null;
  drive_date?: string | null;
  status?: DriveStatus;
}

// Enums for display
export const RoleTypeDisplay: Record<RoleType, string> = {
  'FT': 'Full-Time',
  'IN': 'Internship'
};

export const DriveStatusDisplay: Record<DriveStatus, string> = {
  'UP': 'Upcoming',
  'AC': 'Active',
  'CL': 'Closed'
};