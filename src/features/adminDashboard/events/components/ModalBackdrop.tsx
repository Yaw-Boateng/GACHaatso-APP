import React from 'react';

interface ModalBackdropProps {
  onClose: () => void;
}

export const ModalBackdrop: React.FC<ModalBackdropProps> = ({ onClose }) => (
  <div
    className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200 z-40"
    onClick={onClose}
  />
);