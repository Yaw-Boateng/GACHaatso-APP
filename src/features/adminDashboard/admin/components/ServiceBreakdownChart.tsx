import React from "react";

interface ServiceItemProps {
  title: string;
  present: number;
  absent: number;
  percentage: number;
}

const ServiceProgressBar: React.FC<ServiceItemProps> = ({ title, present, absent, percentage }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-xs font-bold">
      <span>{title}</span>
      <span className="text-[rgb(var(--text-secondary))]">
        {present.toLocaleString()} Present / {absent.toLocaleString()} Absent ({percentage}% Attendance)
      </span>
    </div>
    <div className="h-4 w-full bg-rose-500/20 rounded-full overflow-hidden flex">
      <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
    </div>
  </div>
);

export const ServiceBreakdownChart: React.FC = () => (
  <div className="bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-primary))] rounded-2xl p-6 shadow-xs">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-base font-bold text-[rgb(var(--text-primary))]">Service Attendance Breakdown</h3>
        <p className="text-xs text-[rgb(var(--text-secondary))]">Members present vs absent for Sunday & Tuesday services</p>
      </div>
      <div className="flex items-center gap-4 text-xs font-semibold">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-emerald-500 inline-block" /> Present</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-rose-500/30 inline-block" /> Absent</span>
      </div>
    </div>

    <div className="space-y-6">
      <ServiceProgressBar title="Sunday Service" present={1420} absent={422} percentage={77} />
      <ServiceProgressBar title="Tuesday Teaching Service" present={1105} absent={737} percentage={60} />
    </div>
  </div>
);