import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../ui/LoadingSpinner";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
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
    // Redirect to login, but save the current location so we can go back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};