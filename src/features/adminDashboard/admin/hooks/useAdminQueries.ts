// src/features/adminDashboard/admin/hooks/useAdminQueries.ts
import { useQuery } from '@tanstack/react-query';
import { adminApi, AdminUser, Leader, Member } from '../api/adminApi';

export const adminQueryKeys = {
  pendingUsers: (page = 0, size = 100) => ['pendingUsers', page, size],
  approvedLeaders: (page = 0, size = 100) => ['approvedLeaders', page, size],
  availableLeaders: () => ['availableLeaders'],
  unassignedMembers: (page = 0, size = 100) => ['unassignedMembers', page, size],
  leaderMembers: (leaderId: string | null) => ['leaderMembers', leaderId],
};

export const usePendingUsers = (page = 0, size = 100) => {
  return useQuery<AdminUser[]>({
    queryKey: adminQueryKeys.pendingUsers(page, size),
    queryFn: () => adminApi.getPendingUsers(page, size),
  });
};

export const useApprovedLeaders = (page = 0, size = 100) => {
  return useQuery<Leader[]>({
    queryKey: adminQueryKeys.approvedLeaders(page, size),
    queryFn: () => adminApi.getApprovedLeaders(page, size),
  });
};

export const useAvailableLeaders = () => {
  return useQuery<Leader[]>({
    queryKey: adminQueryKeys.availableLeaders(),
    queryFn: () => adminApi.getAvailableLeaders(),
  });
};

export const useUnassignedMembers = (page = 0, size = 100) => {
  return useQuery<Member[]>({
    queryKey: adminQueryKeys.unassignedMembers(page, size),
    queryFn: () => adminApi.getUnassignedMembers(page, size),
  });
};

export const useLeaderMembers = (leaderId: string | null) => {
  return useQuery<Member[]>({
    queryKey: adminQueryKeys.leaderMembers(leaderId),
    queryFn: () => (leaderId ? adminApi.getLeaderMembers(leaderId) : Promise.resolve([])),
    enabled: Boolean(leaderId),
  });
};