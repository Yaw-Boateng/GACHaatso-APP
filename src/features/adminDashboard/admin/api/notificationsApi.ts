import apiClient from '../../../../services/apiClient';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export const notificationsApi = {
  getNotifications: async (): Promise<NotificationItem[]> => {
    const response = await apiClient.get('/admin/notifications');
    return response.data?.data || response.data;
  },

  getUnreadCount: async (): Promise<number> => {
    const response = await apiClient.get('/admin/notifications/unread-count');
    return response.data?.count ?? response.data ?? 0;
  },
};