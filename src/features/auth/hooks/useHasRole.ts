// src/features/auth/hooks/useHasRole.ts
import { useAuth } from '../../../contexts/AuthContext';

export const useHasRole = (...allowedRoles: string[]): boolean => {
  const { user } = useAuth();
  if (!user || !user.role) return false;
  
  const userRole = user.role.toLowerCase();
  return allowedRoles.some((role) => role.toLowerCase() === userRole);
};