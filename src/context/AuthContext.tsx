import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  uid: string;
  email: string | null;
  firstName?: string;
  lastName?: string;
  role: 'ADMIN' | 'LEADER' | 'MEMBER';
  token?: string; 
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: any) => Promise<any>;
  signOut: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('gac_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Added useCallback to the import above to fix your error
  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem('gac_user');
    navigate('/login');
  }, [navigate]);

  const signUp = async (registrationData: any) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(registrationData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Registration failed');
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Invalid credentials');

      const userData: User = {
        uid: result.data?.id || result.id,
        email: result.data?.email || result.email,
        firstName: result.data?.firstName || result.firstName,
        lastName: result.data?.lastName || result.lastName,
        role: result.data?.role || result.role,
        token: result.data?.token || result.token, 
      };

      setUser(userData);
      localStorage.setItem('gac_user', JSON.stringify(userData));
      navigate('/dashboard/stats');
    } catch (error: any) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to send reset email');
  };

  const resetPassword = async (token: string, newPassword: string) => {
    const response = await fetch(`${API_BASE_URL}auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ token, newPassword }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Password reset failed');
    return result;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, forgotPassword, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};