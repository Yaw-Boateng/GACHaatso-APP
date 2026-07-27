import { apiClient } from '../../../../services/apiClient';
import {
  Member,
  MemberFilterParams,
  ApiResponse,
  SpringPageResponse,
} from '../types';

/**
 * Packs member fields into an application/json blob and appends the file.
 */
const buildSpringFormData = (
  memberData: Partial<Member>,
  imageFile?: File | null
): FormData => {
  const formData = new FormData();

  const jsonBlob = new Blob([JSON.stringify(memberData)], {
    type: 'application/json',
  });
  formData.append('member', jsonBlob);

  if (imageFile) {
    formData.append('file', imageFile);
  }

  return formData;
};

export const membersApi = {
  getMembers: async (
    params?: MemberFilterParams
  ): Promise<ApiResponse<SpringPageResponse<Member>>> => {
    // Pass cache-busting timestamp to ensure fresh responses after leader assignments
    const response = await apiClient.get('/members', {
      params: {
        ...params,
        _t: Date.now(), // 👈 Prevents HTTP/browser 304 response caching
      },
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
      },
    });
    return response.data;
  },

  getMemberById: async (id: string): Promise<ApiResponse<Member>> => {
    const response = await apiClient.get(`/members/${id}`);
    return response.data;
  },

  // POST /api/v1/members/create-member
  createMember: async (
    memberData: Partial<Member>,
    imageFile?: File | null
  ): Promise<ApiResponse<Member>> => {
    const payload = buildSpringFormData(memberData, imageFile);
    const response = await apiClient.post('/members/create-member', payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // PATCH /api/v1/members/update-member/{id}
  updateMember: async (
    id: string,
    memberData: Partial<Member>,
    imageFile?: File | null
  ): Promise<ApiResponse<Member>> => {
    const payload = buildSpringFormData(memberData, imageFile);
    const response = await apiClient.patch(`/members/update-member/${id}`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  deleteMember: async (id: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(`/members/delete-member/${id}`);
    return response.data;
  },
};