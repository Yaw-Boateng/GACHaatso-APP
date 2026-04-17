import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';

const FinancesPage = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="flex justify-between items-end">
      <div>
        <h2 className="text-3xl font-bold text-theme-text">Financial Overview</h2>
        <p className="text-theme-muted">Track tithes, offerings, and church expenses.</p>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 bg-theme-surface border border-theme-border rounded-xl text-theme-text font-semibold hover:bg-theme-base transition-all">
        <Download size={18} /> Export Report
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { label: 'Total Revenue', amount: 'GH₵ 45,230', icon: <ArrowUpRight className="text-emerald-500" />, color: 'bg-emerald-500/10' },
        { label: 'Total Expenses', amount: 'GH₵ 12,840', icon: <ArrowDownRight className="text-red-500" />, color: 'bg-red-500/10' },
        { label: 'Net Balance', amount: 'GH₵ 32,390', icon: <Wallet className="text-primary-600" />, color: 'bg-primary-600/10' },
      ].map((stat, i) => (
        <div key={i} className="p-6 bg-theme-surface border border-theme-border rounded-3xl">
          <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
            {stat.icon}
          </div>
          <p className="text-theme-muted font-medium">{stat.label}</p>
          <h3 className="text-2xl font-bold text-theme-text">{stat.amount}</h3>
        </div>
      ))}
    </div>

    <div className="bg-theme-surface border border-theme-border rounded-3xl p-8 h-64 flex items-center justify-center italic text-theme-muted">
      [Transaction History Chart Placeholder]
    </div>
  </div>
);

export default FinancesPage;