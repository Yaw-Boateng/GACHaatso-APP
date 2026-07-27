import React, { useState, useMemo } from 'react';
import { 
  CheckCircle, Clock, Search, Loader2, 
  AlertTriangle, Trash2, UserPlus, ShieldAlert, 
  Calendar, Users, UserCheck, X
} from 'lucide-react';
import { useLeaders } from '../hooks/useLeaders';
import { useAuth } from '../../auth';

const LeadersPage = () => {
  const { user } = useAuth(); 
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'approved'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPromoteModalOpen, setIsPromoteModalOpen] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  // Promote Member Form State
  const [promoteForm, setPromoteForm] = useState({
    memberName: '',
    role: 'Cell Leader',
    assignedCell: '',
  });

  // Extract primitive token to stabilize the useMemo dependency
  const token = user?.token;
  const headers = useMemo(() => ({
    Authorization: token ? `Bearer ${token}` : ''
  }), [token]);

  const { 
    leaders = [], 
    isLoading, 
    isError, 
    executeAction, 
    executeDelete,
    isProcessing 
  } = useLeaders(activeTab, headers);

  const handleAction = async (id, action, payload = null) => {
    setProcessingId(id);
    try {
      await executeAction({ id, action, payload });
    } catch (err) {
      alert(err.response?.data?.message || `${action} failed`);
    } finally {
      setProcessingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!selectedLeader) return;
    const idToDelete = selectedLeader.id;
    
    setIsDeleteModalOpen(false);
    setProcessingId(idToDelete);

    try {
      await executeDelete(idToDelete);
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || "Delete failed"}`);
    } finally {
      setSelectedLeader(null);
      setProcessingId(null);
    }
  };

  const handlePromoteSubmit = async (e) => {
    e.preventDefault();
    if (!promoteForm.memberName.trim()) return;
    
    // Pass form state payload along with the action
    await handleAction(null, 'promote', promoteForm);
    setIsPromoteModalOpen(false);
    setPromoteForm({ memberName: '', role: 'Cell Leader', assignedCell: '' });
  };

  const filteredLeaders = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return leaders;

    return leaders.filter(leader => 
      (leader.fullName || "").toLowerCase().includes(query) || 
      (leader.role || "").toLowerCase().includes(query)
    );
  }, [leaders, searchQuery]);

  return (
    <div className="relative space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 text-theme-text">
      
      {/* 1. DELETE / REVOKE MODAL */}
      {isDeleteModalOpen && (
        <div 
          onClick={() => { setIsDeleteModalOpen(false); setSelectedLeader(null); }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-theme-surface border border-theme-border p-6 sm:p-8 rounded-3xl max-w-md w-full shadow-2xl space-y-4"
          >
            <div className="w-14 h-14 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto">
              <Trash2 size={28} />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-xl font-bold">Revoke Leadership Access</h3>
              <p className="text-sm text-theme-muted">
                Are you sure you want to revoke leadership status for <span className="font-bold text-theme-text">{selectedLeader?.fullName}</span>?
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button 
                type="button"
                onClick={() => { setIsDeleteModalOpen(false); setSelectedLeader(null); }} 
                className="flex-1 px-5 py-2.5 rounded-xl font-bold bg-theme-base border border-theme-border text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={confirmDelete} 
                className="flex-1 px-5 py-2.5 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 transition-colors text-xs cursor-pointer shadow-lg shadow-red-500/20"
              >
                Revoke Leader
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. PROMOTE MEMBER TO LEADER MODAL */}
      {isPromoteModalOpen && (
        <div 
          onClick={() => setIsPromoteModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-theme-surface border border-theme-border p-6 sm:p-8 rounded-3xl max-w-md w-full shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between border-b border-theme-border pb-3">
              <div className="flex items-center gap-2">
                <UserCheck className="text-primary-600" size={20} />
                <h3 className="text-lg font-bold">Promote Member to Leader</h3>
              </div>
              <button 
                type="button"
                onClick={() => setIsPromoteModalOpen(false)} 
                className="text-theme-muted hover:text-theme-text cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handlePromoteSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-theme-muted uppercase tracking-wider">Select Member</label>
                <input 
                  type="text" 
                  placeholder="Type member name..."
                  value={promoteForm.memberName}
                  onChange={(e) => setPromoteForm({ ...promoteForm, memberName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-theme-base border border-theme-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-600/50"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-theme-muted uppercase tracking-wider">Leadership Role</label>
                <select 
                  value={promoteForm.role}
                  onChange={(e) => setPromoteForm({ ...promoteForm, role: e.target.value })}
                  className="w-full px-4 py-2.5 bg-theme-base border border-theme-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-600/50"
                >
                  <option value="Cell Leader">Cell Leader</option>
                  <option value="Assistant Cell Leader">Assistant Cell Leader</option>
                  <option value="Department Head">Department Head</option>
                  <option value="Youth Leader">Youth Leader</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-theme-muted uppercase tracking-wider">Assigned Group / Cell</label>
                <input 
                  type="text" 
                  placeholder="e.g. Grace Cell / Choir"
                  value={promoteForm.assignedCell}
                  onChange={(e) => setPromoteForm({ ...promoteForm, assignedCell: e.target.value })}
                  className="w-full px-4 py-2.5 bg-theme-base border border-theme-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-600/50"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button 
                  type="button"
                  onClick={() => setIsPromoteModalOpen(false)} 
                  className="flex-1 px-4 py-2.5 rounded-xl font-bold bg-theme-base border border-theme-border text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-xl font-bold bg-primary-600 text-white hover:bg-primary-700 transition-colors text-xs cursor-pointer shadow-lg shadow-primary-600/20"
                >
                  Assign Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Leader Management</h2>
          <p className="text-xs sm:text-sm text-theme-muted">Approve pending logins, assign roles, and monitor attendance tracking.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => setIsPromoteModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl font-bold text-xs hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20 cursor-pointer"
          >
            <UserPlus size={16} /> Promote Member
          </button>

          {/* Pending Approval vs Approved Tabs */}
          <div className="flex p-1 bg-theme-surface border border-theme-border rounded-xl w-fit shadow-xs">
            {['pending', 'approved'].map((tab) => (
              <button 
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all capitalize cursor-pointer ${
                  activeTab === tab 
                  ? (tab === 'pending' ? 'bg-amber-500 text-white shadow-xs' : 'bg-emerald-500 text-white shadow-xs') 
                  : 'text-theme-muted hover:text-theme-text'
                }`}
              >
                {tab === 'pending' ? <Clock size={14} /> : <CheckCircle size={14} />} 
                {tab === 'pending' ? 'Pending Approval' : 'Approved Leaders'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isError && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs">
          <AlertTriangle size={18} />
          <p className="font-semibold">Failed to sync with leadership records.</p>
        </div>
      )}

      {/* CONTROLS & SEARCH */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-theme-surface border border-theme-border p-4 rounded-2xl shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-muted" size={16} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or role..." 
            className="w-full pl-10 pr-4 py-2 bg-theme-base border border-theme-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary-600/50"
          />
        </div>
        <div className="text-xs text-theme-muted font-bold">
          Showing {filteredLeaders.length} {activeTab} leaders
        </div>
      </div>

      {/* LEADERS TABLE */}
      <div className="bg-theme-surface border border-theme-border rounded-2xl overflow-hidden shadow-xs min-h-[350px]">
        {isLoading ? (
          <div className="h-[350px] flex flex-col items-center justify-center gap-3">
            <Loader2 className="animate-spin text-primary-600" size={32} />
            <p className="text-xs font-bold text-theme-muted">Fetching {activeTab} leaders...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-theme-border bg-theme-base/50 text-[11px] font-bold text-theme-muted uppercase tracking-wider">
                  <th className="px-6 py-3.5">Leader Details</th>
                  <th className="px-6 py-3.5">Assigned Members</th>
                  <th className="px-6 py-3.5">Last Marked Date</th>
                  <th className="px-6 py-3.5">Attendance Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme-border text-xs">
                {filteredLeaders.length > 0 ? (
                  filteredLeaders.map((leader, index) => {
                    const unmarkedCount = leader.unmarkedServicesCount || 0;
                    
                    return (
                      <tr key={leader.id || leader._id || index} className="hover:bg-theme-base/30 transition-colors">
                        
                        {/* Leader Name & Role */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary-600/10 flex items-center justify-center text-primary-600 font-bold border border-primary-600/20 text-xs shrink-0">
                              {leader.fullName?.charAt(0) || 'L'}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold truncate">{leader.fullName}</p>
                              <p className="text-[11px] text-theme-muted truncate">{leader.role || 'Cell Leader'}</p>
                            </div>
                          </div>
                        </td>

                        {/* Assigned Members Count */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 font-bold">
                            <Users size={14} className="text-theme-muted" />
                            <span>{leader.assignedMembersCount ?? 0} Members</span>
                          </div>
                        </td>

                        {/* Last Marked Date */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-theme-muted font-medium">
                            <Calendar size={14} />
                            <span>{leader.lastMarkedDate || 'Never'}</span>
                          </div>
                        </td>

                        {/* Unmarked Warning Badge */}
                        <td className="px-6 py-4">
                          {unmarkedCount > 0 ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-rose-500/10 text-rose-500 border border-rose-500/20">
                              <ShieldAlert size={12} />
                              {unmarkedCount} Unmarked Service{unmarkedCount > 1 ? 's' : ''}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                              <CheckCircle size={12} />
                              Up To Date
                            </span>
                          )}
                        </td>

                        {/* Action Buttons */}
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {activeTab === 'pending' ? (
                              <>
                                <button 
                                  type="button"
                                  disabled={processingId === leader.id || isProcessing}
                                  onClick={() => handleAction(leader.id, 'approve')} 
                                  className="px-3 py-1.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-lg text-xs font-bold hover:bg-emerald-500 hover:text-white disabled:opacity-50 transition-all cursor-pointer flex items-center gap-1"
                                >
                                  {processingId === leader.id ? <Loader2 size={12} className="animate-spin" /> : "Approve Login"}
                                </button>
                                <button 
                                  type="button"
                                  disabled={processingId === leader.id || isProcessing}
                                  onClick={() => handleAction(leader.id, 'reject')} 
                                  className="px-3 py-1.5 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-lg text-xs font-bold hover:bg-rose-500 hover:text-white disabled:opacity-50 transition-all cursor-pointer"
                                >
                                  {processingId === leader.id ? <Loader2 size={12} className="animate-spin" /> : "Reject"}
                                </button>
                              </>
                            ) : (
                              <button 
                                type="button"
                                disabled={processingId === leader.id || isProcessing}
                                onClick={() => { setSelectedLeader(leader); setIsDeleteModalOpen(true); }}
                                className="px-3 py-1.5 bg-rose-500/5 text-rose-500 border border-rose-500/20 rounded-lg text-xs font-bold hover:bg-rose-600 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
                              >
                                {processingId === leader.id ? <Loader2 size={12} className="animate-spin" /> : <><Trash2 size={12} /> Revoke</>}
                              </button>
                            )}
                          </div>
                        </td>

                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
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