import React, { useEffect, useState, useRef } from 'react';
import api, { IMAGE_BASE_URL } from '../../../api/api';
import { 
  Calendar, 
  Plus, 
  Eye, 
  Pencil, 
  Trash2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin,
  Image as ImageIcon,
  Upload,
  FileText,
  AlertCircle 
} from 'lucide-react';
import { ProtectedImage } from '../../../api/ProtectedImage';

interface EventItem {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

const EventsDashboard: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Server Pagination State (0-indexed)
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 10; 

  // Modal Workspace Management States
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  // Minimalistic Custom Delete Confirmation State
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  // Form State parameters
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper utility to attach the domain origin mapping prefix onto assets 
  // Helper utility to attach the domain origin mapping prefix onto assets 
const getFullImageUrl = (url?: string) => {
  if (!url) return '';
  
  // Clean up any stray whitespaces from the backend response string
  const cleanUrl = url.trim();
  
  // If it's already an absolute URL, return it as-is
  if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
    return cleanUrl;
  }
  
  // Return the relative block cleanly. 
  // If your server serves uploads outside of /api/v1, we use an absolute fallback paths sequence.
  return cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`;
};

  // Fetch paginated events -> GET /api/v1/event
  const fetchEvents = async (page: number) => {
    try {
      setLoading(true);
      const response = await api.get('/event', {
        params: { page, size: itemsPerPage }
      });
      
      const responseData = response.data?.data;
      if (responseData) {
        setEvents(responseData.content || []);
        setTotalPages(responseData.totalPages || 1);
      }
      setError(null);
    } catch (err) {
      setError('Failed to refresh event log. Please check your network connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage]);

  // View specific event detail metadata -> GET /api/v1/event/{eventId}
  const handleViewDetails = async (id: string) => {
    try {
      const response = await api.get(`/event/${id}`);
      setSelectedEvent(response.data?.data || response.data);
    } catch (err) {
      console.error('Error fetching event details, using local fallback state:', err);
      const localFallback = events.find(e => e.id === id);
      if (localFallback) setSelectedEvent(localFallback);
    }
  };

  // Pre-populate input values for editing or fresh generation
  const openFormModal = (event: EventItem | null = null) => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title || '',
        description: event.description || '',
        location: event.location || '',
        date: event.date ? event.date.substring(0, 16) : ''
      });
    } else {
      setEditingEvent(null);
      setFormData({ title: '', description: '', location: '', date: '' });
    }
    setIsFormOpen(true);
  };

  // Process Form actions via multipart formData boundaries
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError(null);

    try {
      const dataPayload = new FormData();
      
      // Structural details mapping string metadata block
      const eventJsonBlob = JSON.stringify({
        title: formData.title,
        description: formData.description,
        location: formData.location,
        date: new Date(formData.date).toISOString()
      });
      
      dataPayload.append('event', eventJsonBlob);
      if (selectedFile) {
        dataPayload.append('file', selectedFile);
      }

      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };

      if (editingEvent) {
        // PATCH /api/v1/event/update-event/{eventId}
        await api.patch(`/event/update-event/${editingEvent.id}`, dataPayload, config);
      } else {
        // POST /api/v1/event/create-event
        await api.post('/event/create-event', dataPayload, config);
      }

      setIsFormOpen(false);
      fetchEvents(currentPage);
    } catch (err) {
      console.error('Error handling event registration workflow execution:', err);
      setError('Failed to process event entry. Verify payload constraint parameters.');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Confirmed execution loop triggered from UI custom prompt matching structural layout
  const executeDeleteWorkflow = async () => {
    if (!deleteTargetId) return;
    
    setDeleteLoading(true);
    setError(null);
    try {
      await api.delete(`/event/delete-event/${deleteTargetId}`);
      if (selectedEvent?.id === deleteTargetId) setSelectedEvent(null);
      
      setDeleteTargetId(null);
      if (events.length === 1 && currentPage > 0) {
        setCurrentPage(prev => prev - 1);
      } else {
        fetchEvents(currentPage);
      }
    } catch (err) {
      console.error('Server context rejected execution deletion logic:', err);
      setError('Could not remove requested item reference identity structure.');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <span className="ml-3 text-xs font-medium text-theme-muted">Synchronizing data stream...</span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 relative">
      
      {/* Header Segment */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-theme-border pb-5">
        <div>
          <h1 className="text-xl font-bold text-theme-text tracking-tight">System Events</h1>
          <p className="text-xs text-theme-muted mt-0.5">Publish, optimize, and record corporate operational activities</p>
        </div>
        <button
          onClick={() => openFormModal(null)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all cursor-pointer select-none"
        >
          <Plus size={14} />
          <span>New Event</span>
        </button>
      </div>

      {error && (
        <div className="p-3.5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}

      {events.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-theme-border rounded-2xl bg-theme-surface">
          <Calendar className="mx-auto text-gray-300 mb-3" size={32} />
          <p className="text-sm text-theme-muted font-medium">No schedule entities found.</p>
          <button onClick={() => openFormModal(null)} className="text-xs text-blue-600 font-semibold mt-1 hover:underline cursor-pointer">Initialize dashboard tracking</button>
        </div>
      ) : (
        <div className="space-y-4">
          
          {/* Desktop Table View Presentation Layer */}
          <div className="hidden md:block overflow-hidden bg-theme-surface border border-theme-border rounded-xl shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-theme-base/40 border-b border-theme-border text-xs font-semibold uppercase tracking-wider text-theme-muted">
                  <th className="p-4 w-[35%]">Event Context</th>
                  <th className="p-4 w-[20%]">Location Venue</th>
                  <th className="p-4 w-[20%]">Target Timeline Date</th>
                  <th className="p-4 w-[25%] text-right">Actions Workflow Matrix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme-border text-sm text-theme-text">
                {events.map((evt) => (
                  <tr key={evt.id} className="hover:bg-theme-base/10 transition-colors">
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-3">
                        {evt.imageUrl ? (
                          <ProtectedImage 
                            src={getFullImageUrl(evt.imageUrl)} 
                            className="w-9 h-9 object-cover rounded-lg bg-theme-base shrink-0 border border-theme-border/40" 
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-lg bg-theme-base flex items-center justify-center shrink-0 border border-theme-border/40 text-theme-muted">
                            <Calendar size={14} />
                          </div>
                        )}
                        <div className="truncate max-w-[240px]">
                          <div className="font-semibold text-theme-text truncate">{evt.title}</div>
                          <div className="text-xs text-theme-muted line-clamp-1 mt-0.5">{evt.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle text-xs text-theme-muted">
                      <div className="flex items-center gap-1.5 max-w-[180px] truncate">
                        <MapPin size={12} className="text-gray-400 shrink-0" />
                        <span>{evt.location || 'Unspecified Location'}</span>
                      </div>
                    </td>
                    <td className="p-4 align-middle text-xs text-theme-muted font-medium">
                      {new Date(evt.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="p-4 align-middle text-right space-x-1.5">
                      <button onClick={() => handleViewDetails(evt.id)} className="p-1.5 border border-theme-border rounded-lg bg-theme-surface text-theme-text hover:bg-theme-base transition-colors cursor-pointer" title="Inspect Properties">
                        <Eye size={13} />
                      </button>
                      <button onClick={() => openFormModal(evt)} className="p-1.5 border border-theme-border rounded-lg bg-theme-surface text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors cursor-pointer" title="Edit Properties">
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => setDeleteTargetId(evt.id)} className="p-1.5 border border-theme-border rounded-lg bg-theme-surface text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer" title="Purge Record">
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stack Cards Grid Layout */}
          <div className="grid gap-3 md:hidden">
            {events.map((evt) => (
              <div key={evt.id} className="bg-theme-surface border border-theme-border p-4 rounded-xl space-y-3 shadow-xs">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {evt.imageUrl && (
                      <ProtectedImage 
                        src={getFullImageUrl(evt.imageUrl)} 
                        className="w-8 h-8 object-cover rounded-lg bg-theme-base shrink-0" 
                      />
                    )}
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm text-theme-text leading-tight truncate">{evt.title}</h3>
                      <p className="text-xs text-theme-muted line-clamp-1 mt-0.5">{evt.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => handleViewDetails(evt.id)} className="p-1.5 text-theme-muted border border-theme-border rounded-lg bg-theme-base/30"><Eye size={12} /></button>
                    <button onClick={() => openFormModal(evt)} className="p-1.5 text-blue-600 border border-theme-border rounded-lg bg-theme-base/30"><Pencil size={12} /></button>
                    <button onClick={() => setDeleteTargetId(evt.id)} className="p-1.5 text-red-600 border border-theme-border rounded-lg bg-theme-base/30"><Trash2 size={12} /></button>
                  </div>
                </div>
                <div className="text-[11px] text-theme-muted space-y-1 pt-2 border-t border-theme-border/40">
                  <div className="flex items-center gap-1.5"><Clock size={11} /> <span>{new Date(evt.date).toLocaleDateString()}</span></div>
                  <div className="flex items-center gap-1.5"><MapPin size={11} className="shrink-0" /> <span className="truncate">{evt.location}</span></div>
                </div>
              </div>
            ))}
          </div>

          {/* Unified Connected Server Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-3 text-xs font-medium text-theme-text select-none">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                disabled={currentPage === 0}
                className="flex items-center gap-1 px-2.5 py-1.5 border border-theme-border rounded-lg bg-theme-surface hover:bg-theme-base disabled:opacity-40 transition-colors cursor-pointer"
              >
                <ChevronLeft size={14} /> <span>Prev</span>
              </button>
              <span className="text-theme-muted">Page <strong>{currentPage + 1}</strong> of {totalPages}</span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                disabled={currentPage === totalPages - 1}
                className="flex items-center gap-1 px-2.5 py-1.5 border border-theme-border rounded-lg bg-theme-surface hover:bg-theme-base disabled:opacity-40 transition-colors cursor-pointer"
              >
                <span>Next</span> <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Centered Modal Backdrop Shader Overlay */}
      {(selectedEvent || isFormOpen || deleteTargetId) && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200" 
          onClick={() => { setSelectedEvent(null); setIsFormOpen(false); setDeleteTargetId(null); }} 
        />
      )}

      {/* INSPECTION METADATA DETAIL MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center z-51 p-4 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
          <div className="bg-theme-surface border border-theme-border w-full max-w-md rounded-2xl shadow-2xl p-6 pointer-events-auto max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex justify-between items-center border-b border-theme-border pb-3">
              <h2 className="text-sm font-bold text-theme-text uppercase tracking-wide flex items-center gap-1.5">
                <Calendar size={14} className="text-blue-600" />
                <span>Event Presentation Sheet</span>
              </h2>
              <button onClick={() => setSelectedEvent(null)} className="p-1.5 text-gray-400 hover:text-theme-text hover:bg-theme-base rounded-lg transition-colors cursor-pointer">
                <X size={15} />
              </button>
            </div>
            
            {selectedEvent.imageUrl && (
              <div className="relative rounded-xl overflow-hidden border border-theme-border/60 bg-theme-base aspect-video">
                <ProtectedImage src={getFullImageUrl(selectedEvent.imageUrl)} alt={selectedEvent.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-theme-muted font-semibold block mb-1">Event Target Title</span>
                <p className="text-sm font-bold text-theme-text bg-theme-base/30 p-2.5 rounded-lg border border-theme-border/40">{selectedEvent.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-theme-muted font-semibold flex items-center gap-1 mb-1"><Clock size={11} /> Agenda Timeline</span>
                  <span className="p-2 bg-theme-base/30 border border-theme-border/40 rounded-lg block font-medium">
                    {new Date(selectedEvent.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div>
                  <span className="text-theme-muted font-semibold flex items-center gap-1 mb-1"><MapPin size={11} /> Venue Location</span>
                  <span className="p-2 bg-theme-base/30 border border-theme-border/40 rounded-lg block font-medium truncate">
                    {selectedEvent.location || 'On-site'}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-theme-muted font-semibold flex items-center gap-1 mb-1"><FileText size={11} /> Program Description Details</span>
                <div className="bg-theme-base/30 p-3 rounded-lg border border-theme-border/40 text-theme-text leading-relaxed whitespace-pre-wrap max-h-[140px] overflow-y-auto">
                  {selectedEvent.description || 'No descriptive context string array provided.'}
                </div>
              </div>
            </div>
            
            <div className="pt-3 border-t border-theme-border flex justify-end gap-2">
              <button onClick={() => { const trg = selectedEvent; setSelectedEvent(null); openFormModal(trg); }} className="px-3 py-1.5 border border-theme-border rounded-lg text-xs font-semibold hover:bg-theme-base text-blue-600 transition-colors cursor-pointer">Modify</button>
              <button onClick={() => setSelectedEvent(null)} className="px-3 py-1.5 bg-theme-base text-theme-text border border-theme-border rounded-lg text-xs font-semibold hover:bg-theme-border/40 transition-colors cursor-pointer">Dismiss</button>
            </div>
          </div>
        </div>
      )}

      {/* FORM WORKSPACE INTERACTION MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-51 p-4 pointer-events-none animate-in fade-in zoom-in-95 duration-150 h-full">
          <div className="bg-theme-surface border border-theme-border w-full max-w-md rounded-2xl shadow-2xl p-6 pointer-events-auto max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex justify-between items-center border-b border-theme-border pb-3">
              <h2 className="text-sm font-bold text-theme-text uppercase tracking-wide">
                {editingEvent ? 'Modify Properties Profile' : 'Initialize Scheduled Activity'}
              </h2>
              <button onClick={() => setIsFormOpen(false)} className="p-1.5 text-gray-400 hover:text-theme-text hover:bg-theme-base rounded-lg transition-colors cursor-pointer">
                <X size={15} />
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-theme-text block mb-1">Title</label>
                <input 
                  type="text" 
                  required 
                  value={formData.title} 
                  onChange={e => setFormData({ ...formData, title: e.target.value })} 
                  className="w-full p-2.5 bg-theme-base/40 border border-theme-border rounded-lg text-theme-text focus:border-blue-500 focus:outline-hidden transition-colors" 
                  placeholder="Provide explicit headline title marker..." 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-theme-text block mb-1">Target Timeline Date</label>
                  <input 
                    type="datetime-local" 
                    required 
                    value={formData.date} 
                    onChange={e => setFormData({ ...formData, date: e.target.value })} 
                    className="w-full p-2 bg-theme-base/40 border border-theme-border rounded-lg text-theme-text focus:border-blue-500 focus:outline-hidden transition-colors" 
                  />
                </div>
                <div>
                  <label className="font-semibold text-theme-text block mb-1">Location / Venue</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.location} 
                    onChange={e => setFormData({ ...formData, location: e.target.value })} 
                    className="w-full p-2.5 bg-theme-base/40 border border-theme-border rounded-lg text-theme-text focus:border-blue-500 focus:outline-hidden transition-colors" 
                    placeholder="e.g. Main Auditorium" 
                  />
                </div>
              </div>
              
              <div>
                <label className="font-semibold text-theme-text block mb-1">Description</label>
                <textarea 
                  rows={4} 
                  required 
                  value={formData.description} 
                  onChange={e => setFormData({ ...formData, description: e.target.value })} 
                  className="w-full p-2.5 bg-theme-base/40 border border-theme-border rounded-lg text-theme-text focus:border-blue-500 focus:outline-hidden transition-colors resize-none" 
                  placeholder="Provide core breakdown scheduling context text..." 
                />
              </div>

              {/* Graphic File Image Upload Section */}
              <div>
                <label className="font-semibold text-theme-text block mb-1">Banner Image Attachment (Optional)</label>
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
                      {selectedFile ? selectedFile.name : editingEvent?.imageUrl ? 'Replace current banner asset' : 'Click or drop cover photo asset'}
                    </p>
                    <p className="text-[10px] text-gray-400">JPEG, PNG up to 5MB dimensions</p>
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
                  {submitLoading ? 'Uploading...' : editingEvent ? 'Update' : 'Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MINIMALISTIC CUSTOM CONFIRMATION MODAL FOR DELETIONS */}
      {deleteTargetId && (
        <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none animate-in fade-in zoom-in-95 duration-100">
          <div className="bg-theme-surface border border-theme-border w-full max-w-xs rounded-xl shadow-2xl p-5 pointer-events-auto space-y-4">
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-theme-text">Delete scheduled entry?</h3>
              <p className="text-xs text-theme-muted leading-normal">
                This process handles destructive item resource mapping purges. This operation is permanent.
              </p>
            </div>
            <div className="flex justify-end gap-2 text-xs pt-1">
              <button 
                type="button" 
                disabled={deleteLoading}
                onClick={() => setDeleteTargetId(null)} 
                className="px-3 py-1.5 border border-theme-border text-theme-text rounded-lg font-semibold hover:bg-theme-base transition-colors cursor-pointer disabled:opacity-50"
              >
                Keep File
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

export default EventsDashboard;