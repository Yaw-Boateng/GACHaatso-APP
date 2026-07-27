import api from '../../../../services/apiClient';

export interface ContactMessagePayload {
  name: string;
  email: string;
  phone?: string;
  messageType: string;
  message: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  messageType?: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}

// Normalized API response structure (handles Spring Boot / wrapped payloads)
export interface ApiResponse<T> {
  data?: T | { content?: T };
  messages?: T;
  message?: string;
  status?: number;
}

export const sendContactMessage = async (payload: ContactMessagePayload): Promise<ContactMessage> => {
  const response = await api.post<ApiResponse<ContactMessage>>('/messages/send', payload);
  return (response.data?.data as ContactMessage) || response.data;
};

export const getMessages = async (): Promise<ContactMessage[]> => {
  const response = await api.get<ApiResponse<ContactMessage[]>>('/messages');
  const resData = response.data;

  if (Array.isArray(resData)) return resData;
  if (Array.isArray(resData?.data)) return resData.data;
  if (resData?.data && 'content' in resData.data && Array.isArray(resData.data.content)) {
    return resData.data.content;
  }
  if (Array.isArray(resData?.messages)) return resData.messages;
  
  return [];
};

export const getMessageById = async (id: string): Promise<ContactMessage> => {
  const response = await api.get<ApiResponse<ContactMessage>>(`/messages/${id}`);
  return (response.data?.data as ContactMessage) || response.data;
};