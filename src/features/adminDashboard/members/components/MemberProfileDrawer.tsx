import React, { useEffect } from 'react';
import { 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  AlertCircle, 
  Crown, 
  User, 
  Heart, 
  Building2, 
  Clock 
} from 'lucide-react';
import { Member } from '../types';
import ProtectedImage from '../../../../components/common/ProtectedImage';

interface MemberProfileDrawerProps {
  isOpen: boolean;
  member: Member | null;
  onClose: () => void;
}

export const MemberProfileDrawer: React.FC<MemberProfileDrawerProps> = ({
  isOpen,
  member,
  onClose,
}) => {
  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !member) return null;

  // Safe Property Mappings with Fallbacks
  const avatar = member.imageUrl || (member as any).avatarUrl;
  const phone = member.phoneNumber || (member as any).phone || '—';
  const emergencyPhone = member.emergencyNumber || (member as any).emergencyPhone;
  const address = member.residenceAddress || (member as any).address || 'Not Provided';
  const createdAt = member.createdAt || (member as any).joinedDate;
  const dob = member.dateOfBirth || (member as any).dob;

  // Helper date formatter
  const formatDate = (dateString?: string) => {
    if (!dateString) return '—';
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return '—';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-300">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
          
          {/* HEADER */}
          <div className="p-5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
            <div className="flex items-center gap-2">
              <User size={18} className="text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Member Profile</h3>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* BODY */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200">
            
            {/* HERO / AVATAR HEADER */}
            <div className="text-center space-y-3 pb-2 border-b border-slate-100 dark:border-slate-800">
              {avatar ? (
                <ProtectedImage
                  src={avatar}
                  alt={`${member.firstName} ${member.lastName}`}
                  className="w-24 h-24 rounded-full mx-auto border-4 border-white dark:border-slate-800 object-cover shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full mx-auto bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center text-2xl border-4 border-white dark:border-slate-800 shadow-md">
                  {member.firstName?.charAt(0)}{member.lastName?.charAt(0)}
                </div>
              )}

              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {member.firstName} {member.lastName}
                </h2>
                <div className="flex items-center justify-center gap-2 mt-1 flex-wrap">
                  {(member as any).role && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-900/40">
                      {(member as any).role}
                    </span>
                  )}
                  {(member as any).department && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {(member as any).department}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* CONTACT INFORMATION SECTION */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Contact Information
              </h4>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl space-y-3 border border-slate-100 dark:border-slate-800/80">
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-slate-400 mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Email Address</p>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {member.email || 'No email provided'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-slate-400 mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Primary Phone</p>
                    <p className="text-xs font-mono font-semibold text-slate-800 dark:text-slate-200">
                      {phone}
                    </p>
                  </div>
                </div>

                {emergencyPhone && (
                  <div className="flex items-start gap-3">
                    <AlertCircle size={16} className="text-rose-500 mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] text-rose-500 font-medium">Emergency Contact</p>
                      <p className="text-xs font-mono font-semibold text-rose-600 dark:text-rose-400">
                        {emergencyPhone}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Home Address</p>
                    <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                      {address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* DEMOGRAPHICS & PERSONAL DETAILS */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Demographics & Personal Details
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Gender</p>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {member.gender || '—'}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Marital Status</p>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {member.maritalStatus || '—'}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Age</p>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {member.age !== undefined && member.age !== null ? `${member.age} yrs` : '—'}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Date of Birth</p>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {formatDate(dob)}
                  </p>
                </div>
              </div>

              {member.occupation && (
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl flex items-center gap-3 border border-slate-100 dark:border-slate-800/80">
                  <Briefcase size={16} className="text-slate-400 shrink-0" />
                  <div>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Occupation / Work</p>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {member.occupation}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* ASSIGNED LEADER SECTION */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Assigned Leader
              </h4>

              {member.leader ? (
                <div className="bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 p-3.5 rounded-2xl flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                    <Crown size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                      {member.leader.firstName} {member.leader.lastName}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {member.leader.email}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 text-xs text-center border border-dashed border-slate-200 dark:border-slate-700">
                  No leader currently assigned to this member.
                </div>
              )}
            </div>

            {/* SYSTEM METADATA */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                System Record
              </h4>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl space-y-2 border border-slate-100 dark:border-slate-800/80 text-xs">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} /> Joined Date
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {formatDate(createdAt)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span>Member ID</span>
                  <span className="font-mono text-[11px] text-slate-600 dark:text-slate-300">
                    {member.id}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* FOOTER */}
          <div className="p-4 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-bold hover:bg-slate-800 dark:hover:bg-white transition-all cursor-pointer shadow-xs"
            >
              Close Drawer
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MemberProfileDrawer;