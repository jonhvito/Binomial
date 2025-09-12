import React from 'react';

interface ApproximationOptionsProps {
  showPoisson: boolean;
  showNormal: boolean;
  onShowPoissonChange: (value: boolean) => void;
  onShowNormalChange: (value: boolean) => void;
}

const ApproximationOptions: React.FC<ApproximationOptionsProps> = ({
  showPoisson,
  showNormal,
  onShowPoissonChange,
  onShowNormalChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Aproximações</h3>
      <div className="space-y-3">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showPoisson}
            onChange={(e) => onShowPoissonChange(e.target.checked)}
            className="mr-3 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
          />
          <span className="text-gray-700">Mostrar Aproximação de Poisson</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showNormal}
            onChange={(e) => onShowNormalChange(e.target.checked)}
            className="mr-3 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
          />
          <span className="text-gray-700">Mostrar Aproximação de Normal</span>
        </label>
      </div>
    </div>
  );
};

export default ApproximationOptions;
