// src/hooks/useDrives.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { drivesApi } from '@/api';
import { Drive, DriveFormData } from '@/types';

export const useDrives = () => {
  return useQuery({
    queryKey: ['drives'],
    queryFn: drivesApi.getAll,
  });
};

export const useDrive = (id: number) => {
  return useQuery({
    queryKey: ['drives', id],
    queryFn: () => drivesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateDrive = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: DriveFormData) => drivesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drives'] });
    },
  });
};

export const useUpdateDrive = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: DriveFormData }) => 
      drivesApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['drives'] });
      queryClient.invalidateQueries({ queryKey: ['drives', id] });
    },
  });
};

export const useDeleteDrive = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => drivesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drives'] });
    },
  });
};