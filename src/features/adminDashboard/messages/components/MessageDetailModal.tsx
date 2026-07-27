import React, { useEffect } from 'react';
import { X, Mail, Phone, Calendar, Tag } from 'lucide-react';
import { ContactMessage } from '../api/messages';

interface MessageDetailModalProps {
  message: ContactMessage | null;
  onClose: () => void;
}

export const MessageDetailModal: React.FC<MessageDetailModalProps> = ({ message, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!message) return null;

  const formattedDate = message.createdAt
    ? new Date(message.createdAt).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'N/A';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="w-full max-w-xl bg-theme-surface border border-theme-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-theme-border bg-theme-base/30">
          <div>
            <h2 id="modal-title" className="text-lg font-bold text-theme-text">Message Details</h2>
            <p className="text-xs text-theme-muted">Sender: {message.name}</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg text-theme-muted hover:text-theme-text hover:bg-theme-base transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto text-sm text-theme-text">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-theme-border bg-theme-base/40 p-3.5 space-y-1">
              <span className="flex items-center gap-1.5 text-xs text-theme-muted font-medium">
                <Mail size={13} /> Email
              </span>
              <p className="font-semibold text-xs break-all">{message.email || 'Not provided'}</p>
            </div>
            
            <div className="rounded-xl border border-theme-border bg-theme-base/40 p-3.5 space-y-1">
              <span className="flex items-center gap-1.5 text-xs text-theme-muted font-medium">
                <Phone size={13} /> Phone
              </span>
              <p className="font-semibold text-xs">{message.phone || 'Not provided'}</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-theme-muted px-1">
            <span className="flex items-center gap-1">
              <Tag size={13} />
              Type: <strong className="text-theme-text capitalize">{message.messageType?.toLowerCase().replace('_', ' ') || 'General'}</strong>
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              {formattedDate}
            </span>
          </div>

          <div className="rounded-xl border border-theme-border bg-theme-base/40 p-4 space-y-2">
            <p className="text-xs font-semibold text-theme-muted uppercase tracking-wider">Message Content</p>
            <p className="whitespace-pre-wrap leading-relaxed text-theme-text">{message.message}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-theme-border bg-theme-base/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold border border-theme-border rounded-lg bg-theme-surface hover:bg-theme-base transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};