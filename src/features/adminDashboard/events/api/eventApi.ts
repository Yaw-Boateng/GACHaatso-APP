import api from '../../../../services/apiClient';
import { EventItem, PaginatedEventResponse } from '../types/event';

export const eventApi = {
  // Fetch paginated events
  getEvents: async (page: number, size: number = 10): Promise<PaginatedEventResponse> => {
    const response = await api.get('/event', { params: { page, size } });
    return response.data?.data;
  },

  // Fetch single event details
  getEventById: async (id: string): Promise<EventItem> => {
    const response = await api.get(`/event/${id}`);
    return response.data?.data || response.data;
  },

  // Create event with file upload
  createEvent: async (formData: FormData): Promise<void> => {
    await api.post('/event/create-event', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Update existing event
  updateEvent: async (id: string, formData: FormData): Promise<void> => {
    await api.patch(`/event/update-event/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Delete event
  deleteEvent: async (id: string): Promise<void> => {
    await api.delete(`/event/delete-event/${id}`);
  },
};