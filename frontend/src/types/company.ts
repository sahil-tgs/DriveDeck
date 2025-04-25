// src/types/company.ts

export interface Company {
    id: number;
    name: string;
    website?: string;
    description?: string;
    address?: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface CompanyFormData {
    name: string;
    website?: string;
    description?: string;
    address?: string;
  }