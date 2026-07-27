// src/components/layout/DashboardShell.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';

const DashboardShell: React.FC = () => {
  const { user } = useAuth(); 
  // Adjust 'user?.role' to match your AuthContext user object structure
  const role = user?.role || "MEMBER";

  return (
    <div className="flex min-h-screen bg-theme-bg text-theme-text transition-colors duration-300">
      {/* Sidebar rendered here */}
      <Sidebar role={role} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b border-theme-border flex items-center justify-between px-6 md:px-8 bg-theme-surface/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold capitalize text-theme-text">
              {role.toLowerCase()} Panel
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-primary-600 font-bold">
              GAC Church Management
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-600/10 border border-primary-600/20 flex items-center justify-center text-primary-600 font-bold">
            {role.charAt(0).toUpperCase()}
          </div>
        </header>

        <main className="p-4 md:p-8 overflow-y-auto bg-theme-bg/50 flex-1">
          <div className="max-w-7xl mx-auto">
            {/* Renders nested dashboard page routes */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardShell;