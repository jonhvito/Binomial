import React from 'react';
import { Calculator, HelpCircle } from 'lucide-react';
import { ModalType } from '../../utils/modalContent.tsx';
import type { CalculationResult } from '../../utils/probabilityCalculations';

interface ResultsDisplayProps {
  validInput: boolean;
  validationErrors: string[];
  results: CalculationResult;
  showPoisson: boolean;
  showNormal: boolean;
  k: number;
  onOpenModal: (type: ModalType) => void;
  smartTips: string[];
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  validInput,
  validationErrors,
  results,
  showPoisson,
  showNormal,
  k,
  onOpenModal,
  smartTips,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">
          Resultados: P(X &gt; {k})
        </h2>
      </div>

      {!validInput ? (
        <div className="text-center py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-600 font-medium mb-2">Parâmetros inválidos!</p>
            <ul className="text-sm text-red-700 space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>{error}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-gray-500">
            Ajuste os parâmetros acima para continuar com os cálculos.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Exact Result */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-blue-900 flex items-center gap-2">
                Binomial Exata
                <button
                  onClick={() => onOpenModal('binomial')}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  title="Sobre distribuição binomial"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {results.exact.toFixed(4)}
            </div>
          </div>

          {/* Poisson Result */}
          {showPoisson && (
            <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-teal-900">Aproximação de Poisson</span>
                    {results.mean < 10 && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full font-medium">
                        Recomendado
                      </span>
                    )}
                    <button
                      onClick={() => onOpenModal('poisson')}
                      className="text-teal-600 hover:text-teal-800 transition-colors"
                      title="Sobre Aproximação de Poisson"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm text-teal-700">
                    λ = np = {results.mean.toFixed(3)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-teal-600">
                    {results.poisson.toFixed(4)}
                  </div>
                  <div className="text-sm text-teal-700">
                    Erro: {results.poissonError.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Normal Result */}
          {showNormal && (
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-orange-900">Aproximação de Normal</span>
                    {results.normalValid && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full font-medium">
                        Recomendado
                      </span>
                    )}
                    <button
                      onClick={() => onOpenModal('normal')}
                      className="text-orange-600 hover:text-orange-800 transition-colors"
                      title="Sobre Aproximação de Normal"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm text-orange-700">
                    μ = {results.mean.toFixed(2)}, σ = {results.stdDev.toFixed(2)}
                  </div>
                  {!results.normalValid && (
                    <div className="text-sm text-red-600 mt-1">
                      ⚠ A aproximação Normal não é recomendada porque as condições
                      np ≥ 10 e n(1−p) ≥ 10 não são atendidas.
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-600">
                    {results.normalValid ? results.normal.toFixed(4) : 'N/A'}
                  </div>
                  {results.normalValid && (
                    <div className="text-sm text-orange-700">
                      Erro: {results.normalError.toFixed(1)}%
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Statistics */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Estatísticas</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Média (μ):</span>
                <span className="ml-2 font-medium">{results.mean.toFixed(3)}</span>
              </div>
              <div>
                <span className="text-gray-600">Desvio Padrão (σ):</span>
                <span className="ml-2 font-medium">{results.stdDev.toFixed(3)}</span>
              </div>
            </div>
          </div>

          {/* Smart Tips */}
          {validInput && smartTips.length > 0 && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Dicas 
              </h4>
              <ul className="space-y-2 text-sm text-blue-800">
                {smartTips.slice(0, 3).map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">💡</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
