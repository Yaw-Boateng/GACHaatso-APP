import React from 'react';

interface DeleteConfirmModalProps {
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ loading, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none animate-in fade-in zoom-in-95 duration-100 z-50">
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
            disabled={loading}
            onClick={onCancel}
            className="px-3 py-1.5 border border-theme-border text-theme-text rounded-lg font-semibold hover:bg-theme-base transition-colors cursor-pointer disabled:opacity-50"
          >
            Keep File
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors cursor-pointer select-none disabled:opacity-50 flex items-center gap-1"
          >
            {loading ? 'Purging...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};