// AuthContext.js
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const signIn = async (email, password) => {
    // Call your authentication service (e.g., Firebase, your own API)
    // The service should return a user object that includes their role.
    const userCredentials = await yourAuthService.signInWithEmailAndPassword(email, password);
    
    // Assume we've fetched the user's role from a database or a custom claim
    const role = await getUserRole(userCredentials.user.uid); 
    
    setUser({ ...userCredentials.user, role });
    
    // Redirect based on role
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else if (role === 'counselor') {
      navigate('/counselor/dashboard');
    } else {
      navigate('/member/profile');
    }
  };

  const value = {
    user,
    signIn,
    // Add other auth functions like signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};