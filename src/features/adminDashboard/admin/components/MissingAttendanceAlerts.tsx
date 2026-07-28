import React from "react";
import { AlertCircle, XCircle } from "lucide-react";
import { MOCK_MISSING_ATTENDANCE } from "../data/dashboardData";
import { Badge } from "./Badge";

export const MissingAttendanceAlerts: React.FC = () => (
  <div className="bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-primary))] rounded-2xl p-5 shadow-xs space-y-4">
    <div className="flex items-center justify-between border-b border-[rgb(var(--border-primary))] pb-3">
      <div className="flex items-center gap-2">
        <AlertCircle className="text-rose-500" size={18} />
        <h3 className="text-sm font-bold text-[rgb(var(--text-primary))]">Missing Attendance</h3>
      </div>
      <Badge variant="danger">{MOCK_MISSING_ATTENDANCE.length} Pending</Badge>
    </div>

    <p className="text-xs text-[rgb(var(--text-secondary))]">Leaders who haven't submitted member attendance:</p>

    <div className="space-y-3">
      {MOCK_MISSING_ATTENDANCE.map((leader) => (
        <div key={leader.id} className="p-3.5 rounded-xl bg-[rgb(var(--bg-tertiary))] border border-rose-500/20 flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5">
            <img src={leader.avatar} alt={leader.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold truncate">{leader.name}</p>
              <p className="text-[10px] text-[rgb(var(--text-muted))]">{leader.group} • {leader.memberCount} Members</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-[rgb(var(--border-primary))] text-[11px]">
            <span className="text-rose-500 font-semibold flex items-center gap-1">
              <XCircle size={12} /> {leader.unmarkedService} Unmarked
            </span>
            <button className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-md font-bold transition-colors cursor-pointer text-[10px]">
              Remind
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);