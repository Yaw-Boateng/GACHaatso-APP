import React from 'react';
import { Users, AlertCircle, CheckCircle2 } from 'lucide-react';

// --- Types ---
interface AnalyticsPoint {
  day: string;
  count: number;
}

// --- Internal UI Components ---
const Card = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div className="bg-theme-surface border border-theme-border rounded-3xl p-6 shadow-sm">
    {title && <h3 className="text-xl font-bold mb-6 text-theme-text">{title}</h3>}
    {children}
  </div>
);

// Placeholder for your BarChart
const BarChart = ({ data }: { data: AnalyticsPoint[] }) => (
  <div className="h-48 w-full bg-theme-base/50 rounded-xl flex items-end justify-around p-4 border border-theme-border">
    {data.map((point) => (
      <div key={point.day} className="flex flex-col items-center gap-2">
        <div 
          className="w-8 bg-primary-600 rounded-t-md transition-all hover:bg-primary-500" 
          style={{ height: `${(point.count / 15) * 100}px` }}
        />
        <span className="text-[10px] text-theme-muted uppercase font-bold">{point.day}</span>
      </div>
    ))}
  </div>
);

// --- Dashboard Component ---
const LeaderDashboard: React.FC = () => {
  // Sample data for the chart
  const groupAnalytics: AnalyticsPoint[] = [
    { day: 'Wk 1', count: 10 },
    { day: 'Wk 2', count: 12 },
    { day: 'Wk 3', count: 8 },
    { day: 'Wk 4', count: 11 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary-600 mb-1">
            <Users size={20} />
            <span className="text-sm font-bold uppercase tracking-wider">Shepherding</span>
          </div>
          <h2 className="text-3xl font-bold text-theme-text">My Assigned Group</h2>
          <p className="text-theme-muted">Manage your 12 assigned members and tracking</p>
        </div>
        <button className="w-full md:w-auto px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold shadow-lg shadow-primary-600/20 transition-all flex items-center justify-center gap-2">
          <CheckCircle2 size={18} />
          Mark Today's Attendance
        </button>
      </header>

      {/* Group Table Placeholder */}
      <Card>
        <div className="overflow-x-auto">
          <div className="min-w-full p-4 text-center border-2 border-dashed border-theme-border rounded-2xl">
            <p className="text-theme-muted italic">
              MemberTable component will render here (Scoped to: assigned_only)
            </p>
          </div>
        </div>
      </Card>

      {/* Analytics & Alerts Grid */}
      <section className="grid md:grid-cols-2 gap-8">
        <Card title="Weekly Group Attendance">
          <BarChart data={groupAnalytics} />
        </Card>
        
        <Card title="Member Alerts">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl">
              <AlertCircle className="text-red-600 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-red-900 dark:text-red-400">Attendance Drop</h4>
                <p className="text-sm text-red-700 dark:text-red-400/80">
                  3 members have missed 2 consecutive weeks. Consider reaching out.
                </p>
              </div>
            </div>
            
            <button className="w-full py-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
              View All Alerts →
            </button>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default LeaderDashboard;