import React from 'react';
import { Settings, HelpCircle } from 'lucide-react';
import { ModalType } from '../../utils/modalContent.tsx';

interface ParameterControlsProps {
  n: number;
  p: number;
  k: number;
  onNChange: (value: number) => void;
  onPChange: (value: number) => void;
  onKChange: (value: number) => void;
  onOpenModal: (type: ModalType) => void;
}

const ParameterControls: React.FC<ParameterControlsProps> = ({
  n,
  p,
  k,
  onNChange,
  onPChange,
  onKChange,
  onOpenModal,
}) => {
  return (
    <div className="theme-card rounded-xl theme-shadow p-4 lg:p-6 w-full max-w-full overflow-hidden">
      <div className="flex items-center gap-2 mb-4 lg:mb-6">
        <Settings className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
        <h2 className="text-lg lg:text-xl font-semibold theme-text">Parâmetros</h2>
      </div>

      <div className="space-y-4 lg:space-y-6 w-full">
        {/* n parameter */}
        <div className="w-full">
          <label className="block text-sm font-medium theme-text-secondary mb-2 flex items-center gap-2 w-full">
            <span className="flex-1">Número de tentativas (n): {n}</span>
            <button
              onClick={() => onOpenModal('n')}
              className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors touch-manipulation flex-shrink-0"
              title="Explicação sobre n"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4 w-full">
            <input
              type="range"
              min="1"
              max="1000"
              value={n}
              onChange={(e) => onNChange(parseInt(e.target.value))}
              className="sm:col-span-2 w-full h-3 lg:h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer touch-manipulation"
              aria-label="Número de tentativas n"
            />
            <input
              type="number"
              min="1"
              max="100000"
              value={n}
              onChange={(e) => onNChange(Math.max(1, parseInt(e.target.value) || 1))}
              className="px-3 py-3 lg:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 theme-card theme-text text-center sm:text-left touch-manipulation w-full min-w-0"
            />
          </div>
        </div>

        {/* p parameter */}
        <div className="w-full">
          <label className="block text-sm font-medium theme-text-secondary mb-2 flex items-center gap-2 w-full">
            <span className="flex-1">Probabilidade de sucesso (p): {p.toFixed(3)}</span>
            <button
              onClick={() => onOpenModal('p')}
              className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors touch-manipulation flex-shrink-0"
              title="Explicação sobre p"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4 w-full">
            <input
              type="range"
              min="0"
              max="1"
              step="0.001"
              value={p}
              onChange={(e) => onPChange(parseFloat(e.target.value))}
              className="sm:col-span-2 w-full h-3 lg:h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer touch-manipulation"
              aria-label="Probabilidade de sucesso p"
            />
            <input
              type="number"
              min="0"
              max="1"
              step="0.001"
              value={p}
              onChange={(e) => onPChange(Math.max(0, Math.min(1, parseFloat(e.target.value) || 0)))}
              className="px-3 py-3 lg:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 theme-card theme-text text-center sm:text-left touch-manipulation w-full min-w-0"
            />
          </div>
        </div>

        {/* k parameter */}
        <div className="w-full">
          <label className="block text-sm font-medium theme-text-secondary mb-2 flex items-center gap-2 w-full">
            <span className="flex-1">Limite superior (k): {k}</span>
            <button
              onClick={() => onOpenModal('k')}
              className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors touch-manipulation flex-shrink-0"
              title="Explicação sobre k"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4 w-full">
            <input
              type="range"
              min="0"
              max={Math.min(n, 100)}
              value={k}
              onChange={(e) => onKChange(parseInt(e.target.value))}
              className="sm:col-span-2 w-full h-3 lg:h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer touch-manipulation"
              aria-label="Limite superior k"
            />
            <input
              type="number"
              min="0"
              max={n}
              value={k}
              onChange={(e) => onKChange(Math.max(0, Math.min(n, parseInt(e.target.value) || 0)))}
              className="px-3 py-3 lg:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 theme-card theme-text text-center sm:text-left touch-manipulation w-full min-w-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParameterControls;
