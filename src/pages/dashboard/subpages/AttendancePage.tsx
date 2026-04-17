import React from 'react';
import { CheckCircle2, XCircle, Users } from 'lucide-react';

const AttendancePage = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold text-theme-text">Group Attendance</h2>
      <div className="px-4 py-2 bg-primary-600/10 text-primary-600 rounded-xl font-bold">
        Session: March 27, 2026
      </div>
    </div>

    <div className="grid grid-cols-1 gap-4">
      {['John Doe', 'Sarah Mensah', 'Augustine Boateng', 'Akua Gyanba'].map((name, i) => (
        <div key={i} className="flex items-center justify-between p-4 bg-theme-surface border border-theme-border rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-theme-base rounded-full flex items-center justify-center text-theme-muted">
              <Users size={20} />
            </div>
            <span className="font-semibold text-theme-text">{name}</span>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-emerald-500/10 text-theme-muted hover:text-emerald-500 rounded-lg transition-colors">
              <CheckCircle2 size={24} />
            </button>
            <button className="p-2 hover:bg-red-500/10 text-theme-muted hover:text-red-500 rounded-lg transition-colors">
              <XCircle size={24} />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AttendancePage;