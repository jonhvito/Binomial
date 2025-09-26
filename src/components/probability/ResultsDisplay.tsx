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
    <div className="theme-card rounded-xl theme-shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-xl font-semibold theme-text">
          Resultados: P(X &gt; {k})
        </h2>
      </div>

      {!validInput ? (
        <div className="text-center py-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-4">
            <p className="text-red-600 dark:text-red-300 font-medium mb-2">Parâmetros inválidos!</p>
            <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-500 dark:text-red-400 mt-1">•</span>
                  <span>{error}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm theme-text-secondary">
            Ajuste os parâmetros acima para continuar com os cálculos.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Exact Result */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-blue-900 dark:text-blue-100 flex items-center gap-2">
                Binomial Exata
                <button
                  onClick={() => onOpenModal('binomial')}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  title="Sobre distribuição binomial"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </span>
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">
              {results.exact.toFixed(4)}
            </div>
          </div>

          {/* Poisson Result */}
          {showPoisson && (
            <div className="bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-500 p-4 rounded-r-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-teal-900 dark:text-teal-100">Aproximação de Poisson</span>
                    {results.mean < 10 && (
                      <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full font-medium">
                        Recomendado
                      </span>
                    )}
                    <button
                      onClick={() => onOpenModal('poisson')}
                      className="text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
                      title="Sobre Aproximação de Poisson"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm text-teal-700 dark:text-teal-200">
                    λ = np = {results.mean.toFixed(3)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-teal-600 dark:text-teal-300">
                    {results.poisson.toFixed(4)}
                  </div>
                  <div className="text-sm text-teal-700 dark:text-teal-200">
                    Erro: {results.poissonError.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Normal Result */}
          {showNormal && (
            <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-orange-900 dark:text-orange-100">Aproximação de Normal</span>
                    {results.normalValid ? (
                      <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full font-medium">
                        ✓ Recomendado
                      </span>
                    ) : results.normalCalculable ? (
                      <span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-200 rounded-full font-medium">
                        ⚡ Aceitável
                      </span>
                    ) : results.normal > 0 ? (
                      <span className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-full font-medium">
                        ⚠ Inadequado
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-900/50 text-gray-700 dark:text-gray-200 rounded-full font-medium">
                        N/A
                      </span>
                    )}
                    <button
                      onClick={() => onOpenModal('normal')}
                      className="text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 transition-colors"
                      title="Sobre Aproximação de Normal"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm text-orange-700 dark:text-orange-200">
                    μ = {results.mean.toFixed(2)}, σ = {results.stdDev.toFixed(2)}
                  </div>
                  {!results.normalValid && results.normalCalculable && (
                    <div className="text-sm text-yellow-600 dark:text-yellow-300 mt-1">
                      <p>⚠ <strong>Aproximação aceitável mas não ideal.</strong></p>
                      <p className="text-xs mt-1">
                        Para melhor precisão, np e n(1-p) deveriam ser ≥ 10. Com seus valores atuais, 
                        a curva Normal pode não aproximar perfeitamente a distribuição binomial.
                      </p>
                    </div>
                  )}
                  {!results.normalCalculable && results.normal > 0 && (
                    <div className="text-sm text-red-600 dark:text-red-300 mt-1">
                      <p>⚠ <strong>Aproximação inadequada - Use apenas para comparação educacional!</strong></p>
                      <p className="text-xs mt-1">
                        <strong>Por que não é adequado:</strong> Quando np ou n(1-p) são muito pequenos ({'<'}5), 
                        a distribuição binomial é muito "pontuda" e assimétrica, mas a Normal é sempre simétrica 
                        e suave. É como tentar aproximar uma escada com uma rampa - não funciona bem!
                      </p>
                      <p className="text-xs mt-1">
                        <strong>O resultado abaixo pode estar muito incorreto.</strong> Use apenas para entender 
                        por que essa aproximação falha neste caso.
                      </p>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-300">
                    {results.normal > 0 ? results.normal.toFixed(4) : 'N/A'}
                  </div>
                  {results.normal > 0 && (
                    <div className="text-sm text-orange-700 dark:text-orange-200">
                      Erro: {results.normalError.toFixed(1)}%
                      {!results.normalCalculable && results.normal > 0 && (
                        <span className="text-red-500 dark:text-red-400 block text-xs">
                          (Muito impreciso!)
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Statistics */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <h4 className="font-medium theme-text mb-2">Estatísticas</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="theme-text-secondary">Média (μ):</span>
                <span className="ml-2 font-medium theme-text">{results.mean.toFixed(3)}</span>
              </div>
              <div>
                <span className="theme-text-secondary">Desvio Padrão (σ):</span>
                <span className="ml-2 font-medium theme-text">{results.stdDev.toFixed(3)}</span>
              </div>
            </div>
          </div>

          {/* Smart Tips */}
          {validInput && smartTips.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Dicas 
              </h4>
              <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                {smartTips.slice(0, 3).map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 mt-1">💡</span>
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
