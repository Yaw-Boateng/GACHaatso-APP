import React from 'react';
import { CheckCircle, Calendar, BookOpen } from 'lucide-react';

// --- Temporary Internal Components (Replace these with your actual UI components later) ---

const StatCard = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => (
  <div className="p-6 bg-theme-surface border border-theme-border rounded-2xl shadow-sm flex items-center gap-4">
    <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-primary-600">
      {icon}
    </div>
    <div>
      <p className="text-sm text-theme-muted font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-theme-text">{value}</h3>
    </div>
  </div>
);

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-theme-surface border border-theme-border rounded-3xl p-6 shadow-sm">
    <h3 className="text-xl font-bold mb-6 text-theme-text">{title}</h3>
    {children}
  </div>
);

// --- Dashboard Component ---

const MemberDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Stats Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Attendance Rate" 
          value="85%" 
          icon={<CheckCircle size={24} className="text-green-500" />} 
        />
        <StatCard 
          title="Upcoming Events" 
          value="3" 
          icon={<Calendar size={24} className="text-primary-600" />} 
        />
        <StatCard 
          title="Resources Read" 
          value="12" 
          icon={<BookOpen size={24} className="text-blue-500" />} 
        />
      </section>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card title="My Registered Events">
          <div className="text-theme-muted text-sm italic">
            {/* Replace with <EventList filter="registered" /> later */}
            No events registered yet.
          </div>
        </Card>
        <Card title="Bible Resources">
          <div className="text-theme-muted text-sm italic">
            {/* Replace with <ResourceGrid /> later */}
            New resources coming soon...
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MemberDashboard;