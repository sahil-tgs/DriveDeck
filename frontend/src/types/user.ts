// src/types/user.ts

export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_student: boolean;
    is_tnp_officer: boolean;
  }
  
  export interface StudentProfile {
    user: number; // User ID (primary key)
    username: string;
    enrollment_number: string;
    branch: string;
    cgpa: number | null;
    phone_number: string;
    skills: string;
    projects: string;
    resume_text: string;
  }
  
  export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface RegisterData extends LoginCredentials {
    email: string;
    first_name: string;
    last_name: string;
    is_student?: boolean;
    is_tnp_officer?: boolean;
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }