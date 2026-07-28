import React from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Calendar } from "lucide-react";

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    { title: "Add Member", icon: <UserPlus size={15} />, path: "/dashboard/members" },
    { title: "Create Event", icon: <Calendar size={15} />, path: "/dashboard/eventsdb" },
  ];

  return (
    <div className="bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-primary))] rounded-2xl p-4 shadow-xs">
      <h3 className="text-xs font-bold text-[rgb(var(--text-muted))] uppercase tracking-wider mb-3">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action, i) => (
          <button
            key={i}
            onClick={() => navigate(action.path)}
            className="p-2.5 bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-primary))] rounded-xl flex items-center gap-2 hover:border-primary-500/50 hover:bg-[rgb(var(--bg-primary))] transition-all group cursor-pointer text-left"
          >
            <div className="text-[rgb(var(--text-secondary))] group-hover:text-primary-600 transition-colors">
              {action.icon}
            </div>
            <span className="text-xs font-semibold text-[rgb(var(--text-primary))] truncate">
              {action.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};