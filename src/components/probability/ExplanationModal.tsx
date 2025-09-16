import React from 'react';
import { X } from 'lucide-react';
import { ModalType, getModalContent, getModalTitle } from '../../utils/modalContent.tsx';

interface ExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ModalType | null;
}

const ExplanationModal: React.FC<ExplanationModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="theme-card rounded-xl theme-shadow max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold theme-text">{getModalTitle(type)}</h3>
          <button
            onClick={onClose}
            className="theme-text-secondary hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          {getModalContent(type)}
        </div>
      </div>
    </div>
  );
};

export default ExplanationModal;
