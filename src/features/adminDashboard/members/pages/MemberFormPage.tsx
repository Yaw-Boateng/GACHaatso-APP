import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const MemberFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl border border-slate-100 shadow-sm space-y-4">
      <h2 className="text-xl font-bold text-slate-900">{id ? 'Edit Member Record' : 'Create Member Record'}</h2>
      <button onClick={() => navigate('/dashboard/members')} className="px-4 py-2 bg-slate-100 text-slate-700 rounded text-sm">
        Back to Directory
      </button>
    </div>
  );
};