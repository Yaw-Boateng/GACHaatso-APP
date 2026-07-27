import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Bell } from 'lucide-react';
import { notificationsApi } from '../../features/adminDashboard/admin/api/notificationsApi';

export const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ['notifications', 'unreadCount'],
    queryFn: notificationsApi.getUnreadCount,
    refetchInterval: 30000,
  });

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications', 'list'],
    queryFn: notificationsApi.getNotifications,
    enabled: isOpen,
  });

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 transition-all cursor-pointer"
        aria-label="Notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-neutral-900">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl py-3 z-50">
          <div className="px-4 pb-2 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Notifications</h4>
            <span className="text-[10px] font-semibold text-primary-600">{unreadCount} unread</span>
          </div>
          <div className="max-h-64 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800">
            {notifications.length === 0 ? (
              <p className="p-4 text-xs text-center text-neutral-400">No new notifications</p>
            ) : (
              notifications.map((n: { id: string | number; title: string; message: string }) => (
                <div key={n.id} className="p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{n.title}</p>
                  <p className="text-[11px] text-neutral-500 truncate">{n.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};