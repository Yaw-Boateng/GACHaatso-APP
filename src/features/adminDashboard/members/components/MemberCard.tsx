import React from 'react';
import { Member } from '../types';
import ProtectedImage from '../../../../components/common/ProtectedImage';

interface MemberCardProps {
  member: Member;
  onView: (member: Member) => void;
  onEdit: (member: Member) => void;
  onAssignLeader: (member: Member) => void;
  onDelete: (member: Member) => void;
}

export const MemberCard: React.FC<MemberCardProps> = ({
  member,
  onView,
  onEdit,
  onAssignLeader,
  onDelete,
}) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <ProtectedImage
            src={member.avatarUrl}
            alt={`${member.firstName} ${member.lastName}`}
            className="w-11 h-11 rounded-full object-cover border border-slate-200"
          />
          <div>
            <h4 className="font-semibold text-slate-900">{member.firstName} {member.lastName}</h4>
            <p className="text-xs text-slate-500">{member.email}</p>
          </div>
        </div>
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
          member.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
        }`}>
          {member.status}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-2">
        <span>Role: <strong className="text-slate-700">{member.role}</strong></span>
        <span>Dept: <strong className="text-slate-700">{member.department || 'N/A'}</strong></span>
      </div>

      <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100">
        <button onClick={() => onView(member)} className="px-3 py-1 text-xs bg-slate-100 text-slate-700 rounded hover:bg-slate-200">
          View
        </button>
        <button onClick={() => onEdit(member)} className="px-3 py-1 text-xs bg-indigo-50 text-indigo-700 rounded hover:bg-indigo-100">
          Edit
        </button>
        <button onClick={() => onAssignLeader(member)} className="px-3 py-1 text-xs bg-amber-50 text-amber-700 rounded hover:bg-amber-100">
          Role
        </button>
        <button onClick={() => onDelete(member)} className="px-3 py-1 text-xs bg-rose-50 text-rose-700 rounded hover:bg-rose-100">
          Delete
        </button>
      </div>
    </div>
  );
};