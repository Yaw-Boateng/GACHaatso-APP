import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  Video, 
  Download, 
  Search,
  Filter
} from 'lucide-react';

const ResourcesPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'study', label: 'Study Guides' },
    { id: 'sermons', label: 'Sermon Notes' },
    { id: 'docs', label: 'Church Docs' },
  ];

  const resources = [
    { title: "Walking in Faith 101", type: "PDF", category: "study", size: "2.4 MB", date: "Mar 20, 2026" },
    { title: "Sunday Service Recap - Victory", type: "Video", category: "sermons", size: "156 MB", date: "Mar 22, 2026" },
    { title: "2026 Church Constitution", type: "DOCX", category: "docs", size: "1.1 MB", date: "Jan 05, 2026" },
    { title: "Foundations of Prayer", type: "PDF", category: "study", size: "3.8 MB", date: "Feb 14, 2026" },
  ];

  const filteredResources = activeTab === 'all' 
    ? resources 
    : resources.filter(r => r.category === activeTab);

  const getIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="text-red-500" />;
      case 'Video': return <Video className="text-blue-500" />;
      default: return <BookOpen className="text-primary-600" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-theme-text">Resources</h2>
          <p className="text-theme-muted">Access study materials and church documents.</p>
        </div>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted group-focus-within:text-primary-600 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search resources..." 
            className="pl-12 pr-4 py-3 bg-theme-surface border border-theme-border rounded-2xl w-full md:w-64 focus:ring-2 focus:ring-primary-600 outline-none transition-all"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-6 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeTab === cat.id 
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20' 
                : 'bg-theme-surface text-theme-muted hover:bg-theme-base border border-theme-border'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((item, i) => (
          <div key={i} className="group p-6 bg-theme-surface border border-theme-border rounded-3xl hover:border-primary-600/50 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-theme-base rounded-2xl">
                {getIcon(item.type)}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-theme-muted opacity-50">
                {item.size}
              </span>
            </div>
            
            <h4 className="text-lg font-bold text-theme-text mb-1 group-hover:text-primary-600 transition-colors">
              {item.title}
            </h4>
            <p className="text-xs text-theme-muted mb-6">Added on {item.date}</p>
            
            <button className="w-full py-3 flex items-center justify-center gap-2 bg-theme-base border border-theme-border rounded-xl text-theme-text font-bold hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all">
              <Download size={18} /> Download {item.type}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;