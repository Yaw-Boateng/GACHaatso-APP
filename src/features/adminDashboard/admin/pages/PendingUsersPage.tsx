// src/features/admin/pages/PendingUsersPage.tsx
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../api/adminApi';
import { CheckCircle, XCircle, Trash2, Clock } from 'lucide-react';

export const PendingUsersPage: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: pendingUsers = [], isLoading } = useQuery({
    queryKey: ['pendingUsers'],
    queryFn: adminApi.getPendingUsers,
  });

  const approveMutation = useMutation({
    mutationFn: adminApi.approveUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pendingUsers'] }),
  });

  const rejectMutation = useMutation({
    mutationFn: adminApi.rejectUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pendingUsers'] }),
  });

  if (isLoading) {
    return <div className="p-8 text-center text-sm font-medium">Loading pending user requests...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center border-b pb-4 dark:border-neutral-800">
        <div>
          <h1 className="text-xl font-bold text-neutral-900 dark:text-white">Pending Registrations</h1>
          <p className="text-xs text-neutral-500">Review and authorize accounts for leaders and members</p>
        </div>
        <span className="px-3 py-1 bg-amber-500/10 text-amber-600 rounded-full text-xs font-semibold">
          {pendingUsers.length} Pending
        </span>
      </div>

      {pendingUsers.length === 0 ? (
        <div className="p-12 text-center border border-dashed rounded-2xl dark:border-neutral-800">
          <Clock className="mx-auto text-neutral-400 mb-2" size={32} />
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">No pending user registrations</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-800/50 text-xs font-semibold text-neutral-500 uppercase">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {pendingUsers.map((u) => (
                <tr key={u.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                  <td className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">
                    {u.firstName} {u.lastName}
                  </td>
                  <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400">{u.email}</td>
                  <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400">{u.phoneNumber || 'N/A'}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => approveMutation.mutate(u.id)}
                      className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle size={14} /> Approve
                    </button>
                    <button
                      onClick={() => rejectMutation.mutate(u.id)}
                      className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <XCircle size={14} /> Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};