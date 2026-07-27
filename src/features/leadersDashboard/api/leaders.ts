import axios from 'axios';
import { API_BASE_URL } from '../../../services/apiClient';

export interface LeaderItem {
  id: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  approvalStatus?: string;
  fullName?: string;
  [key: string]: unknown;
}

export const getLeaders = async (activeTab: 'pending' | 'approved', token: string) => {
  const endpoint = `${API_BASE_URL}/admin/${activeTab === 'pending' ? 'pending-leaders' : 'approved-leaders'}`;
  const response = await axios.get(endpoint, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const approveLeader = async (id: string, token: string) => {
  const response = await axios.patch(`${API_BASE_URL}/admin/approve/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const rejectLeader = async (id: string, token: string) => {
  const response = await axios.patch(`${API_BASE_URL}/admin/reject/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteLeader = async (id: string, token: string) => {
  const response = await axios.delete(`${API_BASE_URL}/admin/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
