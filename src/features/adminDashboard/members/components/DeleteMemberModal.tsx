import React from 'react';
import { Member } from '../types';

interface DeleteMemberModalProps {
  isOpen: boolean;
  member: Member | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const DeleteMemberModal: React.FC<DeleteMemberModalProps> = ({
  isOpen,
  member,
  onClose,
  onSuccess,
}) => {
  if (!isOpen || !member) return null;

  const handleDelete = () => {
    // Delete action API here
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl border border-slate-100 space-y-4">
        <h3 className="text-lg font-bold text-rose-600">Confirm Deletion</h3>
        <p className="text-sm text-slate-600">
          Are you sure you want to remove <strong>{member.firstName} {member.lastName}</strong>? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="px-4 py-2 border rounded text-sm text-slate-600">Cancel</button>
          <button onClick={handleDelete} className="px-4 py-2 bg-rose-600 text-white rounded text-sm font-medium">Delete</button>
        </div>
      </div>
    </div>
  );
};