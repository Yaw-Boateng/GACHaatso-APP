import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "success" | "warning" | "danger" | "neutral";
}

const styles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  primary: "bg-primary-500/10 text-primary-600 dark:text-primary-400 border-primary-500/20",
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  danger: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  neutral: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
};

export const Badge: React.FC<BadgeProps> = ({ children, variant = "primary" }) => {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${styles[variant]}`}>
      {children}
    </span>
  );
};