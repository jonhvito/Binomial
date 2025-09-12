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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">{getModalTitle(type)}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
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
