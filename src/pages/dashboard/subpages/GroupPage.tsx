import React from 'react';
import { Users, Phone, Mail, Cake, MoreHorizontal, ExternalLink } from 'lucide-react';

const GroupPage = () => {
  const members = [
    { name: "Sarah Mensah", email: "sarah.m@example.com", phone: "+233 24 123 4567", birthday: "April 12", status: "Active" },
    { name: "John Doe", email: "j.doe@example.com", phone: "+233 50 987 6543", birthday: "March 29", status: "Active" },
    { name: "Prince Asante", email: "prince.a@example.com", phone: "+233 20 444 5555", birthday: "May 02", status: "Inactive" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-theme-text">My Group</h2>
          <p className="text-theme-muted">Manage your assigned church cell group members.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-theme-surface border border-theme-border px-6 py-3 rounded-2xl flex items-center gap-3">
            <Users className="text-primary-600" size={20} />
            <span className="font-bold text-theme-text">{members.length} Members</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Members List Table */}
        <div className="xl:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-theme-text flex items-center gap-2">
            Member Directory
          </h3>
          <div className="bg-theme-surface border border-theme-border rounded-[2.5rem] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-theme-base/50 text-theme-muted uppercase text-[10px] font-black tracking-widest">
                  <th className="px-8 py-5">Member</th>
                  <th className="px-8 py-5">Contact</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme-border">
                {members.map((member, i) => (
                  <tr key={i} className="hover:bg-theme-base/30 transition-colors group">
                    <td className="px-8 py-5">
                      <p className="font-bold text-theme-text group-hover:text-primary-600 transition-colors">{member.name}</p>
                      <p className="text-xs text-theme-muted flex items-center gap-1 mt-1">
                        <Cake size={12} className="text-pink-500" /> Birthday: {member.birthday}
                      </p>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex gap-3">
                        <a href={`tel:${member.phone}`} className="p-2 bg-theme-base rounded-lg text-theme-muted hover:text-primary-600 hover:bg-primary-600/10 transition-all">
                          <Phone size={16} />
                        </a>
                        <a href={`mailto:${member.email}`} className="p-2 bg-theme-base rounded-lg text-theme-muted hover:text-primary-600 hover:bg-primary-600/10 transition-all">
                          <Mail size={16} />
                        </a>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        member.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="text-theme-muted hover:text-theme-text transition-colors">
                        <MoreHorizontal size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar: Upcoming Birthdays & Quick Links */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary-600 to-indigo-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary-600/20">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Cake size={24} /> Birthday Alert
            </h3>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">
              John Doe has a birthday this Sunday! Don't forget to send a message from the group.
            </p>
            <button className="w-full py-3 bg-white text-primary-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-opacity-90 transition-all">
              Send Group Wish
            </button>
          </div>

          <div className="p-6 bg-theme-surface border border-theme-border rounded-[2.5rem] space-y-4">
            <h4 className="font-bold text-theme-text px-2">Leader Resources</h4>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-4 hover:bg-theme-base rounded-2xl text-theme-muted hover:text-primary-600 transition-all group">
                <span className="font-semibold text-sm">Leadership Manual</span>
                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-theme-base rounded-2xl text-theme-muted hover:text-primary-600 transition-all group">
                <span className="font-semibold text-sm">Monthly Report Template</span>
                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupPage;