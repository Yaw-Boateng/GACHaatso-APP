import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import useAuth
import AdminDashboard from "./AdminDashboard";
import LeaderDashboard from "./LeaderDashboard";
import MemberDashboard from "./MemberDashboard";
import DashboardShell from "./DashboardShell";

const Dashboard: React.FC = () => {
  const { pathname } = useLocation();
  const { user } = useAuth(); // Get real user data
  
  // Use the role from the AuthContext, default to MEMBER if undefined
  const activeRole = user?.role || "MEMBER"; 

  const isOverview = pathname.replace(/\/$/, "") === "/dashboard";

  const renderOverview = () => {
    switch (activeRole) {
      case "ADMIN": return <AdminDashboard />;
      case "LEADER": return <LeaderDashboard />;
      case "MEMBER": return <MemberDashboard />;
      default: return <MemberDashboard />;
    }
  };

  return (
    <DashboardShell role={activeRole}>
      {isOverview ? (
        <div className="animate-in fade-in duration-500">
          {renderOverview()}
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
          <Outlet />
        </div>
      )}
    </DashboardShell>
  );
};

export default Dashboard;