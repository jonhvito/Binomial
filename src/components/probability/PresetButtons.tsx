import React from 'react';
import { PRESETS } from '../../utils/presets';

interface PresetButtonsProps {
  onApplyPreset: (n: number, p: number, k: number) => void;
}

const PresetButtons: React.FC<PresetButtonsProps> = ({ onApplyPreset }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Cenários Práticos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PRESETS.map((preset, index) => (
          <button
            key={index}
            onClick={() => onApplyPreset(preset.n, preset.p, preset.k)}
            className={`px-4 py-3 ${getButtonClasses(preset.color)} hover:opacity-90 text-white rounded-lg transition-colors duration-200 font-medium text-sm`}
            title={`Aplicar cenário ${preset.title}`}
          >
            {preset.emoji} {preset.title}<br />
            <span className="text-xs opacity-90">n={preset.n}, p={preset.p}, k={preset.k}</span>
          </button>
        ))}
      </div>

      {/* Descrições dos cenários */}
      <div className="mt-4 space-y-2 text-sm text-gray-600">
        {PRESETS.map((preset, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className={`text-${preset.color}-600`}>{preset.emoji}</span>
            <span>{preset.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Função auxiliar para obter classes CSS baseadas na cor
const getButtonClasses = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    teal: 'bg-teal-600 hover:bg-teal-700',
    green: 'bg-green-600 hover:bg-green-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
    orange: 'bg-orange-600 hover:bg-orange-700',
    red: 'bg-red-600 hover:bg-red-700',
    indigo: 'bg-indigo-600 hover:bg-indigo-700',
    pink: 'bg-pink-600 hover:bg-pink-700',
    cyan: 'bg-cyan-600 hover:bg-cyan-700',
  };
  return colorMap[color] || 'bg-gray-600 hover:bg-gray-700';
};

export default PresetButtons;
