// src/hooks/useApplications.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { applicationsApi } from '@/api';
import { Application, ApplicationFormData, ApplicationStatus } from '@/types';

export const useApplications = () => {
  return useQuery({
    queryKey: ['applications'],
    queryFn: applicationsApi.getAll,
  });
};

export const useApplication = (id: number) => {
  return useQuery({
    queryKey: ['applications', id],
    queryFn: () => applicationsApi.getById(id),
    enabled: !!id,
  });
};

export const useApplyToDrive = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: ApplicationFormData) => applicationsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: ApplicationStatus }) => 
      applicationsApi.updateStatus(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      queryClient.invalidateQueries({ queryKey: ['applications', id] });
    },
  });
};

export const useWithdrawApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => applicationsApi.withdraw(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      queryClient.invalidateQueries({ queryKey: ['applications', id] });
    },
  });
};