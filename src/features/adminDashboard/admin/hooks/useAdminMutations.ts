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
      // Changed from apiClient.post to apiClient.patch
      // Changed path from /assign-leader/ to /assign/
      const response = await apiClient.patch(
        `/admin/members/${memberId}/assign/${leaderId}`
      );
      return response.data;
    },
    onSuccess: () => {
      // Refresh member queries automatically
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
    },
  });
};