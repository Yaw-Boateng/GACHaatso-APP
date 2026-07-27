import React, { useState, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Mail, Phone, MessageSquare, Eye } from 'lucide-react';
import { useGetMessages } from '../hooks/useMessages';
import { ContactMessage } from '../api/messages';
import { MessageDetailModal } from '../components/MessageDetailModal';

const ITEMS_PER_PAGE = 5;

const MessagesPage: React.FC = () => {
  const { data: messages = [], isLoading, isError, error } = useGetMessages();
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(messages.length / ITEMS_PER_PAGE)), [messages.length]);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return messages.slice(start, start + ITEMS_PER_PAGE);
  }, [messages, currentPage]);

  const handlePageChange = useCallback((pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  }, [totalPages]);

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
        <span className="ml-3 text-sm font-medium text-theme-muted">Loading messages...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl text-sm text-red-600 dark:text-red-400">
          {error.message || 'Failed to fetch messages. Please check network connection.'}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 relative">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-theme-border pb-5">
        <div>
          <h1 className="text-xl font-bold text-theme-text tracking-tight">Contact Messages</h1>
          <p className="text-xs text-theme-muted mt-0.5">Manage and review incoming form requests</p>
        </div>
        <div className="text-xs font-medium px-3 py-1.5 bg-theme-surface border border-theme-border rounded-lg text-theme-text w-max shadow-sm">
          Total Messages: <span className="font-bold">{messages.length}</span>
        </div>
      </div>

      {/* Table / Empty State */}
      {messages.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-theme-border rounded-2xl bg-theme-surface">
          <MessageSquare className="mx-auto text-theme-muted mb-3 opacity-50" size={36} />
          <p className="text-sm font-medium text-theme-text">No messages found</p>
          <p className="text-xs text-theme-muted mt-1">New user inquiries will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-hidden bg-theme-surface border border-theme-border rounded-xl shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-theme-base/40 border-b border-theme-border text-xs font-semibold uppercase tracking-wider text-theme-muted">
                  <th className="p-4 w-[20%]">Sender</th>
                  <th className="p-4 w-[25%]">Contact Details</th>
                  <th className="p-4 w-[15%]">Type</th>
                  <th className="p-4 w-[28%]">Message Snippet</th>
                  <th className="p-4 w-[12%] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme-border text-sm text-theme-text">
                {currentItems.map((msg) => (
                  <tr key={msg.id} className="hover:bg-theme-base/20 transition-colors">
                    <td className="p-4 font-semibold align-middle">{msg.name}</td>
                    <td className="p-4 align-middle space-y-1">
                      {msg.email && (
                        <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400">
                          <Mail size={12} className="text-theme-muted" />
                          <span className="truncate max-w-[180px]">{msg.email}</span>
                        </div>
                      )}
                      {msg.phone && (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                          <Phone size={12} className="text-theme-muted" />
                          <span>{msg.phone}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4 align-middle">
                      <span className="inline-flex text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-theme-base border border-theme-border text-theme-text capitalize">
                        {(msg.messageType || 'General').toLowerCase().replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4 align-middle">
                      <p className="line-clamp-1 text-xs text-theme-muted max-w-xs">{msg.message}</p>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <button
                        onClick={() => setSelectedMessage(msg)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-theme-border bg-theme-surface text-theme-text hover:bg-theme-base transition-colors"
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

          {/* Mobile Card List View */}
          <div className="grid gap-3 md:hidden">
            {currentItems.map((msg) => (
              <div key={msg.id} className="bg-theme-surface border border-theme-border p-4 rounded-xl space-y-3 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-theme-text">{msg.name}</h3>
                    <span className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-theme-base border border-theme-border text-theme-text capitalize">
                      {(msg.messageType || 'General').toLowerCase().replace('_', ' ')}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedMessage(msg)}
                    className="p-1.5 rounded-lg border border-theme-border text-theme-muted hover:text-theme-text"
                    aria-label="View message"
                  >
                    <Eye size={14} />
                  </button>
                </div>

                <p className="bg-theme-base/30 p-2.5 rounded-lg border border-theme-border/40 text-xs text-theme-muted line-clamp-2">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 text-xs font-medium text-theme-text">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-1.5 border border-theme-border rounded-lg bg-theme-surface hover:bg-theme-base disabled:opacity-50 transition-colors"
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
                className="flex items-center gap-1 px-3 py-1.5 border border-theme-border rounded-lg bg-theme-surface hover:bg-theme-base disabled:opacity-50 transition-colors"
              >
                <span>Next</span>
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Selected Message Modal */}
      <MessageDetailModal
        message={selectedMessage}
        onClose={() => setSelectedMessage(null)}
      />
    </div>
  );
};

export default MessagesPage;