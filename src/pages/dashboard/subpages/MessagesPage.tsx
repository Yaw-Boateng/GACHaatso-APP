import React, { useEffect, useState } from 'react';
import api from '../../../api/api';
import { ChevronLeft, ChevronRight, Mail, Phone, MessageSquare, Eye, X, Calendar, Tag } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  messageType?: string;
  message: string;
  createdAt: string;
}

const MessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Single Item Inspection State
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await api.get('/messages');
      const messagesArray = response.data?.data?.content || response.data || [];
      setMessages(messagesArray);
      setError(null);
    } catch (err) {
      setError('Failed to fetch messages. Please check your connection or server status.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch or view a single message by ID
  const handleViewDetails = async (id: string) => {
    try {
      setDetailLoading(true);
      
      // Try finding it directly in our state array first to minimize API calls
      const localMessage = messages.find((m) => m.id === id);
      if (localMessage) {
        setSelectedMessage(localMessage);
      } else {
        // Fallback: Fetch directly from single endpoint /messages/{id} if not matching locally
        const response = await api.get(`/messages/${id}`);
        // Adjust response target payload if your backend wraps single data shapes: response.data.data
        const singleMsg = response.data?.data || response.data;
        setSelectedMessage(singleMsg);
      }
    } catch (err) {
      console.error('Error getting single message endpoint:', err);
    } finally {
      setDetailLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Pagination Mathematics
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = messages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(messages.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <span className="ml-3 text-sm font-medium text-theme-muted">Loading messages...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-theme-border pb-5">
        <div>
          <h1 className="text-xl font-bold text-theme-text tracking-tight">Contact Messages</h1>
          <p className="text-xs text-theme-muted mt-0.5">Manage and review incoming form requests</p>
        </div>
        <div className="text-xs font-medium px-2.5 py-1 bg-theme-surface border border-theme-border rounded-lg text-theme-text w-max">
          Total: {messages.length}
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-theme-border rounded-2xl bg-theme-surface">
          <MessageSquare className="mx-auto text-gray-300 mb-3" size={32} />
          <p className="text-sm text-theme-muted">No messages found in database.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Desktop Table View Layout */}
          <div className="hidden md:block overflow-hidden bg-theme-surface border border-theme-border rounded-xl shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-theme-base/40 border-b border-theme-border text-xs font-semibold uppercase tracking-wider text-theme-muted">
                  <th className="p-4 w-[20%]">Sender</th>
                  <th className="p-4 w-[20%]">Contact Details</th>
                  <th className="p-4 w-[15%]">Type</th>
                  <th className="p-4 w-[30%]">Message snippet</th>
                  <th className="p-4 w-[15%] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme-border text-sm text-theme-text">
                {currentItems.map((msg) => (
                  <tr key={msg.id} className="hover:bg-theme-base/20 transition-colors">
                    <td className="p-4 font-semibold align-middle">{msg.name}</td>
                    <td className="p-4 align-middle space-y-1">
                      {msg.email && (
                        <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400">
                          <Mail size={12} className="text-gray-400" />
                          <span className="truncate max-w-[180px]">{msg.email}</span>
                        </div>
                      )}
                      {msg.phone && (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                          <Phone size={12} className="text-gray-400" />
                          <span>{msg.phone}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4 align-middle">
                      <span className="inline-flex text-[11px] font-medium px-2 py-0.5 rounded bg-theme-base border border-theme-border text-theme-text capitalize">
                        {(msg.messageType || 'General').toLowerCase().replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4 align-middle">
                      <p className="line-clamp-1 text-xs text-theme-muted max-w-xs">
                        {msg.message}
                      </p>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <button
                        onClick={() => handleViewDetails(msg.id)}
                        className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-theme-border bg-theme-surface text-theme-text hover:bg-theme-base transition-colors cursor-pointer"
                      >
                        <Eye size={13} />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards Stack View */}
          <div className="grid gap-4 md:hidden">
            {currentItems.map((msg) => (
              <div key={msg.id} className="bg-theme-surface border border-theme-border p-4 rounded-xl space-y-3 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-theme-text">{msg.name}</h3>
                    <span className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded bg-theme-base border border-theme-border text-theme-text capitalize">
                      {(msg.messageType || 'General').toLowerCase().replace('_', ' ')}
                    </span>
                  </div>
                  <button
                    onClick={() => handleViewDetails(msg.id)}
                    className="p-1.5 rounded-lg border border-theme-border text-theme-muted hover:text-theme-text"
                  >
                    <Eye size={14} />
                  </button>
                </div>

                <div className="bg-theme-base/30 p-2 rounded-lg border border-theme-border/40 text-xs text-theme-muted line-clamp-2">
                  {msg.message}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Navigation Footer */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 text-xs font-medium text-theme-text">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-1.5 border border-theme-border rounded-lg bg-theme-surface hover:bg-theme-base disabled:opacity-50 transition-colors cursor-pointer"
              >
                <ChevronLeft size={14} />
                <span>Prev</span>
              </button>
              <span className="text-theme-muted">
                Page <span className="text-theme-text font-semibold">{currentPage}</span> of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-1.5 border border-theme-border rounded-lg bg-theme-surface hover:bg-theme-base disabled:opacity-50 transition-colors cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Backdrop Overlay when details view is active */}
      {selectedMessage && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setSelectedMessage(null)}
        />
      )}

      {/* Slide-out Panel Modal for Single Record View */}
      <div className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-theme-surface border-l border-theme-border z-50 shadow-2xl transform transition-transform duration-300 ease-in-out p-6 overflow-y-auto ${selectedMessage ? 'translate-x-0' : 'translate-x-full'}`}>
        {selectedMessage && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-theme-border pb-4">
              <h2 className="text-base font-bold text-theme-text">Message Inspection</h2>
              <button 
                onClick={() => setSelectedMessage(null)}
                className="p-1.5 text-gray-400 hover:text-theme-text hover:bg-theme-base rounded-lg transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-semibold text-theme-muted uppercase tracking-wide block mb-1">Sender Name</label>
                <p className="text-sm font-bold text-theme-text bg-theme-base/40 p-2.5 rounded-lg border border-theme-border/50">{selectedMessage.name}</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {selectedMessage.email && (
                  <div>
                    <label className="text-[11px] font-semibold text-theme-muted uppercase tracking-wide flex items-center gap-1 mb-1">
                      <Mail size={11} /> Email Address
                    </label>
                    <a href={`mailto:${selectedMessage.email}`} className="text-xs text-blue-600 dark:text-blue-400 font-medium block bg-theme-base/40 p-2.5 rounded-lg border border-theme-border/50 truncate hover:underline">
                      {selectedMessage.email}
                    </a>
                  </div>
                )}
                {selectedMessage.phone && (
                  <div>
                    <label className="text-[11px] font-semibold text-theme-muted uppercase tracking-wide flex items-center gap-1 mb-1">
                      <Phone size={11} /> Mobile Number
                    </label>
                    <a href={`tel:${selectedMessage.phone}`} className="text-xs text-emerald-600 dark:text-emerald-400 font-medium block bg-theme-base/40 p-2.5 rounded-lg border border-theme-border/50 hover:underline">
                      {selectedMessage.phone}
                    </a>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-theme-muted uppercase tracking-wide flex items-center gap-1 mb-1">
                    <Tag size={11} /> Inquiry Type
                  </label>
                  <span className="text-xs font-medium block bg-theme-base/40 p-2 py-2.5 rounded-lg border border-theme-border/50 text-theme-text capitalize">
                    {(selectedMessage.messageType || 'General').toLowerCase().replace('_', ' ')}
                  </span>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-theme-muted uppercase tracking-wide flex items-center gap-1 mb-1">
                    <Calendar size={11} /> Date Logged
                  </label>
                  <span className="text-xs text-theme-muted block bg-theme-base/40 p-2 py-2.5 rounded-lg border border-theme-border/50">
                    {new Date(selectedMessage.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <label className="text-[11px] font-semibold text-theme-muted uppercase tracking-wide block mb-1">Full Statement Body</label>
                <div className="bg-theme-base/60 p-4 rounded-xl border border-theme-border text-xs text-theme-text whitespace-pre-wrap leading-relaxed max-h-[250px] overflow-y-auto">
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-theme-border flex justify-end">
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-xs font-semibold px-4 py-2 bg-theme-base border border-theme-border text-theme-text rounded-lg hover:bg-theme-border/50 transition-colors cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;