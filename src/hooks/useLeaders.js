import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const useLeaders = (activeTab, headers) => {
  const queryClient = useQueryClient();

  // Fetching Hook
  const leadersQuery = useQuery({
    queryKey: ['leaders', activeTab],
    queryFn: async () => {
      const endpoint = activeTab === 'pending' 
        ? `${API_BASE}/api/v1/admin/pending-leaders` 
        : `${API_BASE}/api/v1/admin/approved-leaders`;
      
      const response = await axios.get(endpoint, {
        params: { page: 0, size: 1000 },
        headers
      });

      return (response.data.data.content || []).map(item => ({
        ...item,
        fullName: `${item.firstName || ''} ${item.lastName || ''}`.trim() || 'Unknown Leader'
      }));
    },
    enabled: !!headers.Authorization, // Only fetch if token exists
  });

  // Action Mutation (Approve/Reject)
  const actionMutation = useMutation({
    mutationFn: async ({ id, action }) => {
      const url = `${API_BASE}/api/v1/admin/${action}/${id}`;
      return await axios.patch(url, {}, { headers });
    },
    onSuccess: () => {
      // This is the magic: it forces both lists to refresh immediately
      queryClient.invalidateQueries(['leaders']);
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(`${API_BASE}/api/v1/admin/delete/${id}`, { headers });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['leaders']);
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