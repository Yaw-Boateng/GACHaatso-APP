import React from 'react';
import { 
  Send, Plus, UserPlus, BellRing, 
  TrendingUp, Users, Shield, MessageSquare 
} from 'lucide-react';

// --- Types ---
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  isFinancial?: boolean;
}

interface QuickActionProps {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

// --- Internal UI Components ---
const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-theme-surface border border-theme-border rounded-3xl p-6 shadow-sm">
    <h3 className="text-xl font-bold mb-6 text-theme-text">{title}</h3>
    {children}
  </div>
);

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, isFinancial }) => (
  <div className="p-6 bg-theme-surface border border-theme-border rounded-2xl shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02]">
    <div className={`p-3 rounded-xl ${isFinancial ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' : 'bg-primary-50 text-primary-600 dark:bg-primary-900/20'}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-theme-muted font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-theme-text">{value}</h3>
    </div>
  </div>
);

const QuickAction: React.FC<QuickActionProps> = ({ title, icon, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between p-4 bg-theme-surface border border-theme-border rounded-2xl hover:border-primary-600/50 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-all group text-left"
  >
    <div className="flex items-center gap-3">
      <div className="text-theme-muted group-hover:text-primary-600 transition-colors">
        {icon}
      </div>
      <span className="font-semibold text-theme-text">{title}</span>
    </div>
    <Plus size={16} className="text-theme-muted group-hover:text-primary-600" />
  </button>
);

// --- Dashboard Component ---
const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. Global Stats Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="₵45,200" 
          isFinancial 
          icon={<TrendingUp size={24} />} 
        />
        <StatCard 
          title="Total Members" 
          value="1,240" 
          icon={<Users size={24} />} 
        />
        <StatCard 
          title="Active Leaders" 
          value="45" 
          icon={<Shield size={24} />} 
        />
        <StatCard 
          title="Pending Messages" 
          value="8" 
          icon={<MessageSquare size={24} />} 
        />
      </section>

      {/* 2. Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Charts and Lists */}
        <div className="lg:col-span-2 space-y-8">
          <Card title="Financial Analytics">
            <div className="h-64 w-full bg-theme-base/30 rounded-2xl border border-dashed border-theme-border flex items-center justify-center">
              <p className="text-theme-muted italic">LineChart [Revenue over Time] goes here</p>
            </div>
          </Card>

          <Card title="Recent Contact Messages">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 rounded-xl bg-theme-base/50 border border-theme-border flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-theme-text">Inquiry from Guest {i}</h4>
                    <p className="text-xs text-theme-muted">Regarding: Baptism Service</p>
                  </div>
                  <button className="text-sm text-primary-600 font-bold hover:underline">View</button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Quick Actions */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-theme-text px-2">Control Center</h3>
          <div className="space-y-3">
            <QuickAction title="Bulk Communication" icon={<Send size={20} />} />
            <QuickAction title="Add New Event" icon={<Plus size={20} />} />
            <QuickAction title="Assign Members" icon={<UserPlus size={20} />} />
            <QuickAction title="System Alerts" icon={<BellRing size={20} />} />
          </div>
          
          <div className="p-6 bg-primary-600 rounded-3xl text-white shadow-xl shadow-primary-600/20">
            <h4 className="font-bold mb-2">System Status</h4>
            <p className="text-sm opacity-90 mb-4">All services are running normally. Attendance sync complete.</p>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div className="bg-white h-full w-[95%]" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;