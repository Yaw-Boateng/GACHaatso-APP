// src/pages/dashboard/AdminDashboard.tsx
import React, { useState } from "react";
import {
  Users,
  Shield,
  Calendar,
  Mic,
  Cake,
  Send,
  AlertCircle,
  UserPlus,
  XCircle,
} from "lucide-react";

// --- Badge Component ---
interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "success" | "warning" | "danger" | "neutral";
}

const Badge: React.FC<BadgeProps> = ({ children, variant = "primary" }) => {
  const styles = {
    primary:
      "bg-primary-500/10 text-primary-600 dark:text-primary-400 border-primary-500/20",
    success:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    warning:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    danger:
      "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    neutral:
      "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${styles[variant]}`}
    >
      {children}
    </span>
  );
};

// --- Metric Card Component ---
interface MetricCardProps {
  title: string;
  value: string;
  growth: string;
  icon: React.ReactNode;
  sparklinePath: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
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
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 100 40"
          aria-hidden="true"
        >
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

// --- Main Dashboard Page ---
const AdminDashboard: React.FC = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))] pb-12 transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* 1. THREE METRICS CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <MetricCard
            title="Total Members"
            value="1,842"
            growth="+12%"
            icon={<Users size={22} />}
            sparklinePath="M0 30 Q 25 10, 50 22 T 100 5"
          />
          <MetricCard
            title="Total Leaders"
            value="86"
            growth="+3%"
            icon={<Shield size={22} />}
            sparklinePath="M0 25 Q 25 35, 50 15 T 100 10"
          />
          <MetricCard
            title="Total Events"
            value="148"
            growth="+6%"
            icon={<Calendar size={22} />}
            sparklinePath="M0 35 Q 25 20, 50 25 T 100 8"
          />
        </section>

        {/* 2. MAIN LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN (ANALYTICS & CHARTS) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Attendance Trend Chart */}
            <div className="bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-primary))] rounded-2xl p-6 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-[rgb(var(--text-primary))]">
                    Attendance Trend
                  </h3>
                  <p className="text-xs text-[rgb(var(--text-secondary))]">
                    Overall monthly attendance progression
                  </p>
                </div>
                <Badge variant="primary">Last 6 Months</Badge>
              </div>

              <div className="h-48 w-full relative">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 500 180"
                  aria-hidden="true"
                >
                  <line
                    x1="0"
                    y1="40"
                    x2="500"
                    y2="40"
                    stroke="rgb(var(--border-primary))"
                    strokeDasharray="4"
                  />
                  <line
                    x1="0"
                    y1="90"
                    x2="500"
                    y2="90"
                    stroke="rgb(var(--border-primary))"
                    strokeDasharray="4"
                  />
                  <line
                    x1="0"
                    y1="140"
                    x2="500"
                    y2="140"
                    stroke="rgb(var(--border-primary))"
                    strokeDasharray="4"
                  />

                  <path
                    d="M0 150 Q 100 70, 200 100 T 400 30 T 500 60 L 500 180 L 0 180 Z"
                    fill="rgba(59, 130, 246, 0.15)"
                  />
                  <path
                    d="M0 150 Q 100 70, 200 100 T 400 30 T 500 60"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx="200" cy="100" r="4" className="fill-blue-600" />
                  <circle cx="400" cy="30" r="5" className="fill-blue-600" />
                </svg>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-[rgb(var(--text-muted))] pt-3 border-t border-[rgb(var(--border-primary))]">
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
              </div>
            </div>

            {/* Sunday vs Tuesday Service Attendance Chart */}
            <div className="bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-primary))] rounded-2xl p-6 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-[rgb(var(--text-primary))]">
                    Service Attendance Breakdown
                  </h3>
                  <p className="text-xs text-[rgb(var(--text-secondary))]">
                    Members present vs absent for Sunday & Tuesday services
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-emerald-500 inline-block" />{" "}
                    Present
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-rose-500/30 inline-block" />{" "}
                    Absent
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Sunday Service */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Sunday Service</span>
                    <span className="text-[rgb(var(--text-secondary))]">
                      1,420 Present / 422 Absent (77% Attendance)
                    </span>
                  </div>
                  <div className="h-4 w-full bg-rose-500/20 rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: "77%" }}
                    />
                  </div>
                </div>

                {/* Tuesday Service */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Tuesday Teaching Service</span>
                    <span className="text-[rgb(var(--text-secondary))]">
                      1,105 Present / 737 Absent (60% Attendance)
                    </span>
                  </div>
                  <div className="h-4 w-full bg-rose-500/20 rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: "60%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (SIDE PANELS) */}
          <div className="space-y-5">
            {/* Quick Actions */}
            <div className="bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-primary))] rounded-2xl p-4 shadow-xs">
              <h3 className="text-xs font-bold text-[rgb(var(--text-muted))] uppercase tracking-wider mb-3">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { title: "Add Member", icon: <UserPlus size={15} /> },
                  { title: "Create Event", icon: <Calendar size={15} /> },
                  { title: "Upload Sermon", icon: <Mic size={15} /> },
                  { title: "Assign Leader", icon: <Shield size={15} /> },
                ].map((action, i) => (
                  <button
                    key={i}
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

            {/* Birthday Celebrations */}
            <div className="bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-primary))] rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[rgb(var(--border-primary))] pb-3">
                <div className="flex items-center gap-2">
                  <Cake className="text-pink-500" size={18} />
                  <h3 className="text-sm font-bold text-[rgb(var(--text-primary))]">
                    Birthdays This Week
                  </h3>
                </div>
                <Badge variant="primary">3 Total</Badge>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-primary))] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                      alt="Grace Mensah"
                      className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-pink-500/30"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate">Grace Mensah</p>
                      <p className="text-[10px] text-[rgb(var(--text-muted))]">
                        Choir • Turning 28
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Badge variant="danger">TODAY</Badge>
                    <button
                      className="p-1 text-pink-500 hover:bg-pink-500/10 rounded-md transition-colors cursor-pointer"
                      aria-label="Send birthday wish"
                    >
                      <Send size={12} />
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-primary))] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                      alt="Emmanuel Osei"
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate">Emmanuel Osei</p>
                      <p className="text-[10px] text-[rgb(var(--text-muted))]">
                        Youth Leader • Turning 32
                      </p>
                    </div>
                  </div>
                  <Badge variant="warning">Tomorrow</Badge>
                </div>

                <div className="p-3 rounded-xl bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-primary))] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
                      alt="Sarah Appiah"
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate">Sarah Appiah</p>
                      <p className="text-[10px] text-[rgb(var(--text-muted))]">
                        Ushering • Turning 25
                      </p>
                    </div>
                  </div>
                  <Badge variant="neutral">In 3 Days</Badge>
                </div>
              </div>
            </div>

            {/* Missing Attendance Alerts */}
            <div className="bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-primary))] rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[rgb(var(--border-primary))] pb-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="text-rose-500" size={18} />
                  <h3 className="text-sm font-bold text-[rgb(var(--text-primary))]">
                    Missing Attendance
                  </h3>
                </div>
                <Badge variant="danger">2 Pending</Badge>
              </div>

              <p className="text-xs text-[rgb(var(--text-secondary))]">
                Leaders who haven't submitted member attendance:
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[rgb(var(--bg-tertiary))] border border-rose-500/20 flex flex-col gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
                      alt="Kofi Boateng"
                      className="w-9 h-9 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold truncate">Kofi Boateng</p>
                      <p className="text-[10px] text-[rgb(var(--text-muted))]">
                        Cell Group A • 18 Members
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[rgb(var(--border-primary))] text-[11px]">
                    <span className="text-rose-500 font-semibold flex items-center gap-1">
                      <XCircle size={12} /> Sunday Service Unmarked
                    </span>
                    <button className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-md font-bold transition-colors cursor-pointer text-[10px]">
                      Remind
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[rgb(var(--bg-tertiary))] border border-rose-500/20 flex flex-col gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
                      alt="David Kwakye"
                      className="w-9 h-9 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold truncate">David Kwakye</p>
                      <p className="text-[10px] text-[rgb(var(--text-muted))]">
                        Youth Ministry • 42 Members
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[rgb(var(--border-primary))] text-[11px]">
                    <span className="text-rose-500 font-semibold flex items-center gap-1">
                      <XCircle size={12} /> Tuesday Service Unmarked
                    </span>
                    <button className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-md font-bold transition-colors cursor-pointer text-[10px]">
                      Remind
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* COLLAPSIBLE NOTIFICATIONS SIDEBAR */}
      {isNotificationsOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-[rgb(var(--bg-secondary))] h-full shadow-lg p-6 border-l border-[rgb(var(--border-primary))] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[rgb(var(--border-primary))]">
                <h3 className="font-bold text-sm">Notifications</h3>
                <button
                  onClick={() => setIsNotificationsOpen(false)}
                  className="text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] cursor-pointer"
                >
                  <XCircle size={18} />
                </button>
              </div>
              <div className="p-3 rounded-xl bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-primary))]">
                <p className="text-xs font-bold">New Prayer Request</p>
                <p className="text-xs text-[rgb(var(--text-secondary))] mt-1">
                  Sister Mary requested prayer support.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsNotificationsOpen(false)}
              className="px-4 py-2 border border-[rgb(var(--border-primary))] rounded-lg text-xs font-semibold hover:bg-[rgb(var(--bg-tertiary))] transition-colors w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;