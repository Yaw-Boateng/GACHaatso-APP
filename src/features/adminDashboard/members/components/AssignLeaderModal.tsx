import React, { useState, useEffect } from 'react';
import { X, Crown, Loader2, UserCheck } from 'lucide-react';
import { Member } from '../types';
import { useApprovedLeaders } from '../../admin/hooks/useAdminQueries';
import { useAssignLeader } from '../../admin/hooks/useAdminMutations';

interface AssignLeaderModalProps {
  isOpen: boolean;
  member: Member | null;
  onClose: () => void;
  onSuccess?: () => void | Promise<void>;
}

export const AssignLeaderModal: React.FC<AssignLeaderModalProps> = ({
  isOpen,
  member,
  onClose,
  onSuccess,
}) => {
  const [selectedLeaderId, setSelectedLeaderId] = useState<string>('');

  // 1. Get approved leaders list
  const { data: approvedLeaders = [], isLoading: isLoadingLeaders } =
    useApprovedLeaders();

  // 2. Mutation hook to send request
  const assignLeaderMutation = useAssignLeader();

  // Pre-select current leader if member already has one assigned
  useEffect(() => {
    if (member && isOpen) {
      const currentLeader =
        member.leader ||
        (member as any)?.assignedLeader ||
        (member as any)?.leaderInfo;
      if (currentLeader?.id) {
        setSelectedLeaderId(currentLeader.id);
      } else {
        setSelectedLeaderId('');
      }
    }
  }, [member, isOpen]);

  if (!isOpen || !member) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLeaderId) return;

    try {
      await assignLeaderMutation.mutateAsync({
        memberId: member.id,
        leaderId: selectedLeaderId,
      });

      // Execute refetch callback to refresh the table data immediately
      if (onSuccess) {
        await onSuccess();
      }
      onClose();
    } catch (error) {
      console.error('Failed to assign leader:', error);
    }
  };

  const currentLeader =
    member.leader ||
    (member as any).assignedLeader ||
    (member as any).leaderInfo;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <Crown size={20} />
            <h3 className="font-bold text-slate-900 dark:text-white">
              Assign Leader
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Target Member Info */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Assigning leader for:
            </p>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {member.firstName} {member.lastName}
            </p>
            {currentLeader && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-medium">
                Current Leader: {currentLeader.firstName} {currentLeader.lastName}
              </p>
            )}
          </div>

          {/* Leaders Select Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Select Approved Leader
            </label>

            {isLoadingLeaders ? (
              <div className="flex items-center gap-2 p-3 text-sm text-slate-500">
                <Loader2 size={16} className="animate-spin text-indigo-600" />
                Loading approved leaders...
              </div>
            ) : approvedLeaders.length === 0 ? (
              <p className="text-xs text-rose-500 font-medium">
                No approved leaders found in system.
              </p>
            ) : (
              <select
                value={selectedLeaderId}
                onChange={(e) => setSelectedLeaderId(e.target.value)}
                required
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">-- Choose an approved leader --</option>
                {approvedLeaders.map((leader) => (
                  <option key={leader.id} value={leader.id}>
                    {leader.firstName} {leader.lastName} ({leader.email})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedLeaderId || assignLeaderMutation.isPending}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl disabled:opacity-50 transition-all cursor-pointer"
            >
              {assignLeaderMutation.isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <UserCheck size={16} /> Assign Leader
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};