import React, { useEffect, useState, useRef } from 'react';
import { 
  Calendar, 
  Plus, 
  Eye, 
  Pencil, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  AlertCircle 
} from 'lucide-react';

import { EventItem, EventFormData } from '../types/event';
import { eventApi } from '../api/eventApi';
import ProtectedImage from '../../../../components/common/ProtectedImage';
import { getFullImageUrl } from '../utils/eventUtils';
import { ModalBackdrop } from '../components/ModalBackdrop';
import { EventDetailModal } from '../components/EventDetailModal';
import { EventFormModal } from '../components/EventFormModal';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';




const EventsDashboard: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 10;

  // Modals & Target States
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    location: '',
    date: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch events
  const fetchEvents = async (page: number) => {
    try {
      setLoading(true);
      const responseData = await eventApi.getEvents(page, itemsPerPage);
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

  // Fetch event details
  const handleViewDetails = async (id: string) => {
    try {
      const data = await eventApi.getEventById(id);
      setSelectedEvent(data);
    } catch (err) {
      console.error('Error fetching event details, using fallback:', err);
      const localFallback = events.find(e => e.id === id);
      if (localFallback) setSelectedEvent(localFallback);
    }
  };

  // Open Form modal
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

  // Form submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError(null);

    try {
      const dataPayload = new FormData();
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

      if (editingEvent) {
        await eventApi.updateEvent(editingEvent.id, dataPayload);
      } else {
        await eventApi.createEvent(dataPayload);
      }

      setIsFormOpen(false);
      fetchEvents(currentPage);
    } catch (err) {
      console.error('Error executing form workflow:', err);
      setError('Failed to process event entry. Verify payload constraint parameters.');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Delete execution
  const executeDeleteWorkflow = async () => {
    if (!deleteTargetId) return;

    setDeleteLoading(true);
    setError(null);
    try {
      await eventApi.deleteEvent(deleteTargetId);
      if (selectedEvent?.id === deleteTargetId) setSelectedEvent(null);

      setDeleteTargetId(null);
      if (events.length === 1 && currentPage > 0) {
        setCurrentPage(prev => prev - 1);
      } else {
        fetchEvents(currentPage);
      }
    } catch (err) {
      console.error('Server rejected deletion logic:', err);
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
      
      {/* Header */}
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
          <button onClick={() => openFormModal(null)} className="text-xs text-blue-600 font-semibold mt-1 hover:underline cursor-pointer">
            Initialize dashboard tracking
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          
          {/* Desktop Table View */}
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

          {/* Mobile Grid */}
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

          {/* Pagination */}
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

      {/* Backdrop */}
      {(selectedEvent || isFormOpen || deleteTargetId) && (
        <ModalBackdrop 
          onClose={() => { 
            setSelectedEvent(null); 
            setIsFormOpen(false); 
            setDeleteTargetId(null); 
          }} 
        />
      )}

      {/* Modals */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onEdit={(event) => openFormModal(event)}
        />
      )}

      {isFormOpen && (
        <EventFormModal
          editingEvent={editingEvent}
          formData={formData}
          setFormData={setFormData}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          fileInputRef={fileInputRef}
          onSubmit={handleFormSubmit}
          onClose={() => setIsFormOpen(false)}
          submitLoading={submitLoading}
        />
      )}

      {deleteTargetId && (
        <DeleteConfirmModal
          loading={deleteLoading}
          onConfirm={executeDeleteWorkflow}
          onCancel={() => setDeleteTargetId(null)}
        />
      )}

    </div>
  );
};

export default EventsDashboard;