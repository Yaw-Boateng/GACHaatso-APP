import React from "react";
import { Badge } from "./Badge";

export interface MetricCardProps {
  title: string;
  value: string;
  growth: string;
  icon: React.ReactNode;
  sparklinePath: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  growth,
  icon,
  sparklinePath,
}) => (
  <div className="bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-primary))] p-5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
    <div className="flex items-center justify-between mb-3">
      <div className="p-3 rounded-xl bg-[rgb(var(--bg-tertiary))] text-primary-600 dark:text-primary-400">
        {icon}
      </div>
      <Badge variant="success">{growth}</Badge>
    </div>

    <div className="flex items-end justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--text-muted))] mb-1">
          {title}
        </p>
        <h3 className="text-2xl font-extrabold text-[rgb(var(--text-primary))] tracking-tight">
          {value}
        </h3>
      </div>

      <div className="w-20 h-9">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" aria-hidden="true">
          <path
            d={sparklinePath}
            fill="none"
            stroke="currentColor"
            className="text-[rgb(var(--text-secondary))]"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  </div>
);