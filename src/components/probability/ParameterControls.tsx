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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Parâmetros</h2>
      </div>

      <div className="space-y-6">
        {/* n parameter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            Número de tentativas (n): {n}
            <button
              onClick={() => onOpenModal('n')}
              className="text-blue-500 hover:text-blue-700 transition-colors"
              title="Explicação sobre n"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </label>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="range"
              min="1"
              max="1000"
              value={n}
              onChange={(e) => onNChange(parseInt(e.target.value))}
              className="col-span-2 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              aria-label="Número de tentativas n"
            />
            <input
              type="number"
              min="1"
              max="100000"
              value={n}
              onChange={(e) => onNChange(Math.max(1, parseInt(e.target.value) || 1))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* p parameter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            Probabilidade de sucesso (p): {p.toFixed(3)}
            <button
              onClick={() => onOpenModal('p')}
              className="text-blue-500 hover:text-blue-700 transition-colors"
              title="Explicação sobre p"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </label>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="range"
              min="0"
              max="1"
              step="0.001"
              value={p}
              onChange={(e) => onPChange(parseFloat(e.target.value))}
              className="col-span-2 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              aria-label="Probabilidade de sucesso p"
            />
            <input
              type="number"
              min="0"
              max="1"
              step="0.001"
              value={p}
              onChange={(e) => onPChange(Math.max(0, Math.min(1, parseFloat(e.target.value) || 0)))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* k parameter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            Limite superior (k): {k}
            <button
              onClick={() => onOpenModal('k')}
              className="text-blue-500 hover:text-blue-700 transition-colors"
              title="Explicação sobre k"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </label>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="range"
              min="0"
              max={Math.min(n, 100)}
              value={k}
              onChange={(e) => onKChange(parseInt(e.target.value))}
              className="col-span-2 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              aria-label="Limite superior k"
            />
            <input
              type="number"
              min="0"
              max={n}
              value={k}
              onChange={(e) => onKChange(Math.max(0, Math.min(n, parseInt(e.target.value) || 0)))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParameterControls;
