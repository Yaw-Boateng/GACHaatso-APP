import React, { useState } from "react";
import { Users, Shield, Calendar } from "lucide-react";
import { MetricCard } from "../components/MetricCard";
import { AttendanceTrendChart } from "../components/AttendanceTrendChart";
import { ServiceBreakdownChart } from "../components/ServiceBreakdownChart";
import { QuickActions } from "../components/QuickActions";
import { BirthdaySection } from "../components/BirthdaySection";
import { MissingAttendanceAlerts } from "../components/MissingAttendanceAlerts";
import { NotificationsSidebar } from "../components/NotificationsSidebar";


const AdminDashboard: React.FC = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))] pb-12 transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* 1. TOP METRICS ROW */}
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
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            <AttendanceTrendChart />
            <ServiceBreakdownChart />
          </div>

          {/* Right Sidebar Widgets */}
          <div className="space-y-5">
            <QuickActions />
            <BirthdaySection />
            <MissingAttendanceAlerts />
          </div>
        </div>
      </main>

      {/* Notifications Drawer */}
      <NotificationsSidebar
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
};

export default AdminDashboard;