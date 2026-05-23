import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  UserPlus, 
  Eye, 
  Pencil, 
  Trash2, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Heart, 
  User,
  AlertCircle,
  Upload,
  ChevronLeft,
  ChevronRight,
  FileText
} from 'lucide-react';
import api from '../../../api/api';
import { ProtectedImage } from '../../../api/ProtectedImage';

interface MemberSummary {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  email: string;
  occupation: string;
  imageUrl: string;
}

interface MemberDetail extends MemberSummary {
  dateOfBirth: string;
  age: number;
  maritalStatus: string;
  residenceAddress: string;
  emergencyNumber: string;
  createdAt: string;
  updatedAt: string;
}

const MembersPage = () => {
  // Core listing states
  const [members, setMembers] = useState<MemberSummary[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination Framework (0-indexed matching Spring Boot payload)
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const [totalElements, setTotalElements] = useState(0);

  // Flyout / Modal Detail Views
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [detailedMember, setDetailedMember] = useState<MemberDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Form Workspace States
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingMember, setEditingMember] = useState<MemberSummary | MemberDetail | null>(null);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  // Custom Delete Confirmation Modal State
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  // Form payload bound models
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'Male',
    phoneNumber: '',
    email: '',
    occupation: '',
    dateOfBirth: '',
    maritalStatus: 'Single',
    residenceAddress: '',
    emergencyNumber: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper utility to attach relative endpoint strings mapping cleanly
  const getFullImageUrl = (url?: string) => {
    if (!url) return '';
    const cleanUrl = url.trim();
    if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
      return cleanUrl;
    }
    return cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`;
  };

  // Sync core listing stream
  const fetchMembers = async () => {
  setLoading(true);
  setError(null);

  try {
    const response = await api.get('/members', {
      params: {
        page: currentPage,
        size: pageSize,
      },
    });

    const payload = response.data;

    if (payload?.success && payload?.data) {
      setMembers(payload.data.content || []);
      setTotalPages(payload.data.totalPages || 1);
      setTotalElements(payload.data.totalElements || 0);
    } else {
      setMembers(payload?.content || []);
      setTotalPages(payload?.totalPages || 1);
      setTotalElements(payload?.totalElements || 0);
    }
  } catch (err: any) {
    setError(
      err.response?.data?.message ||
      err.message ||
      'Failed to fetch members.'
    );
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchMembers();
  }, [currentPage]);

  // Sync isolated profile detail structural records
  useEffect(() => {
    const fetchMemberDetail = async () => {
      if (!selectedMemberId) return;
      setDetailLoading(true);
      try {
        const response = await api.get(`/members/${selectedMemberId}`);
        if (response.data?.success) {
          setDetailedMember(response.data.data);
        } else if (response.data) {
          setDetailedMember(response.data.data || response.data);
        }
      } catch (err: any) {
        console.error("Error shifting single profile context: ", err);
        const localFallback = members.find(m => m.id === selectedMemberId);
        if (localFallback) setDetailedMember(localFallback as MemberDetail);
      } finally {
        setDetailLoading(false);
      }
    };

    fetchMemberDetail();
  }, [selectedMemberId]);

  // Pre-populate input configurations for creation / editing modal window context
  const openFormModal = async (member: MemberSummary | MemberDetail | null = null) => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setError(null);

    if (member) {
      setEditingMember(member);
      let baseDetail = member as MemberDetail;
      
      // If we don't have detailed parameters like dateOfBirth locally, try fetching them
      if (!baseDetail.dateOfBirth) {
        try {
          const res = await api.get(`/members/${member.id}`);
          if (res.data?.data) baseDetail = res.data.data;
        } catch (e) {
          console.error("Error filling full profile fields details fallback context:", e);
        }
      }

      setFormData({
        firstName: baseDetail.firstName || '',
        lastName: baseDetail.lastName || '',
        gender: baseDetail.gender || 'Male',
        phoneNumber: baseDetail.phoneNumber || '',
        email: baseDetail.email || '',
        occupation: baseDetail.occupation || '',
        dateOfBirth: baseDetail.dateOfBirth ? baseDetail.dateOfBirth.substring(0, 10) : '',
        maritalStatus: baseDetail.maritalStatus || 'Single',
        residenceAddress: baseDetail.residenceAddress || '',
        emergencyNumber: baseDetail.emergencyNumber || ''
      });
    } else {
      setEditingMember(null);
      setFormData({
        firstName: '',
        lastName: '',
        gender: 'Male',
        phoneNumber: '',
        email: '',
        occupation: '',
        dateOfBirth: '',
        maritalStatus: 'Single',
        residenceAddress: '',
        emergencyNumber: ''
      });
    }
    setIsFormOpen(true);
  };

  // Process Form submissions via multipart/form-data boundaries
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError(null);

    try {
      const dataPayload = new FormData();
      
      // Stringified parameters payload tracking json properties setup structure
     const memberJsonBlob = new Blob(
  [JSON.stringify({
    firstName: formData.firstName,
    lastName: formData.lastName,
    gender: formData.gender,
    phoneNumber: formData.phoneNumber,
    email: formData.email,
    occupation: formData.occupation,
    dateOfBirth: formData.dateOfBirth,
    maritalStatus: formData.maritalStatus,
    residenceAddress: formData.residenceAddress,
    emergencyNumber: formData.emergencyNumber
  })],
  { type: 'application/json' } // Forces the multi-part chunk to register as JSON
);
      
      // Mirror the dynamic 'member' property key block along with attached file block
      dataPayload.append('member', memberJsonBlob);
      if (selectedFile) {
        dataPayload.append('file', selectedFile);
      }

      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };

      if (editingMember) {
        // PATCH /api/v1/members/update-member/{id}
        await api.patch(`/members/update-member/${editingMember.id}`, dataPayload, config);
      } else {
        // POST /api/v1/members/create-member
        await api.post('/members/create-member', dataPayload, config);
      }

      setIsFormOpen(false);
      fetchMembers();
    } catch (err: any) {
      console.error('Error executing database transformation lifecycle workflow:', err);
      setError(err.response?.data?.message || 'Failed to submit profile payload structure mapping constraints.');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Execution flow triggered from Custom Deletion Confirmation Prompt UI
  const executeDeleteWorkflow = async () => {
    if (!deleteTargetId) return;
    
    setDeleteLoading(true);
    setError(null);
    try {
      const response = await api.delete(`/members/delete-member/${deleteTargetId}`);
      if (response.data?.success || response.status === 200) {
        if (selectedMemberId === deleteTargetId) {
          setSelectedMemberId(null);
          setDetailedMember(null);
        }
        setDeleteTargetId(null);
        
        if (members.length === 1 && currentPage > 0) {
          setCurrentPage(prev => prev - 1);
        } else {
          fetchMembers();
        }
      }
    } catch (err: any) {
      console.error('Server context rejected record removal execution request mapping:', err);
      setError(err.response?.data?.message || 'Could not completely clear matching item baseline reference structure.');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Safe client-side multi-layer indexing filter
  const filteredMembers = members.filter((m) => {
    const fullName = `${m.firstName || ''} ${m.lastName || ''}`.toLowerCase();
    const query = searchTerm.toLowerCase();
    return (
      fullName.includes(query) ||
      (m.email || '').toLowerCase().includes(query) ||
      (m.phoneNumber || '').includes(query) ||
      (m.occupation || '').toLowerCase().includes(query)
    );
  });

  if (loading && members.length === 0) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <span className="ml-3 text-xs font-medium text-theme-muted">Synchronizing member database directory...</span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 relative">
      
      {/* Header Section Matrix */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-theme-border pb-5">
        <div>
          <h1 className="text-xl font-bold text-theme-text tracking-tight">Members Directory</h1>
          <p className="text-xs text-theme-muted mt-0.5">Manage, review, and organize company staffing and membership database rosters</p>
        </div>
        <button
          onClick={() => openFormModal(null)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all cursor-pointer select-none"
        >
          <UserPlus size={14} />
          <span>Add New Member</span>
        </button>
      </div>

      {/* Filter and Search Bar Utilities */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-theme-surface p-3 border border-theme-border rounded-xl">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
          <input 
            type="text"
            placeholder="Search matching names, emails, contacts, or positions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-theme-base/40 border border-theme-border rounded-lg text-theme-text placeholder-gray-400 focus:outline-hidden focus:border-blue-500 transition-colors"
          />
        </div>
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="text-xs text-theme-muted hover:text-theme-text flex items-center gap-1 cursor-pointer"
          >
            <X size={12} /> Clear Filter
          </button>
        )}
      </div>

      {error && (
        <div className="p-3.5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}

      {filteredMembers.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-theme-border rounded-2xl bg-theme-surface">
          <User className="mx-auto text-gray-300 mb-3" size={32} />
          <p className="text-sm text-theme-muted font-medium">No system member records matching criteria found.</p>
          <button onClick={() => openFormModal(null)} className="text-xs text-blue-600 font-semibold mt-1 hover:underline cursor-pointer">Register standard identity payload</button>
        </div>
      ) : (
        <div className="space-y-4">
          
          {/* Desktop Matrix Layout Table */}
          <div className="hidden md:block overflow-hidden bg-theme-surface border border-theme-border rounded-xl shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-theme-base/40 border-b border-theme-border text-xs font-semibold uppercase tracking-wider text-theme-muted">
                  <th className="p-4 w-[35%]">Member Profile Identity</th>
                  <th className="p-4 w-[25%]">Contact Connection</th>
                  <th className="p-4 w-[20%]">Professional Placement</th>
                  <th className="p-4 w-[20%] text-right">Actions Management Node</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme-border text-sm text-theme-text">
                {filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-theme-base/10 transition-colors">
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-3">
                        {m.imageUrl ? (
                          <ProtectedImage 
                            src={getFullImageUrl(m.imageUrl)} 
                            className="w-9 h-9 object-cover rounded-full bg-theme-base shrink-0 border border-theme-border/40" 
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-theme-base flex items-center justify-center shrink-0 border border-theme-border/40 text-theme-muted font-bold text-xs bg-blue-50 dark:bg-blue-950/30 text-blue-600">
                            {m.firstName ? m.firstName.charAt(0).toUpperCase() : <User size={14} />}
                          </div>
                        )}
                        <div className="truncate max-w-[240px]">
                          <div className="font-semibold text-theme-text truncate">{m.firstName} {m.lastName}</div>
                          <div className="text-xs text-theme-muted mt-0.5 capitalize">{m.gender || 'Unspecified'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle text-xs text-theme-muted space-y-0.5">
                      <div className="flex items-center gap-1.5 truncate max-w-[220px]">
                        <Mail size={12} className="text-gray-400 shrink-0" />
                        <span>{m.email || 'No email registered'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone size={12} className="text-gray-400 shrink-0" />
                        <span>{m.phoneNumber || 'No number'}</span>
                      </div>
                    </td>
                    <td className="p-4 align-middle text-xs text-theme-muted">
                      <div className="flex items-center gap-1.5 max-w-[180px] truncate font-medium">
                        <Briefcase size={12} className="text-gray-400 shrink-0" />
                        <span>{m.occupation || 'Not Specified'}</span>
                      </div>
                    </td>
                    <td className="p-4 align-middle text-right space-x-1.5">
                      <button onClick={() => setSelectedMemberId(m.id)} className="p-1.5 border border-theme-border rounded-lg bg-theme-surface text-theme-text hover:bg-theme-base transition-colors cursor-pointer" title="Inspect Properties Profile">
                        <Eye size={13} />
                      </button>
                      <button onClick={() => openFormModal(m)} className="p-1.5 border border-theme-border rounded-lg bg-theme-surface text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors cursor-pointer" title="Edit Roster Parameters">
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => setDeleteTargetId(m.id)} className="p-1.5 border border-theme-border rounded-lg bg-theme-surface text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer" title="Purge Record Identity">
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Screen Responsive Cards Stack */}
          <div className="grid gap-3 md:hidden">
            {filteredMembers.map((m) => (
              <div key={m.id} className="bg-theme-surface border border-theme-border p-4 rounded-xl space-y-3 shadow-xs">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {m.imageUrl ? (
                      <ProtectedImage 
                        src={getFullImageUrl(m.imageUrl)} 
                        className="w-8 h-8 object-cover rounded-full bg-theme-base shrink-0" 
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 flex items-center justify-center shrink-0 font-bold text-xs">
                        {m.firstName?.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm text-theme-text leading-tight truncate">{m.firstName} {m.lastName}</h3>
                      <p className="text-xs text-theme-muted truncate mt-0.5">{m.occupation || 'No Position listed'}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => setSelectedMemberId(m.id)} className="p-1.5 text-theme-muted border border-theme-border rounded-lg bg-theme-base/30"><Eye size={12} /></button>
                    <button onClick={() => openFormModal(m)} className="p-1.5 text-blue-600 border border-theme-border rounded-lg bg-theme-base/30"><Pencil size={12} /></button>
                    <button onClick={() => setDeleteTargetId(m.id)} className="p-1.5 text-red-600 border border-theme-border rounded-lg bg-theme-base/30"><Trash2 size={12} /></button>
                  </div>
                </div>
                <div className="text-[11px] text-theme-muted space-y-1 pt-2 border-t border-theme-border/40">
                  <div className="flex items-center gap-1.5"><Mail size={11} className="shrink-0" /> <span className="truncate">{m.email}</span></div>
                  <div className="flex items-center gap-1.5"><Phone size={11} /> <span>{m.phoneNumber}</span></div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-xs text-theme-muted">
  Showing page <strong>{currentPage + 1}</strong> of{' '}
  <strong>{totalPages}</strong> — Total Members:{' '}
  <strong>{totalElements}</strong>
</div>

          {/* Connected Framework Server Pagination */}
          {totalPages > 1 && (
  <div className="flex flex-wrap items-center justify-center gap-2 pt-5">

    {/* Previous */}
    <button
      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
      disabled={currentPage === 0}
      className="px-3 py-2 rounded-lg border border-theme-border bg-theme-surface disabled:opacity-40"
    >
      Prev
    </button>

    {/* Page Numbers */}
    {[...Array(totalPages)].map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentPage(index)}
        className={`px-3 py-2 rounded-lg border text-xs font-semibold transition-colors
          ${
            currentPage === index
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-theme-surface border-theme-border hover:bg-theme-base'
          }`}
      >
        {index + 1}
      </button>
    ))}

    {/* Next */}
    <button
      onClick={() =>
        setCurrentPage(prev =>
          Math.min(prev + 1, totalPages - 1)
        )
      }
      disabled={currentPage === totalPages - 1}
      className="px-3 py-2 rounded-lg border border-theme-border bg-theme-surface disabled:opacity-40"
    >
      Next
    </button>
  </div>
)}
        </div>
      )}

      {/* Global Shader Overlay Backdrop Element */}
      {(selectedMemberId || isFormOpen || deleteTargetId) && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200 z-1" 
          onClick={() => { setSelectedMemberId(null); setDetailedMember(null); setIsFormOpen(false); setDeleteTargetId(null); }} 
        />
      )}

      {/* PROFILE INSPECTION SHEET DETAIL MODAL */}
      {selectedMemberId && detailedMember && (
        <div className="fixed inset-0 flex items-center justify-center z-51 p-4 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
          <div className="bg-theme-surface border border-theme-border w-full max-w-md rounded-2xl shadow-2xl p-6 pointer-events-auto max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex justify-between items-center border-b border-theme-border pb-3">
              <h2 className="text-sm font-bold text-theme-text uppercase tracking-wide flex items-center gap-1.5">
                <User size={14} className="text-blue-600" />
                <span>Member Master Profile Profile</span>
              </h2>
              <button onClick={() => { setSelectedMemberId(null); setDetailedMember(null); }} className="p-1.5 text-gray-400 hover:text-theme-text hover:bg-theme-base rounded-lg transition-colors cursor-pointer">
                <X size={15} />
              </button>
            </div>
            
            {detailLoading ? (
              <div className="py-8 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                <span className="ml-2 text-xs text-theme-muted">Pulling profile metrics...</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 bg-theme-base/20 p-4 rounded-xl border border-theme-border/40">
                  {detailedMember.imageUrl ? (
                    <ProtectedImage src={getFullImageUrl(detailedMember.imageUrl)} alt={detailedMember.firstName} className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-md" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center text-xl font-bold shadow-inner">
                      {detailedMember.firstName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-bold text-theme-text">{detailedMember.firstName} {detailedMember.lastName}</h3>
                    <p className="text-xs text-theme-muted font-medium flex items-center gap-1 mt-0.5">
                      <Briefcase size={12} /> {detailedMember.occupation || 'Position Unspecified'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-theme-muted font-semibold block mb-0.5">Gender Baseline</span>
                      <p className="p-2 bg-theme-base/30 rounded-lg border border-theme-border/40 font-medium capitalize">{detailedMember.gender || 'Not specified'}</p>
                    </div>
                    <div>
                      <span className="text-theme-muted font-semibold block mb-0.5">Marital Status</span>
                      <p className="p-2 bg-theme-base/30 rounded-lg border border-theme-border/40 font-medium capitalize">{detailedMember.maritalStatus || 'Single'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-theme-muted font-semibold flex items-center gap-1 mb-0.5"><Calendar size={11} /> Birthday (Age)</span>
                      <p className="p-2 bg-theme-base/30 rounded-lg border border-theme-border/40 font-medium">
                        {detailedMember.dateOfBirth ? new Date(detailedMember.dateOfBirth).toLocaleDateString() : 'N/A'} {detailedMember.age ? `(${detailedMember.age} yrs)` : ''}
                      </p>
                    </div>
                    <div>
                      <span className="text-theme-muted font-semibold flex items-center gap-1 mb-0.5"><Phone size={11} /> Primary Telephone</span>
                      <p className="p-2 bg-theme-base/30 rounded-lg border border-theme-border/40 font-medium">{detailedMember.phoneNumber || 'N/A'}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-theme-muted font-semibold flex items-center gap-1 mb-0.5"><Mail size={11} /> Email Address Structure</span>
                    <p className="p-2 bg-theme-base/30 rounded-lg border border-theme-border/40 font-medium truncate">{detailedMember.email || 'N/A'}</p>
                  </div>

                  <div>
                    <span className="text-theme-muted font-semibold flex items-center gap-1 mb-0.5"><MapPin size={11} /> Residence Registration Address</span>
                    <p className="p-2 bg-theme-base/30 rounded-lg border border-theme-border/40 font-medium text-theme-text whitespace-pre-wrap">{detailedMember.residenceAddress || 'No documented habitat strings mapped.'}</p>
                  </div>

                  <div>
                    <span className="text-theme-muted font-semibold flex items-center gap-1 mb-0.5"><Heart size={11} className="text-red-500" /> Emergency Line Reference</span>
                    <p className="p-2 bg-theme-base/30 rounded-lg border border-theme-border/40 font-semibold text-theme-text">{detailedMember.emergencyNumber || 'No backup number configured.'}</p>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-theme-border flex justify-end gap-2">
                  <button onClick={() => { const target = detailedMember; setSelectedMemberId(null); openFormModal(target); }} className="px-3 py-1.5 border border-theme-border rounded-lg text-xs font-semibold hover:bg-theme-base text-blue-600 transition-colors cursor-pointer">Modify Roster</button>
                  <button onClick={() => { setSelectedMemberId(null); setDetailedMember(null); }} className="px-3 py-1.5 bg-theme-base text-theme-text border border-theme-border rounded-lg text-xs font-semibold hover:bg-theme-border/40 transition-colors cursor-pointer">Dismiss</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* FORM INTERACTION WORKSPACE MODAL WINDOW */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-51 p-4 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
          <div className="bg-theme-surface border border-theme-border w-full max-w-md rounded-2xl shadow-2xl p-6 pointer-events-auto max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex justify-between items-center border-b border-theme-border pb-3">
              <h2 className="text-sm font-bold text-theme-text uppercase tracking-wide">
                {editingMember ? 'Modify Member Parameters Profile' : 'Initialize Member Directory Node'}
              </h2>
              <button onClick={() => setIsFormOpen(false)} className="p-1.5 text-gray-400 hover:text-theme-text hover:bg-theme-base rounded-lg transition-colors cursor-pointer">
                <X size={15} />
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-theme-text block mb-1">First Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.firstName} 
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })} 
                    className="w-full p-2.5 bg-theme-base/40 border border-theme-border rounded-lg text-theme-text focus:border-blue-500 focus:outline-hidden transition-colors" 
                    placeholder="First Name" 
                  />
                </div>
                <div>
                  <label className="font-semibold text-theme-text block mb-1">Last Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.lastName} 
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })} 
                    className="w-full p-2.5 bg-theme-base/40 border border-theme-border rounded-lg text-theme-text focus:border-blue-500 focus:outline-hidden transition-colors" 
                    placeholder="Last Name" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-theme-text block mb-1">Gender Identification</label>
                  <select
                    value={formData.gender}
                    onChange={e => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full p-2.5 bg-theme-surface border border-theme-border rounded-lg text-theme-text focus:border-blue-500 focus:outline-hidden transition-colors"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-theme-text block mb-1">Marital Status</label>
                  <select
                    value={formData.maritalStatus}
                    onChange={e => setFormData({ ...formData, maritalStatus: e.target.value })}
                    className="w-full p-2.5 bg-theme-surface border border-theme-border rounded-lg text-theme-text focus:border-blue-500 focus:outline-hidden transition-colors"
                  >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-theme-text block mb-1">Date of Birth</label>
                  <input 
                    type="date" 
                    required
                    value={formData.dateOfBirth} 
                    onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })} 
                    className="w-full p-2.5 bg-theme-base/40 border border-theme-border rounded-lg text-theme-text focus:border-blue-500 focus:outline-hidden transition-colors" 
                  />
                </div>
                <div>
                  <label className="font-semibold text-theme-text block mb-1">Occupation Position</label>
                  <input 
                    type="text" 
                    required
                    value={formData.occupation} 
                    onChange={e => setFormData({ ...formData, occupation: e.target.value })} 
                    className="w-full p-2.5 bg-theme-base/40 border border-theme-border rounded-lg text-theme-text focus:border-blue-500 focus:outline-hidden transition-colors" 
                    placeholder="e.g. Software Engineer" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-theme-text block mb-1">Contact Telephone</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phoneNumber} 
                    onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })} 
                    className="w-full p-2.5 bg-theme-base/40 border border-theme-border rounded-lg text-theme-text focus:border-blue-500 focus:outline-hidden transition-colors" 
                    placeholder="Primary contact line" 
                  />
                </div>
                <div>
                  <label className="font-semibold text-theme-text block mb-1">Emergency Contact Back-Up</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.emergencyNumber} 
                    onChange={e => setFormData({ ...formData, emergencyNumber: e.target.value })} 
                    className="w-full p-2.5 bg-theme-base/40 border border-theme-border rounded-lg text-theme-text focus:border-blue-500 focus:outline-hidden transition-colors" 
                    placeholder="Emergency reference line" 
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-theme-text block mb-1">Email Electronic Route</label>
                <input 
                  type="email" 
                  required
                  value={formData.email} 
                  onChange={e => setFormData({ ...formData, email: e.target.value })} 
                  className="w-full p-2.5 bg-theme-base/40 border border-theme-border rounded-lg text-theme-text focus:border-blue-500 focus:outline-hidden transition-colors" 
                  placeholder="name@organization.com" 
                />
              </div>

              <div>
                <label className="font-semibold text-theme-text block mb-1">Residence Domestic Address</label>
                <textarea 
                  rows={2} 
                  required
                  value={formData.residenceAddress} 
                  onChange={e => setFormData({ ...formData, residenceAddress: e.target.value })} 
                  className="w-full p-2.5 bg-theme-base/40 border border-theme-border rounded-lg text-theme-text focus:border-blue-500 focus:outline-hidden transition-colors resize-none" 
                  placeholder="Input formal tracking residential lines location components..." 
                />
              </div>

              {/* Graphic Profile Photo Asset Attachment Layout Section */}
              <div>
                <label className="font-semibold text-theme-text block mb-1">Avatar Profile Photo (Optional)</label>
                <div className="mt-1 flex items-center justify-center border border-dashed border-theme-border rounded-xl p-4 bg-theme-base/20 hover:bg-theme-base/40 transition-colors relative">
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                  />
                  <div className="text-center space-y-1 text-theme-muted pointer-events-none">
                    <Upload size={16} className="mx-auto mb-1 text-gray-400" />
                    <p className="font-medium text-[11px]">
                      {selectedFile ? selectedFile.name : editingMember?.imageUrl ? 'Replace present avatar picture image' : 'Click or drop visual photo asset'}
                    </p>
                    <p className="text-[10px] text-gray-400">JPEG, PNG layout dimensions up to 5MB</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-3 border-t border-theme-border flex justify-end gap-2">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-3 py-2 border border-theme-border text-theme-text rounded-lg font-semibold hover:bg-theme-base transition-colors cursor-pointer">Cancel</button>
                <button 
                  type="submit" 
                  disabled={submitLoading} 
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-50 transition-colors cursor-pointer select-none"
                >
                  {submitLoading ? 'Syncing...' : editingMember ? 'Update Profile' : 'Register Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CUSTOM MINIMALISTIC DELETION WARNING PROMPT DIALOG MODAL */}
      {deleteTargetId && (
        <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none animate-in fade-in zoom-in-95 duration-100 z-51">
          <div className="bg-theme-surface border border-theme-border w-full max-w-xs rounded-xl shadow-2xl p-5 pointer-events-auto space-y-4">
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-theme-text">Purge member credentials?</h3>
              <p className="text-xs text-theme-muted leading-normal">
                This process targets destructive item database record purges. This system operation cannot be reversed.
              </p>
            </div>
            <div className="flex justify-end gap-2 text-xs pt-1">
              <button 
                type="button" 
                disabled={deleteLoading}
                onClick={() => setDeleteTargetId(null)} 
                className="px-3 py-1.5 border border-theme-border text-theme-text rounded-lg font-semibold hover:bg-theme-base transition-colors cursor-pointer disabled:opacity-50"
              >
                Retain Record
              </button>
              <button 
                type="button"
                disabled={deleteLoading}
                onClick={executeDeleteWorkflow}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors cursor-pointer select-none disabled:opacity-50 flex items-center gap-1"
              >
                {deleteLoading ? 'Purging...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MembersPage;