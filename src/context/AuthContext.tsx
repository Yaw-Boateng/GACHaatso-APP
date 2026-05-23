import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
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
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

  useEffect(() => {
    try {
      const savedUserStr = localStorage.getItem('gac_user');
      if (savedUserStr) {
        const userData = JSON.parse(savedUserStr);
        if (userData?.token) {
          // Sanitize existing local records as a secondary defensive layer
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

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Invalid credentials');

      // Extract raw token from your backend response wrapper targets safely
      let rawToken = result.data?.token || result.token;

      if (rawToken && typeof rawToken === 'string') {
        // SANITIZE STRIP: Eradicate hidden carriage returns (\r), newlines (\n), or tab gaps (\t)
        rawToken = rawToken.replace(/[\r\n\t]/g, "").trim();
      }

      const userData: User = {
        uid: result.data?.id || result.id,
        email: result.data?.email || result.email,
        firstName: result.data?.firstName || result.firstName,
        lastName: result.data?.lastName || result.lastName,
        role: result.data?.role || result.role,
        token: rawToken, // Now guaranteed clean
      };

      setUser(userData);
      localStorage.setItem('gac_user', JSON.stringify(userData));
      navigate('/dashboard/stats');
    } catch (error: any) {
      console.error("Authentication error sequence caught:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('gac_user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider structural container.');
  return context;
};