import React, { useState } from 'react';
import { Info, Eye, EyeOff } from 'lucide-react';

interface ChartLegendProps {
  k: number;
}

const ChartLegend: React.FC<ChartLegendProps> = ({ k }) => {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border theme-border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold theme-text flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Legenda do Gráfico
        </h3>
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-800/50 text-blue-700 dark:text-blue-300 rounded flex items-center gap-1 transition-colors"
        >
          {showExplanation ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          {showExplanation ? 'Ocultar' : 'Explicação'}
        </button>
      </div>

      <div className="space-y-3">
        {/* Legenda das cores */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-blue-500 rounded shadow-sm"></div>
            <span className="text-sm theme-text-secondary">
              <strong>Azul:</strong> Valores ≤ {k} (não excedem o limite)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-orange-500 rounded shadow-sm"></div>
            <span className="text-sm theme-text-secondary">
              <strong>Laranja:</strong> Valores &gt; {k} (excedem o limite)
            </span>
          </div>
        </div>

        {showExplanation && (
          <div className="mt-4 p-3 theme-card border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 className="text-sm font-semibold theme-text mb-2">📊 Como interpretar:</h4>
            <ul className="text-xs theme-text-secondary space-y-1">
              <li>• <strong>Altura das barras:</strong> Representa a probabilidade P(X = x)</li>
              <li>• <strong>Barras azuis:</strong> Probabilidades que NÃO nos interessam (≤ {k})</li>
              <li>• <strong>Barras laranjas:</strong> Probabilidades que QUEREMOS (&gt; {k})</li>
              <li>• <strong>Soma das barras laranjas:</strong> É o resultado final P(X &gt; {k})</li>
            </ul>
            
            <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
              <p className="text-xs text-yellow-800 dark:text-yellow-200">
                <strong>💡 Dica:</strong> Quando o gráfico tem mais barras laranjas à direita, 
                significa maior probabilidade de ter muitos sucessos!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartLegend;