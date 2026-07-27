import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../services/apiClient';

export interface LeaderItem {
  id: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  approvalStatus?: string;
  fullName?: string;
  [key: string]: unknown;
}

export interface LeadersResponse {
  content: LeaderItem[];
  totalPages?: number;
  totalElements?: number;
}

export interface LeadersQueryResult {
  leaders: LeaderItem[];
  isLoading: boolean;
  isError: boolean;
  executeAction: (params: { id: string; action: 'approve' | 'reject' }) => Promise<unknown>;
  executeDelete: (id: string) => Promise<unknown>;
  isProcessing: boolean;
}

export const useLeaders = (activeTab: 'pending' | 'approved') => {
  const queryClient = useQueryClient();

  const leadersQuery = useQuery<LeaderItem[]>({
    queryKey: ['leaders', activeTab],
    queryFn: async () => {
      const endpoint =
        activeTab === 'pending'
          ? '/admin/pending-users'
          : '/admin/approved-leaders';

      const response = await api.get(endpoint, {
        params: { page: 0, size: 1000 },
      });

      const content = response.data?.data?.content || response.data?.content || [];
      return (content as LeaderItem[]).map((item) => ({
        ...item,
        fullName: `${item.firstName || ''} ${item.lastName || ''}`.trim() || 'Unknown Leader',
      }));
    },
    staleTime: 300_000,
    gcTime: 600_000, // Updated React Query v5 syntax (formerly cacheTime)
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const actionMutation = useMutation({
    mutationFn: async ({ id, action }: { id: string; action: 'approve' | 'reject' }) => {
      return api.patch(`/admin/${action}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaders'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return api.delete(`/admin/delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaders'] });
    },
  });

  const isProcessing = useMemo(
    () => actionMutation.isPending || deleteMutation.isPending,
    [actionMutation.isPending, deleteMutation.isPending]
  );

  return {
    leaders: leadersQuery.data || [],
    isLoading: leadersQuery.isLoading,
    isError: leadersQuery.isError,
    executeAction: actionMutation.mutateAsync,
    executeDelete: deleteMutation.mutateAsync,
    isProcessing,
  } as LeadersQueryResult;
};