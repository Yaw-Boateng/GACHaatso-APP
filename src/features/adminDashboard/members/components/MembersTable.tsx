import React from "react";
import {
  Eye,
  Edit2,
  Crown,
  Trash2,
  Phone,
  MapPin,
  Briefcase,
  UserX,
  Plus,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { Member } from "../types";
import ProtectedImage from "../../../../components/common/ProtectedImage";

interface MembersTableProps {
  members?: Member[];
  onView: (member: Member) => void;
  onEdit: (member: Member) => void;
  onAssignLeader: (member: Member) => void;
  onDelete: (member: Member) => void;
}

export const MembersTable: React.FC<MembersTableProps> = ({
  members = [],
  onView,
  onEdit,
  onAssignLeader,
  onDelete,
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "—";
    }
  };

  return (
    <div className="hidden md:block overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs transition-all">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold text-[11px] tracking-wider uppercase">
              <th className="py-4 px-6">Member Details</th>
              <th className="py-4 px-5">Contact & Address</th>
              <th className="py-4 px-5">Demographics</th>
              <th className="py-4 px-5">Assigned Leader</th>
              <th className="py-4 px-5">Created At</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
            {!members || members.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="p-3 bg-slate-100 dark:bg-slate-800/60 rounded-full text-slate-400">
                      <UserX size={24} />
                    </div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      No members found
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Try adjusting your filters or search query.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              members.map((member) => {
                // Safely extract optional/fallback fields at row boundary
                const memberData = member as Record<string, any>;
                const avatar = member.imageUrl || memberData.avatarUrl;
                const createdAt = member.createdAt || memberData.joinedDate;
                const leader = member.leader || memberData.assignedLeader || memberData.leaderInfo;

                return (
                  <tr
                    key={member.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group relative"
                  >
                    {/* Member Details */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        {avatar ? (
                          <ProtectedImage
                            src={avatar}
                            alt={`${member.firstName} ${member.lastName}`}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-2xs shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center text-xs border border-indigo-500/20 shrink-0">
                            {member.firstName?.charAt(0)}
                            {member.lastName?.charAt(0)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 dark:text-slate-100 truncate text-sm">
                            {member.firstName} {member.lastName}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {member.email || "No email provided"}
                          </p>
                          {member.occupation && (
                            <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
                              <Briefcase size={12} className="text-slate-400" />
                              {member.occupation}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Contact & Address */}
                    <td className="py-4 px-5">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-800 dark:text-slate-200">
                          <Phone size={13} className="text-slate-400 shrink-0" />
                          <span>{member.phoneNumber || "—"}</span>
                        </div>
                        {member.emergencyNumber && (
                          <div
                            className="flex items-center gap-1.5 text-[11px] font-mono font-medium text-rose-600 dark:text-rose-400"
                            title="Emergency Contact"
                          >
                            <AlertCircle size={13} className="shrink-0" />
                            <span>{member.emergencyNumber}</span>
                          </div>
                        )}
                        <div
                          className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 truncate max-w-[180px]"
                          title={member.residenceAddress}
                        >
                          <MapPin size={13} className="text-slate-400 shrink-0" />
                          <span className="truncate">
                            {member.residenceAddress || "No address listed"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Demographics */}
                    <td className="py-4 px-5">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {member.gender && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-900/40">
                              {member.gender}
                            </span>
                          )}
                          {member.maritalStatus && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/40">
                              {member.maritalStatus}
                            </span>
                          )}
                          {member.age !== undefined && member.age !== null && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50">
                              {member.age} yrs
                            </span>
                          )}
                        </div>
                        {member.dateOfBirth && (
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                            DOB: {formatDate(member.dateOfBirth)}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Assigned Leader */}
                    <td className="py-4 px-5">
                      {leader ? (
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                            <Crown size={14} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                              {leader.firstName} {leader.lastName}
                            </p>
                            {leader.email && (
                              <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate max-w-[130px]">
                                {leader.email}
                              </p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onAssignLeader(member)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-all cursor-pointer shadow-2xs"
                        >
                          <Plus size={13} />
                          Assign Leader
                        </button>
                      )}
                    </td>

                    {/* Created At */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                        <Calendar size={13} className="text-slate-400 shrink-0" />
                        <span>{formatDate(createdAt)}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-1 p-1 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 rounded-xl shadow-2xs">
                        <button
                          type="button"
                          onClick={() => onView(member)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-white dark:hover:bg-slate-700 transition-all cursor-pointer"
                          title="View Details"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => onEdit(member)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-700 transition-all cursor-pointer"
                          title="Edit Member"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => onAssignLeader(member)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-400 hover:bg-white dark:hover:bg-slate-700 transition-all cursor-pointer"
                          title="Change Leader"
                        >
                          <Crown size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(member)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-white dark:hover:bg-slate-700 transition-all cursor-pointer"
                          title="Delete Member"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembersTable;