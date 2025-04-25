// src/api/drives.ts

import axiosInstance from './axios';
import { Drive, DriveFormData } from '@/types';

export const drivesApi = {
  getAll: async (): Promise<Drive[]> => {
    const response = await axiosInstance.get('/drives/');
    return response.data;
  },

  getById: async (id: number): Promise<Drive> => {
    const response = await axiosInstance.get(`/drives/${id}/`);
    return response.data;
  },

  create: async (data: DriveFormData): Promise<Drive> => {
    const response = await axiosInstance.post('/drives/', data);
    return response.data;
  },

  update: async (id: number, data: DriveFormData): Promise<Drive> => {
    const response = await axiosInstance.put(`/drives/${id}/`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/drives/${id}/`);
  },
};