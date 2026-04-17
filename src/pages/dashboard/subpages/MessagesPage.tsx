import React from 'react';
import { Megaphone, MessageSquare, Send } from 'lucide-react';

const MessagesPage = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold text-theme-text">Announcements</h2>
      <button className="bg-primary-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-700 transition-colors">
        <Send size={18} /> New Broadcast
      </button>
    </div>

    <div className="grid grid-cols-1 gap-4">
      {[
        { title: "Easter Sunday Service", sender: "Admin", date: "2 hours ago", type: "Announcement" },
        { title: "Mid-week Prayer Postponed", sender: "Pastor K.", date: "Yesterday", type: "Urgent" },
        { title: "New Resource Uploaded", sender: "Media Team", date: "2 days ago", type: "General" }
      ].map((msg, i) => (
        <div key={i} className="p-6 bg-theme-surface border border-theme-border rounded-3xl flex gap-5 hover:border-primary-600/50 transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-primary-600/10 rounded-2xl flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform">
            {msg.type === "Announcement" ? <Megaphone size={24} /> : <MessageSquare size={24} />}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-lg text-theme-text">{msg.title}</h4>
              <span className="text-xs font-medium text-theme-muted uppercase tracking-widest">{msg.date}</span>
            </div>
            <p className="text-theme-muted text-sm">Sent by <span className="text-primary-600 font-semibold">{msg.sender}</span></p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default MessagesPage;