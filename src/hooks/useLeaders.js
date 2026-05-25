import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Ensure this environment variable matches your configured base API paths precisely
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://gachaatso-backend.onrender.com";

export const useLeaders = (activeTab, headers) => {
  const queryClient = useQueryClient();

  // Fetching Hook
  const leadersQuery = useQuery({
    queryKey: ['leaders', activeTab],
    queryFn: async () => {
      // Normalizing path suffixes based on global environment patterns
      const basePath = API_BASE.endsWith('/api/v1') ? API_BASE : `${API_BASE}/api/v1`;
      const endpoint = activeTab === 'pending' 
        ? `${basePath}/admin/pending-leaders` 
        : `${basePath}/admin/approved-leaders`;
      
      const response = await axios.get(endpoint, {
        params: { page: 0, size: 1000 },
        headers
      });

      return (response.data?.data?.content || response.data?.content || []).map(item => ({
        ...item,
        fullName: `${item.firstName || ''} ${item.lastName || ''}`.trim() || 'Unknown Leader'
      }));
    },
    enabled: !!headers.Authorization, // Explicitly safe baseline checks
  });

  // Action Mutation (Approve/Reject)
  const actionMutation = useMutation({
    mutationFn: async ({ id, action }) => {
      const basePath = API_BASE.endsWith('/api/v1') ? API_BASE : `${API_BASE}/api/v1`;
      const url = `${basePath}/admin/${action}/${id}`;
      return await axios.patch(url, {}, { headers });
    },
    onSuccess: () => {
      // Invalidate the absolute root key to refresh both lists concurrently
      queryClient.invalidateQueries({ queryKey: ['leaders'] });
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const basePath = API_BASE.endsWith('/api/v1') ? API_BASE : `${API_BASE}/api/v1`;
      return await axios.delete(`${basePath}/admin/delete/${id}`, { headers });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaders'] });
    },
  });

  return {
    leaders: leadersQuery.data || [],
    isLoading: leadersQuery.isLoading,
    isError: leadersQuery.isError,
    executeAction: actionMutation.mutateAsync,
    executeDelete: deleteMutation.mutateAsync,
    isProcessing: actionMutation.isPending || deleteMutation.isPending
  };
};