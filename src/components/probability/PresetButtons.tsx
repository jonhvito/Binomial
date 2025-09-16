import React from 'react';
import { PRESETS } from '../../utils/presets';

interface PresetButtonsProps {
  onApplyPreset: (n: number, p: number, k: number) => void;
}

const PresetButtons: React.FC<PresetButtonsProps> = ({ onApplyPreset }) => {
  return (
    <div className="theme-card rounded-xl theme-shadow p-4 lg:p-6 w-full max-w-full overflow-hidden">
      <h3 className="text-lg font-semibold theme-text mb-3 lg:mb-4">Cenários Práticos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 w-full">
        {PRESETS.map((preset, index) => (
          <button
            key={index}
            onClick={() => onApplyPreset(preset.n, preset.p, preset.k)}
            className={`px-3 lg:px-4 py-4 lg:py-3 ${getButtonClasses(preset.color)} hover:opacity-90 text-white rounded-lg transition-colors duration-200 font-medium text-sm touch-manipulation w-full min-w-0`}
            title={`Aplicar cenário ${preset.title}`}
          >
            <div className="text-center w-full">
              <div className="truncate">{preset.emoji} {preset.title}</div>
              <div className="text-xs opacity-90 mt-1">n={preset.n}, p={preset.p}, k={preset.k}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Descrições dos cenários - Hidden on mobile for cleaner look */}
      <div className="mt-3 lg:mt-4 space-y-1 lg:space-y-2 text-xs lg:text-sm theme-text-secondary hidden sm:block w-full">
        {PRESETS.map((preset, index) => (
          <div key={index} className="flex items-start gap-2 w-full">
            <span className={`text-${preset.color}-600 dark:text-${preset.color}-400 flex-shrink-0`}>{preset.emoji}</span>
            <span className="flex-1 min-w-0">{preset.description}</span>
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
