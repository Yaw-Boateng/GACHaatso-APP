export interface EventItem {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventFormData {
  title: string;
  description: string;
  location: string;
  date: string;
}

export interface PaginatedEventResponse {
  content: EventItem[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}