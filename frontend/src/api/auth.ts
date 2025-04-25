// src/api/auth.ts

import axiosInstance from './axios';
import { AuthResponse, LoginCredentials, RegisterData, User } from '@/types';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/login/', credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<User> => {
    const response = await axiosInstance.post('/auth/register/', data);
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await axiosInstance.get('/auth/user/');
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post('/auth/logout/');
    localStorage.removeItem('token');
  },
};