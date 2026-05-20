import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { 
  CheckCircle, Clock, Search, XCircle, Loader2, 
  AlertTriangle, Trash2 
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const LeadersPage = () => {
  const { user } = useAuth(); // Get user directly from context
  const [activeTab, setActiveTab] = useState('pending');
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  // Memoize headers to prevent unnecessary re-renders of child components
  const headers = useMemo(() => ({
    'ngrok-skip-browser-warning': 'true',
    'Accept': 'application/json',
    'Authorization': `Bearer ${user?.token}`
  }), [user?.token]);

  const fetchLeaders = useCallback(async (showLoader = true) => {
    if (!user?.token) return;

    if (showLoader) setLoading(true);
    setError(null);

    try {
      const endpoint = activeTab === 'pending' 
        ? `${API_BASE}/admin/pending-leaders` 
        : `${API_BASE}/admin/approved-leaders`;
      
      const response = await axios.get(endpoint, {
        params: { page: 0, size: 1000 },
        headers
      });

      if (response.data.success) {
        const transformedContent = (response.data.data.content || []).map(item => ({
          ...item,
          fullName: `${item.firstName || ''} ${item.lastName || ''}`.trim() || 'Unknown Leader'
        }));
        setLeaders(transformedContent);
      }
    } catch (err) {
      setError("Failed to sync with leadership records.");
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [activeTab, headers, user?.token]);

  // Combined Effect: Only triggers when activeTab changes
  useEffect(() => {
    fetchLeaders();
  }, [fetchLeaders]);

  const handleAction = async (id, action) => {
    setProcessingId(id);
    try {
      const url = `${API_BASE}/api/v1/admin/${action}/${id}`;
      await axios.patch(url, {}, { headers });
      
      // Optimistic Update: Remove from current list immediately
      setLeaders(prev => prev.filter(l => l.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || `${action} failed`);
      fetchLeaders(false); // Re-sync on error
    } finally {
      setProcessingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!selectedLeader) return;
    const idToDelete = selectedLeader.id;
    
    setIsModalOpen(false);
    setProcessingId(idToDelete);

    try {
      const response = await axios.delete(`${API_BASE}/api/v1/admin/delete/${idToDelete}`, { headers });
      if (response.data.success) {
        setLeaders(prev => prev.filter(leader => leader.id !== idToDelete));
      }
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || "Delete failed"}`);
      fetchLeaders(false);
    } finally {
      setSelectedLeader(null);
      setProcessingId(null);
    }
  };

  const filteredLeaders = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return leaders.filter(leader => 
      (leader.fullName || "").toLowerCase().includes(query) || 
      (leader.role || "").toLowerCase().includes(query)
    );
  }, [leaders, searchQuery]);

  return (
    <div className="relative space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-theme-text">
      
      {/* DELETE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-theme-surface border border-theme-border p-8 rounded-3xl max-w-md w-full shadow-2xl">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Confirm Deletion</h3>
            <p className="text-theme-muted text-center mb-8">
              Are you sure you want to delete <span className="font-bold text-theme-text">{selectedLeader?.fullName}</span>?
            </p>
            <div className="flex gap-3">
              <button onClick={() => { setIsModalOpen(false); setSelectedLeader(null); }} className="flex-1 px-6 py-3 rounded-xl font-bold bg-theme-base border border-theme-border">
                Cancel
              </button>
              <button onClick={confirmDelete} className="flex-1 px-6 py-3 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Leader Management</h2>
          <p className="text-theme-muted">Review and manage church leadership appointments.</p>
        </div>
        
        <div className="flex p-1 bg-theme-surface border border-theme-border rounded-2xl w-fit shadow-sm">
          {['pending', 'approved'].map((tab) => (
            <button 
              key={tab}
              onClick={() => {
                setLeaders([]); // Clear list so user sees fresh loading state
                setActiveTab(tab);
              }}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl font-semibold transition-all capitalize ${
                activeTab === tab 
                ? (tab === 'pending' ? 'bg-primary-600 text-white shadow-lg' : 'bg-emerald-500 text-white shadow-lg') 
                : 'text-theme-muted hover:text-theme-text'
              }`}
            >
              {tab === 'pending' ? <Clock size={18} /> : <CheckCircle size={18} />} {tab}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500">
          <AlertTriangle size={20} />
          <p className="font-medium">{error}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-theme-surface border border-theme-border p-4 rounded-3xl shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted" size={18} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or role..." 
            className="w-full pl-12 pr-4 py-2 bg-theme-base border border-theme-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600/50 transition-all"
          />
        </div>
        <div className="text-sm text-theme-muted font-medium">
          Total: {filteredLeaders.length}
        </div>
      </div>

      <div className="bg-theme-surface border border-theme-border rounded-3xl overflow-hidden shadow-sm min-h-[400px]">
        {loading ? (
          <div className="h-[400px] flex flex-col items-center justify-center gap-3">
            <Loader2 className="animate-spin text-primary-600" size={40} />
            <p className="text-sm font-medium text-theme-muted">Fetching {activeTab} leaders...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-theme-border bg-theme-base/50">
                  <th className="px-6 py-4 text-theme-muted font-semibold uppercase text-xs">Leader Details</th>
                  <th className="px-6 py-4 text-theme-muted font-semibold uppercase text-xs">Status</th>
                  <th className="px-6 py-4 text-theme-muted font-semibold uppercase text-xs text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme-border">
                {filteredLeaders.length > 0 ? (
                  filteredLeaders.map((leader) => (
                    <tr key={leader.id} className="hover:bg-theme-base/30 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-600/10 flex items-center justify-center text-primary-600 font-bold border border-primary-600/20">
                            {leader.firstName?.charAt(0) || 'L'}
                          </div>
                          <div>
                            <p className="font-bold">{leader.fullName}</p>
                            <p className="text-sm text-theme-muted">{leader.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                          leader.approvalStatus === 'APPROVED' 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                          : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                        }`}>
                          {leader.approvalStatus}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {activeTab === 'pending' ? (
                            <>
                              <button 
                                disabled={processingId === leader.id}
                                onClick={() => handleAction(leader.id, 'approve')} 
                                className="min-w-[100px] flex items-center justify-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-lg text-sm font-bold hover:bg-emerald-500 hover:text-white disabled:opacity-50 transition-all"
                              >
                                {processingId === leader.id ? <Loader2 size={14} className="animate-spin" /> : "Approve"}
                              </button>
                              <button 
                                disabled={processingId === leader.id}
                                onClick={() => handleAction(leader.id, 'reject')} 
                                className="min-w-[100px] flex items-center justify-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg text-sm font-bold hover:bg-red-500 hover:text-white disabled:opacity-50 transition-all"
                              >
                                {processingId === leader.id ? <Loader2 size={14} className="animate-spin" /> : "Reject"}
                              </button>
                            </>
                          ) : (
                            <button 
                              disabled={processingId === leader.id}
                              onClick={() => { setSelectedLeader(leader); setIsModalOpen(true); }}
                              className="px-4 py-1.5 bg-red-500/5 text-red-500 border border-red-500/20 rounded-lg text-sm font-bold hover:bg-red-600 hover:text-white flex items-center gap-2 transition-all"
                            >
                              {processingId === leader.id ? <Loader2 size={14} className="animate-spin" /> : <><Trash2 size={14} /> Revoke</>}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-20 text-center">
                      <p className="text-theme-muted font-medium">No {activeTab} leaders found.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadersPage;