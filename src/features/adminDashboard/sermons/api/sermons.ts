import api from '../../../services/apiClient';

export interface SermonPayload {
  title: string;
  speaker: string;
  description: string;
  tags?: string[];
  videoUrl?: string;
}

export const fetchSermons = async () => {
  const response = await api.get('/sermons');
  return response.data;
};

export const fetchSermonById = async (id: string) => {
  const response = await api.get(`/sermons/${id}`);
  return response.data;
};
