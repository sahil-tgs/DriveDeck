// src/api/applications.ts

import axiosInstance from './axios';
import { Application, ApplicationFormData, ApplicationStatus } from '@/types';

export const applicationsApi = {
  getAll: async (): Promise<Application[]> => {
    const response = await axiosInstance.get('/applications/');
    return response.data;
  },

  getById: async (id: number): Promise<Application> => {
    const response = await axiosInstance.get(`/applications/${id}/`);
    return response.data;
  },

  create: async (data: ApplicationFormData): Promise<Application> => {
    const response = await axiosInstance.post('/applications/', data);
    return response.data;
  },

  updateStatus: async (id: number, status: ApplicationStatus): Promise<Application> => {
    const response = await axiosInstance.patch(`/applications/${id}/`, { status });
    return response.data;
  },

  withdraw: async (id: number): Promise<Application> => {
    return applicationsApi.updateStatus(id, 'WD');
  },
};