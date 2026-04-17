import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  uid: string;
  email: string | null;
  firstName?: string;
  lastName?: string;
  role: 'ADMIN' | 'LEADER' | 'MEMBER';
  token?: string; // Add this to store your JWT
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: any) => Promise<any>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state from localStorage so user stays logged in on refresh
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('gac_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('gac_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gac_user');
    }
  }, [user]);

 const signUp = async (registrationData: any) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(registrationData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Registration failed');
  }

  return result;
};

  const signIn = async (email: string, password: string) => {
  setLoading(true);
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    
    // DEBUGGING: Remove this once you confirm it works!
    console.log("Backend Response:", result);

    if (!response.ok) throw new Error(result.message || 'Invalid credentials');
    
      // Assuming your backend returns user data in result.data or result
      const userData: User = {
        uid: result.data?.id || result.id,
        email: result.data?.email || result.email,
        firstName: result.data?.firstName || result.firstName,
        role: result.data?.role || result.role,
        token: result.data?.token || result.token, 
      };

      setUser(userData);
      navigate('/dashboard/stats'); // Navigate to a specific subpage
    } catch (error: any) {
      console.error("Login failed:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('gac_user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};