import React from 'react';
import { User, Bell, Shield, Moon, Palette } from 'lucide-react';

const SettingsPage = () => (
  <div className="max-w-3xl space-y-8 animate-in fade-in duration-500">
    <h2 className="text-3xl font-bold text-theme-text">Account Settings</h2>

    <div className="space-y-6">
      {/* Profile Section */}
      <section className="p-6 bg-theme-surface border border-theme-border rounded-3xl space-y-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-primary-600/10 text-primary-600 rounded-xl"><User size={24} /></div>
          <h3 className="text-xl font-bold text-theme-text">Profile Information</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-theme-muted uppercase">Full Name</label>
            <input type="text" defaultValue="Augustine Boateng" className="w-full p-3 bg-theme-base border border-theme-border rounded-xl text-theme-text" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-theme-muted uppercase">Email Address</label>
            <input type="email" defaultValue="augustine@example.com" className="w-full p-3 bg-theme-base border border-theme-border rounded-xl text-theme-text" />
          </div>
        </div>
      </section>

      {/* Preferences Section */}
      <section className="p-6 bg-theme-surface border border-theme-border rounded-3xl space-y-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl"><Palette size={24} /></div>
          <h3 className="text-xl font-bold text-theme-text">App Preferences</h3>
        </div>
        <div className="flex items-center justify-between p-3 bg-theme-base rounded-2xl">
          <div className="flex items-center gap-3 text-theme-text">
            <Moon size={20} />
            <span className="font-medium">Dark Mode</span>
          </div>
          <div className="w-12 h-6 bg-primary-600 rounded-full relative cursor-pointer">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </section>
      
      <button className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold shadow-lg shadow-primary-600/20 hover:bg-primary-700 transition-all">
        Save All Changes
      </button>
    </div>
  </div>
);

export default SettingsPage;