import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import AdminDashboard from "./AdminDashboard";
import LeaderDashboard from "../../leaders/pages/LeaderDashboard";
import MemberDashboard from "./AdminMemberDashboard";
import DashboardShell from "../../../../components/layout/DashboardShell";

const Dashboard: React.FC = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();

  // Normalize role string to upper-case to handle API casing differences ("admin" vs "ADMIN")
  const activeRole = (user?.role || "MEMBER").toUpperCase();

  const isOverview = pathname.replace(/\/$/, "") === "/dashboard";

  const renderOverview = () => {
    switch (activeRole) {
      case "ADMIN":
      case "PASTOR":
      case "PASTORS":
        return <AdminDashboard />;
      case "LEADER":
        return <LeaderDashboard />;
      case "MEMBER":
      default:
        return <MemberDashboard />;
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