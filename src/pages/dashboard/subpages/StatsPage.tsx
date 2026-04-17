import React from 'react';

const StatsPage = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-3xl font-bold text-theme-text">Church Analytics</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       <div className="h-64 bg-theme-surface border border-theme-border rounded-3xl p-6">
          <p className="text-theme-muted">Growth Chart Placeholder</p>
       </div>
       <div className="h-64 bg-theme-surface border border-theme-border rounded-3xl p-6">
          <p className="text-theme-muted">Demographics Chart Placeholder</p>
       </div>
    </div>
  </div>
);

export default StatsPage;