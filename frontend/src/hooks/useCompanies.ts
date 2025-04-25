// src/hooks/useCompanies.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { companiesApi } from '@/api';
import { Company, CompanyFormData } from '@/types';

export const useCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: companiesApi.getAll,
  });
};

export const useCompany = (id: number) => {
  return useQuery({
    queryKey: ['companies', id],
    queryFn: () => companiesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CompanyFormData) => companiesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
  });
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CompanyFormData }) => 
      companiesApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      queryClient.invalidateQueries({ queryKey: ['companies', id] });
    },
  });
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => companiesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
  });
};