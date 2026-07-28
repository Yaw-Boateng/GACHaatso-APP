import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../../../services/apiClient';

interface AssignLeaderPayload {
  memberId: string;
  leaderId: string;
}

export const useAssignLeader = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ memberId, leaderId }: AssignLeaderPayload) => {
      const response = await apiClient.patch(
        `/admin/members/${memberId}/assign/${leaderId}`
      );
      return response.data; // Assumes response returns updated member or standard payload
    },
    onSuccess: async () => {
      // Force an immediate refetch of all active queries starting with 'members'
      await Promise.all([
        queryClient.refetchQueries({ queryKey: ['members'], type: 'active' }),
        queryClient.refetchQueries({ queryKey: ['unassignedMembers'], type: 'active' }),
        queryClient.refetchQueries({ queryKey: ['leaderMembers'], type: 'active' }),
      ]);
    },
  });
};