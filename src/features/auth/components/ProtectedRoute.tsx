import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

interface ProtectedRouteProps {
  allowedRoles?: string[];
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-bg">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Safely resolve user role to a string regardless of its underlying shape
  const rawRole = typeof user.role === 'string' 
    ? user.role 
    : user.role?.name || (Array.isArray(user.role) ? user.role[0] : '');

  const userRoleNormalized = String(rawRole || '').toLowerCase();

  if (allowedRoles && allowedRoles.length > 0) {
    const hasRole = allowedRoles.some((role) => role.toLowerCase() === userRoleNormalized);
    if (!hasRole) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children ? <>{children}</> : <Outlet />;
};