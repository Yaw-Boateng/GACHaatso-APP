import React from "react";
import { XCircle } from "lucide-react";

interface NotificationsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsSidebar: React.FC<NotificationsSidebarProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-[rgb(var(--bg-secondary))] h-full shadow-lg p-6 border-l border-[rgb(var(--border-primary))] flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[rgb(var(--border-primary))]">
            <h3 className="font-bold text-sm">Notifications</h3>
            <button onClick={onClose} className="text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] cursor-pointer">
              <XCircle size={18} />
            </button>
          </div>
          <div className="p-3 rounded-xl bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-primary))]">
            <p className="text-xs font-bold">New Prayer Request</p>
            <p className="text-xs text-[rgb(var(--text-secondary))] mt-1">Sister Mary requested prayer support.</p>
          </div>
        </div>
        <button onClick={onClose} className="px-4 py-2 border border-[rgb(var(--border-primary))] rounded-lg text-xs font-semibold hover:bg-[rgb(var(--bg-tertiary))] transition-colors w-full">
          Close
        </button>
      </div>
    </div>
  );
};