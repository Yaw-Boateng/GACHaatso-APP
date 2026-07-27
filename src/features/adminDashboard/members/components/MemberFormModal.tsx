import React, { useState, useEffect } from 'react';
import { Member } from '../types';
import { useMembers } from '../hooks/useMembers';
import { useApprovedLeaders } from '../../admin/hooks/useAdminQueries';
import { useAssignLeader } from '../../admin/hooks/useAdminMutations';


interface MemberFormModalProps {
  isOpen: boolean;
  member: Member | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const MemberFormModal: React.FC<MemberFormModalProps> = ({
  isOpen,
  member,
  onClose,
  onSuccess,
}) => {
  const { createMember, updateMember, actionLoading } = useMembers();

  // 1. Fetch approved leaders & setup assign leader mutation
  const { data: approvedLeaders = [], isLoading: isLoadingLeaders } = useApprovedLeaders();
  const assignLeaderMutation = useAssignLeader();

  const [formData, setFormData] = useState<Partial<Member>>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    gender: 'MALE',
    dateOfBirth: '',
    maritalStatus: 'SINGLE',
    residenceAddress: '',
    occupation: '',
    emergencyNumber: '',
  });

  const [selectedLeaderId, setSelectedLeaderId] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (member) {
      setFormData(member);
      setPreviewUrl(member.imageUrl ? member.imageUrl : null);
      setSelectedLeaderId(member.leader?.id || '');
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        gender: 'MALE',
        dateOfBirth: '',
        maritalStatus: 'SINGLE',
        residenceAddress: '',
        occupation: '',
        emergencyNumber: '',
      });
      setSelectedLeaderId('');
      setPreviewUrl(null);
    }
    setSelectedFile(null);
  }, [member, isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (member?.id) {
        // Edit existing member
        await updateMember(member.id, formData, selectedFile);

        // If leader changed on edit, reassign leader
        if (selectedLeaderId && selectedLeaderId !== member.leader?.id) {
          await assignLeaderMutation.mutateAsync({
            memberId: member.id,
            leaderId: selectedLeaderId,
          });
        }
      } else {
        // 1. Create member
        const newMember = await createMember(formData, selectedFile);

        // 2. If a leader was chosen from dropdown, assign the leader
        const createdId = newMember?.id || newMember?.data?.id;
        if (createdId && selectedLeaderId) {
          await assignLeaderMutation.mutateAsync({
            memberId: createdId,
            leaderId: selectedLeaderId,
          });
        }
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  const isSubmitting = actionLoading || assignLeaderMutation.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {member ? 'Edit Member' : 'Add New Member'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Profile Image File Upload */}
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-800">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <span className="text-xs text-slate-400">Photo</span>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                First Name *
              </label>
              <input
                name="firstName"
                required
                value={formData.firstName || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Last Name *
              </label>
              <input
                name="lastName"
                required
                value={formData.lastName || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Phone Number *
              </label>
              <input
                name="phoneNumber"
                required
                value={formData.phoneNumber || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Date of Birth
              </label>
              <input
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender || 'MALE'}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-sm"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Marital Status
              </label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus || 'SINGLE'}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-sm"
              >
                <option value="SINGLE">Single</option>
                <option value="MARRIED">Married</option>
                <option value="DIVORCED">Divorced</option>
                <option value="WIDOWED">Widowed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Emergency Number
              </label>
              <input
                name="emergencyNumber"
                value={formData.emergencyNumber || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-sm"
              />
            </div>

            {/* Approved Leader Selection Dropdown */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase mb-1">
                Assign Leader (Optional)
              </label>
              <select
                value={selectedLeaderId}
                onChange={(e) => setSelectedLeaderId(e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
              >
                <option value="">-- Select Approved Leader --</option>
                {isLoadingLeaders ? (
                  <option disabled>Loading approved leaders...</option>
                ) : (
                  approvedLeaders.map((leader) => (
                    <option key={leader.id} value={leader.id}>
                      {leader.firstName} {leader.lastName} ({leader.email})
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Residence Address
              </label>
              <input
                name="residenceAddress"
                value={formData.residenceAddress || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                Occupation
              </label>
              <input
                name="occupation"
                value={formData.occupation || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};