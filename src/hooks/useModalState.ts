import { useState } from 'react';
import { ModalType } from '../utils/modalContent';

export const useModalState = () => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: ModalType | null;
  }>({ isOpen: false, type: null });

  const openModal = (type: ModalType) => {
    setModalState({ isOpen: true, type });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null });
  };

  return {
    modalState,
    openModal,
    closeModal,
  };
};
