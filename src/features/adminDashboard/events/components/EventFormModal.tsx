import React from 'react';
import { X, Upload } from 'lucide-react';
import { EventFormData, EventItem } from '../types/event';

interface EventFormModalProps {
  editingEvent: EventItem | null;
  formData: EventFormData;
  setFormData: React.Dispatch<React.SetStateAction<EventFormData>>;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  submitLoading: boolean;
}

export const EventFormModal: React.FC<EventFormModalProps> = ({
  editingEvent,
  formData,
  setFormData,
  selectedFile,
  setSelectedFile,
  fileInputRef,
  onSubmit,
  onClose,
  submitLoading,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none animate-in fade-in zoom-in-95 duration-150 h-full">
      <div className="bg-theme-surface border border-theme-border w-full max-w-md rounded-2xl shadow-2xl p-6 pointer-events-auto max-h-[90vh] overflow-y-auto space-y-5">
        <div className="flex justify-between items-center border-b border-theme-border pb-3">
          <h2 className="text-sm font-bold text-theme-text uppercase tracking-wide">
            {editingEvent ? 'Modify Properties Profile' : 'Initialize Scheduled Activity'}
          </h2>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-theme-text hover:bg-theme-base rounded-lg transition-colors cursor-pointer">
            <X size={15} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-theme-text block mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-2 bg-theme-base/40 border border-theme-border rounded-lg text-theme-text focus:border-blue-500 focus:outline-hidden transition-colors"
              />
            </div>
            <div>
              <label className="font-semibold text-theme-text block mb-1">Location / Venue</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2.5 bg-theme-base/40 border border-theme-border rounded-lg text-theme-text focus:border-blue-500 focus:outline-hidden transition-colors resize-none"
              placeholder="Provide core breakdown scheduling context text..."
            />
          </div>

          <div>
            <label className="font-semibold text-theme-text block mb-1">Banner Image Attachment (Optional)</label>
            <div className="mt-1 flex items-center justify-center border border-dashed border-theme-border rounded-xl p-4 bg-theme-base/20 hover:bg-theme-base/40 transition-colors relative">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
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
            <button type="button" onClick={onClose} className="px-3 py-2 border border-theme-border text-theme-text rounded-lg font-semibold hover:bg-theme-base transition-colors cursor-pointer">Cancel</button>
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
  );
};