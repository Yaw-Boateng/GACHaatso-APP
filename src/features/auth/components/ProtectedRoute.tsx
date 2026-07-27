// src/features/auth/components/ProtectedRoute.tsx
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

  if (
    allowedRoles &&
    !allowedRoles.map((r) => r.toLowerCase()).includes(user.role?.toLowerCase())
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  // Returns children if wrapped around a single component (e.g., <Dashboard />)
  // or <Outlet /> when acting as a layout wrapper for nested child routes
  return children ? <>{children}</> : <Outlet />;
};