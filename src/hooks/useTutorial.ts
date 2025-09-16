import { useState } from 'react';

// Hook para controlar o tutorial
export const useTutorial = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openTutorial = () => setIsOpen(true);
  const closeTutorial = () => setIsOpen(false);

  return { isOpen, openTutorial, closeTutorial };
};