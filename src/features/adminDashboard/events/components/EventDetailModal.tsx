import React from 'react';
import { Calendar, Clock, MapPin, FileText, X } from 'lucide-react';
import ProtectedImage from '../../../../components/common/ProtectedImage';
import { getFullImageUrl } from '../utils/eventUtils';
import { EventItem } from '../types/event';

interface EventDetailModalProps {
  event: EventItem;
  onClose: () => void;
  onEdit: (event: EventItem) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose, onEdit }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
      <div className="bg-theme-surface border border-theme-border w-full max-w-md rounded-2xl shadow-2xl p-6 pointer-events-auto max-h-[90vh] overflow-y-auto space-y-5">
        <div className="flex justify-between items-center border-b border-theme-border pb-3">
          <h2 className="text-sm font-bold text-theme-text uppercase tracking-wide flex items-center gap-1.5">
            <Calendar size={14} className="text-blue-600" />
            <span>Event Presentation Sheet</span>
          </h2>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-theme-text hover:bg-theme-base rounded-lg transition-colors cursor-pointer">
            <X size={15} />
          </button>
        </div>

        {event.imageUrl && (
          <div className="relative rounded-xl overflow-hidden border border-theme-border/60 bg-theme-base aspect-video">
            <ProtectedImage src={getFullImageUrl(event.imageUrl)} alt={event.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="space-y-4 text-xs">
          <div>
            <span className="text-theme-muted font-semibold block mb-1">Event Target Title</span>
            <p className="text-sm font-bold text-theme-text bg-theme-base/30 p-2.5 rounded-lg border border-theme-border/40">{event.title}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-theme-muted font-semibold flex items-center gap-1 mb-1"><Clock size={11} /> Agenda Timeline</span>
              <span className="p-2 bg-theme-base/30 border border-theme-border/40 rounded-lg block font-medium">
                {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <div>
              <span className="text-theme-muted font-semibold flex items-center gap-1 mb-1"><MapPin size={11} /> Venue Location</span>
              <span className="p-2 bg-theme-base/30 border border-theme-border/40 rounded-lg block font-medium truncate">
                {event.location || 'On-site'}
              </span>
            </div>
          </div>
          <div>
            <span className="text-theme-muted font-semibold flex items-center gap-1 mb-1"><FileText size={11} /> Program Description Details</span>
            <div className="bg-theme-base/30 p-3 rounded-lg border border-theme-border/40 text-theme-text leading-relaxed whitespace-pre-wrap max-h-[140px] overflow-y-auto">
              {event.description || 'No descriptive context string array provided.'}
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-theme-border flex justify-end gap-2">
          <button onClick={() => { onClose(); onEdit(event); }} className="px-3 py-1.5 border border-theme-border rounded-lg text-xs font-semibold hover:bg-theme-base text-blue-600 transition-colors cursor-pointer">Modify</button>
          <button onClick={onClose} className="px-3 py-1.5 bg-theme-base text-theme-text border border-theme-border rounded-lg text-xs font-semibold hover:bg-theme-border/40 transition-colors cursor-pointer">Dismiss</button>
        </div>
      </div>
    </div>
  );
};