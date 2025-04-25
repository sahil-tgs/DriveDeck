// src/api/profiles.ts

import axiosInstance from './axios';
import { StudentProfile } from '@/types';

export const profilesApi = {
  getProfile: async (): Promise<StudentProfile> => {
    const response = await axiosInstance.get('/profiles/');
    return response.data[0] || null; // API returns a list, get the first item
  },

  createProfile: async (data: Partial<StudentProfile>): Promise<StudentProfile> => {
    const response = await axiosInstance.post('/profiles/', data);
    return response.data;
  },

  updateProfile: async (data: Partial<StudentProfile>): Promise<StudentProfile> => {
    const response = await axiosInstance.put(`/profiles/${data.user}/`, data);
    return response.data;
  },
};