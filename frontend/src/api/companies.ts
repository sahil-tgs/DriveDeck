// src/api/companies.ts

import axiosInstance from './axios';
import { Company, CompanyFormData } from '@/types';

export const companiesApi = {
  getAll: async (): Promise<Company[]> => {
    const response = await axiosInstance.get('/companies/');
    return response.data;
  },

  getById: async (id: number): Promise<Company> => {
    const response = await axiosInstance.get(`/companies/${id}/`);
    return response.data;
  },

  create: async (data: CompanyFormData): Promise<Company> => {
    const response = await axiosInstance.post('/companies/', data);
    return response.data;
  },

  update: async (id: number, data: CompanyFormData): Promise<Company> => {
    const response = await axiosInstance.put(`/companies/${id}/`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/companies/${id}/`);
  },
};