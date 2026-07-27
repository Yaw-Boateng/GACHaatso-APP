// src/features/adminDashboard/admin/api/adminApi.ts
import apiClient from '../../../../services/apiClient';

export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  approvalStatus?: string;
  createdAt?: string;
}

export interface Leader extends AdminUser {
  memberCount?: number;
}

export interface Member extends AdminUser {
  assignedLeaderId?: string | null;
}

export const adminApi = {
  // Account Moderation
  getPendingUsers: (page = 0, size = 100): Promise<AdminUser[]> =>
    apiClient
      .get(`/admin/pending-users?page=${page}&size=${size}`)
      .then((res) => res.data?.data?.content || res.data?.content || res.data || []),

  approveUser: (userId: string): Promise<void> =>
    apiClient.patch(`/admin/approve/${userId}`).then((res) => res.data),

  rejectUser: (userId: string): Promise<void> =>
    apiClient.patch(`/admin/reject/${userId}`).then((res) => res.data),

  deleteUser: (userId: string): Promise<void> =>
    apiClient.delete(`/admin/delete/${userId}`).then((res) => res.data),

  // Leader & Member Hierarchy
  getApprovedLeaders: (page = 0, size = 100): Promise<Leader[]> =>
    apiClient
      .get(`/admin/approved-leaders?page=${page}&size=${size}`)
      .then((res) => res.data?.data?.content || res.data?.content || res.data || []),

  getAvailableLeaders: (): Promise<Leader[]> =>
    apiClient
      .get('/admin/leaders/available')
      .then((res) => res.data?.data || res.data || []),

  getUnassignedMembers: (page = 0, size = 100): Promise<Member[]> =>
    apiClient
      .get(`/admin/members/unassigned?page=${page}&size=${size}`)
      .then((res) => res.data?.data?.content || res.data?.content || res.data || []),

  getLeaderMembers: (leaderId: string): Promise<Member[]> =>
    apiClient
      .get(`/admin/leaders/${leaderId}/members`)
      .then((res) => res.data?.data || res.data || []),

  assignLeaderToMember: (memberId: string, leaderId: string): Promise<void> =>
    apiClient
      .patch(`/admin/members/${memberId}/assign/${leaderId}`)
      .then((res) => res.data),
};