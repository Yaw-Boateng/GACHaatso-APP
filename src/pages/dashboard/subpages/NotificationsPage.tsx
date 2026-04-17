import React from 'react';
import { Bell, Calendar, Wallet, UserCheck } from 'lucide-react';

const NotificationsPage = () => (
  <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex justify-between items-center border-b border-theme-border pb-6">
      <h2 className="text-3xl font-bold text-theme-text">Notifications</h2>
      <button className="text-primary-600 font-bold text-sm hover:underline">Mark all as read</button>
    </div>

    <div className="space-y-2">
      {[
        { text: "Your tithe for March has been recorded.", icon: <Wallet size={18} />, time: "10m ago", color: "text-emerald-500" },
        { text: "New event: Youth Camp 2026 registration is open.", icon: <Calendar size={18} />, time: "1h ago", color: "text-blue-500" },
        { text: "Leader Augustine marked you as present.", icon: <UserCheck size={18} />, time: "Yesterday", color: "text-purple-500" },
        { text: "Welcome to the new GAC Church Portal!", icon: <Bell size={18} />, time: "2 days ago", color: "text-primary-600" }
      ].map((notif, i) => (
        <div key={i} className="flex items-center gap-4 p-4 hover:bg-theme-surface rounded-2xl transition-colors border border-transparent hover:border-theme-border">
          <div className={`p-3 rounded-xl bg-theme-base ${notif.color}`}>
            {notif.icon}
          </div>
          <div className="flex-1">
            <p className="text-theme-text font-medium">{notif.text}</p>
            <p className="text-xs text-theme-muted">{notif.time}</p>
          </div>
          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
        </div>
      ))}
    </div>
  </div>
);

export default NotificationsPage;