import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MemberFormModal } from '../components/MemberFormModal';

export const AddMembersPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MemberFormModal
      isOpen={true}
      member={null}
      onClose={() => navigate('/members')}
      onSuccess={() => navigate('/members')}
    />
  );
};

export default AddMembersPage;