import React from 'react';
import { Search, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const MembersPage = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold text-theme-text">Member Directory</h2>
      <Link 
        to="/dashboard/members/add" 
        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-primary-600/20"
      >
        <UserPlus size={18} /> Add Member
      </Link>
    </div>

    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted" size={20} />
      <input 
        type="text" 
        placeholder="Search members by name or group..." 
        className="w-full pl-12 pr-4 py-4 bg-theme-surface border border-theme-border rounded-2xl focus:ring-2 focus:ring-primary-600 outline-none"
      />
    </div>

    <div className="bg-theme-surface border border-theme-border rounded-3xl overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-theme-base/50 border-b border-theme-border">
          <tr>
            <th className="px-6 py-4 font-bold text-theme-text">Name</th>
            <th className="px-6 py-4 font-bold text-theme-text">Role</th>
            <th className="px-6 py-4 font-bold text-theme-text">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-theme-border">
          {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i} className="hover:bg-theme-base/30 transition-colors">
              <td className="px-6 py-4 text-theme-text font-medium">Member {i}</td>
              <td className="px-6 py-4 text-theme-muted">General Member</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold">Active</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default MembersPage;