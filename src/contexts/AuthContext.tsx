/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/apiClient';

export interface User {
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  register: (payload: Record<string, unknown>) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (payload: Record<string, unknown>) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const savedUserStr = localStorage.getItem('gac_user');
      if (savedUserStr) {
        const userData = JSON.parse(savedUserStr);
        if (userData?.token) {
          userData.token = userData.token.replace(/[\r\n\t]/g, "").trim();
          setUser(userData);
        }
      }
    } catch (err) {
      console.error("Failed to rehydrate login context storage framework:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      const result = response.data;

      let rawToken = result.data?.token || result.token;
      if (rawToken && typeof rawToken === 'string') {
        rawToken = rawToken.replace(/[\r\n\t]/g, '').trim();
      }

      const userData: User = {
        uid: result.data?.id || result.id || '',
        email: result.data?.email || result.email || email,
        firstName: result.data?.firstName || result.firstName || '',
        lastName: result.data?.lastName || result.lastName || '',
        role: (result.data?.role || result.role || 'MEMBER').toUpperCase(),
        token: rawToken || '',
      };

      setUser(userData);
      localStorage.setItem('gac_user', JSON.stringify(userData));
      navigate('/dashboard');
    } catch (error: unknown) {
      const message =
        typeof error === 'object' && error !== null && 'response' in error
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
          : (error instanceof Error ? error.message : undefined);
      throw new Error(message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const register = useCallback(async (payload: Record<string, unknown>) => {
    setLoading(true);
    try {
      await api.post('/auth/register', payload);
      navigate('/login');
    } catch (error: unknown) {
      const message =
        typeof error === 'object' && error !== null && 'response' in error
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
          : (error instanceof Error ? error.message : undefined);
      throw new Error(message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const forgotPassword = useCallback(async (email: string) => {
    try {
      await api.post('/auth/forgot-password', { email });
    } catch (error: unknown) {
      const message =
        typeof error === 'object' && error !== null && 'response' in error
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
          : (error instanceof Error ? error.message : undefined);
      throw new Error(message || 'Failed to send recovery link');
    }
  }, []);

  const resetPassword = useCallback(async (payload: Record<string, unknown>) => {
    try {
      await api.post('/auth/reset-password', payload);
      navigate('/login');
    } catch (error: unknown) {
      const message =
        typeof error === 'object' && error !== null && 'response' in error
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
          : (error instanceof Error ? error.message : undefined);
      throw new Error(message || 'Password reset failed');
    }
  }, [navigate]);

  const signOut = useCallback(() => {
    localStorage.removeItem('gac_user');
    setUser(null);
    navigate('/login');
  }, [navigate]);

  const value = useMemo(
    () => ({ user, loading, signIn, register, forgotPassword, resetPassword, signOut }),
    [user, loading, signIn, register, forgotPassword, resetPassword, signOut],
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider structural container.');
  return context;
};