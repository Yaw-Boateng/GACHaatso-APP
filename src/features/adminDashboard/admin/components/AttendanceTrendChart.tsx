import React from "react";
import { Badge } from "./Badge";

export const AttendanceTrendChart: React.FC = () => (
  <div className="bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-primary))] rounded-2xl p-6 shadow-xs">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-base font-bold text-[rgb(var(--text-primary))]">Attendance Trend</h3>
        <p className="text-xs text-[rgb(var(--text-secondary))]">Overall monthly attendance progression</p>
      </div>
      <Badge variant="primary">Last 6 Months</Badge>
    </div>

    <div className="h-48 w-full relative">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 500 180" aria-hidden="true">
        <line x1="0" y1="40" x2="500" y2="40" stroke="rgb(var(--border-primary))" strokeDasharray="4" />
        <line x1="0" y1="90" x2="500" y2="90" stroke="rgb(var(--border-primary))" strokeDasharray="4" />
        <line x1="0" y1="140" x2="500" y2="140" stroke="rgb(var(--border-primary))" strokeDasharray="4" />
        <path d="M0 150 Q 100 70, 200 100 T 400 30 T 500 60 L 500 180 L 0 180 Z" fill="rgba(59, 130, 246, 0.15)" />
        <path d="M0 150 Q 100 70, 200 100 T 400 30 T 500 60" fill="none" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="200" cy="100" r="4" className="fill-blue-600" />
        <circle cx="400" cy="30" r="5" className="fill-blue-600" />
      </svg>
    </div>

    <div className="flex items-center justify-between text-xs font-semibold text-[rgb(var(--text-muted))] pt-3 border-t border-[rgb(var(--border-primary))]">
      {["Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((m) => (
        <span key={m}>{m}</span>
      ))}
    </div>
  </div>
);