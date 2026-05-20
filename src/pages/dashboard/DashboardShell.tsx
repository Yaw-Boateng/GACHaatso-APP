// src/pages/dashboard/DashboardShell.tsx
import React from 'react';
// WRONG: import { Sidebar } from 'lucide-react'; 
import Sidebar from '../../components/dashboard/Sidebar'; // USE YOUR COMPONENT

interface DashboardShellProps {
  children: React.ReactNode;
  role: string;
}

const DashboardShell: React.FC<DashboardShellProps> = ({ children, role }) => {
  return (
    <div className="flex min-h-screen bg-theme-bg text-theme-text transition-colors duration-300">
      <Sidebar role={role} /> {/* Now your dynamic sidebar will show up */}

      <div className="flex-1 flex flex-col">
        <header className="h-20 border-b border-theme-border flex items-center justify-between px-6 md:px-8 bg-theme-surface/50 backdrop-blur-md sticky top-0">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold capitalize text-theme-text">{role.toLowerCase()} Panel</h1>
            <p className="text-[10px] uppercase tracking-widest text-primary-600 font-bold">GAC Church Management</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-600/10 border border-primary-600/20 flex items-center justify-center text-primary-600 font-bold">
             {role[0]}
          </div>
        </header>

        <main className="p-4 md:p-8 overflow-y-auto bg-theme-bg/50">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardShell;