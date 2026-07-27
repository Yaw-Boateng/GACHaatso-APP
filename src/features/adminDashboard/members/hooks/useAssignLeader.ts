import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../../../services/apiClient';

export interface AssignLeaderPayload {
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
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Invalidate query families matching keys with exact: false
      queryClient.invalidateQueries({
        queryKey: ['members'],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['unassignedMembers'],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['leaderMembers'],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['approvedLeaders'],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['member', variables.memberId],
        exact: false,
      });
    },
  });
};