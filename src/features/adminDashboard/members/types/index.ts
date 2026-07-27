export type MemberStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'SUSPENDED';
export type MemberRole = 'MEMBER' | 'LEADER' | 'ADMIN' | 'PASTOR';

export interface LeaderSummary {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  age?: number;
  gender?: string;
  phoneNumber: string;
  email?: string;
  maritalStatus?: string;
  residenceAddress?: string;
  occupation?: string;
  emergencyNumber?: string;
  leader?: LeaderSummary;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  // UI-specific optional fields
  role?: MemberRole;
  status?: MemberStatus;
  department?: string;
}

// Standard Spring Boot API Envelope matching your spec
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errorCode?: string | null;
  timestamp: string;
}

export interface MemberFilterParams {
  page?: number;
  limit?: number;
  size?: number;
  search?: string;
  role?: string;
  status?: string;
}

export interface SpringPageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}