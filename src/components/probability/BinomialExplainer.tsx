import React, { useState } from 'react';
import { Play, Pause, RotateCcw, BookOpen, Calculator, Lightbulb } from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { logBinomialProb, calculateBinomial } from '../../utils/probabilityCalculations';

interface BinomialExplainerProps {
  n: number;
  p: number;
  k: number;
}

const BinomialExplainer: React.FC<BinomialExplainerProps> = ({ n, p, k }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFormula, setShowFormula] = useState(false);

  // Cálculos para a explicação usando logaritmos para evitar overflow
  const binomialProbExact = (n: number, k: number, p: number): number => {
    if (k < 0 || k > n) return 0;
    if (p === 0) return k === 0 ? 1 : 0;
    if (p === 1) return k === n ? 1 : 0;
    
    // Usa logaritmos para cálculos estáveis
    const logProb = logBinomialProb(n, k, p);
    if (!isFinite(logProb)) return 0;
    
    const result = Math.exp(logProb);
    return isFinite(result) ? result : 0;
  };

  // Função auxiliar para calcular P(X > k) de forma estável
  const calculateTailProbability = (n: number, p: number, k: number): number => {
    if (k >= n) return 0;
    
    let totalProb = 0;
    const maxTerms = Math.min(n - k, 50); // Limita para evitar cálculos desnecessários
    
    for (let i = 1; i <= maxTerms; i++) {
      const prob = binomialProbExact(n, k + i, p);
      if (isNaN(prob) || !isFinite(prob)) break;
      totalProb += prob;
    }
    
    // Se temos muitos termos, usa a função otimizada de probabilityCalculations
    if (n - k > 50) {
      return calculateBinomial(n, p, k);
    }
    
    return totalProb;
  };

  const steps = [
    {
      title: "🎯 O Problema",
      content: `Temos ${n} tentativas independentes, cada uma com probabilidade ${(p * 100).toFixed(1)}% de sucesso. Queremos calcular P(X > ${k}).`,
      visual: "problem"
    },
    {
      title: "📊 Distribuição Binomial",
      content: `X ~ Binomial(${n}, ${p.toFixed(3)}) significa que X pode assumir valores de 0 a ${n}, cada um com sua probabilidade específica.`,
      visual: "distribution"
    },
    {
      title: "🔢 Fórmula Binomial",
      content: `A fórmula da distribuição binomial nos permite calcular a probabilidade exata:`,
      visual: "formula"
    },
    {
      title: "📈 Calculando P(X > ${k})",
      content: `P(X > ${k}) = P(X=${k+1}) + P(X=${k+2}) + ... + P(X=${n})`,
      visual: "calculation"
    },
    {
      title: "✅ Resultado Final",
      content: (() => {
        const result = calculateTailProbability(n, p, k);
        const percentage = (result * 100).toFixed(4);
        return `A probabilidade de obter mais de ${k} sucessos em ${n} tentativas é ${percentage}%.`;
      })(),
      visual: "result"
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetAnimation = () => {
    setCurrentStep(0);
    setIsAnimating(false);
  };

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
    if (!isAnimating) {
      // Iniciar animação automática
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            clearInterval(interval);
            setIsAnimating(false);
            return 0;
          }
          return prev + 1;
        });
      }, 3000);
    }
  };

  const renderVisual = (visual: string) => {
    switch (visual) {
      case "problem":
        return (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
              🎯 Visualização do Problema
            </h4>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: Math.min(n, 20) }, (_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    Math.random() < p ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
              {n > 20 && <span className="theme-text-secondary">...</span>}
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
              Verde = Sucesso | Cinza = Falha | Queremos contar quando há mais de {k} sucessos
            </p>
          </div>
        );
      
      case "distribution":
        return (
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">
              📊 Valores Possíveis da Distribuição
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-green-800 dark:text-green-200 mb-2">
                  <strong>Valores possíveis:</strong> X ∈ &#123;0, 1, 2, ..., {n}&#125;
                </p>
                <p className="text-sm text-green-800 dark:text-green-200 mb-2">
                  <strong>Valor esperado:</strong> E[X] = n×p = {n}×{p.toFixed(3)} = {(n * p).toFixed(2)}
                </p>
                <p className="text-sm text-green-800 dark:text-green-200">
                  <strong>Variância:</strong> Var[X] = n×p×(1-p) = {(n * p * (1 - p)).toFixed(2)}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                <p className="text-xs font-medium theme-text mb-2">Exemplos de probabilidades:</p>
                {[0, 1, Math.floor(n/2), n-1, n].slice(0, 5).map(x => (
                  <div key={x} className="flex justify-between text-xs theme-text-secondary">
                    <span>P(X = {x})</span>
                    <span>{binomialProbExact(n, x, p).toFixed(4)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "formula":
        return (
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">
              🔢 Componentes da Fórmula
            </h4>
            <div className="text-center">
              <div className="theme-card p-4 rounded border mb-3">
                <BlockMath math={`P(X = x) = \\binom{${n}}{x} \\cdot ${p.toFixed(3)}^x \\cdot ${(1-p).toFixed(3)}^{${n}-x}`} />
              </div>
              <div className="mt-3 text-sm text-purple-700 dark:text-purple-300 space-y-1">
                <p><span className="text-blue-600 dark:text-blue-400">
                  <InlineMath math="\\binom{n}{x}" /></span> = Combinações (maneiras de escolher x sucessos)</p>
                <p><span className="text-green-600 dark:text-green-400">
                  <InlineMath math="p^x" /></span> = Probabilidade dos x sucessos</p>
                <p><span className="text-red-600 dark:text-red-400">
                  <InlineMath math="(1-p)^{n-x}" /></span> = Probabilidade das (n-x) falhas</p>
              </div>
            </div>
          </div>
        );

      case "calculation": {
        const exampleValues = Array.from({ length: Math.min(n - k, 5) }, (_, i) => k + 1 + i);
        const tailProbability = calculateTailProbability(n, p, k);
        
        return (
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-700">
            <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-3">
              📈 Cálculos Específicos
            </h4>
            <div className="space-y-2">
              {exampleValues.map((x) => {
                const prob = binomialProbExact(n, x, p);
                return (
                  <div key={x} className="flex justify-between items-center text-sm">
                    <span className="font-mono theme-text">P(X = {x})</span>
                    <span className="text-orange-700 dark:text-orange-300">
                      {isFinite(prob) ? prob.toExponential(3) : '≈ 0'}
                    </span>
                  </div>
                );
              })}
              {n - k > 5 && <div className="text-center theme-text-secondary">...</div>}
              <div className="border-t border-orange-300 dark:border-orange-600 pt-2 font-bold">
                <div className="flex justify-between items-center">
                  <span className="theme-text">Soma Total:</span>
                  <span className="text-orange-800 dark:text-orange-200">
                    {isFinite(tailProbability) ? tailProbability.toExponential(3) : '≈ 0'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case "result": {
        const finalProbability = calculateTailProbability(n, p, k);
        return (
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700">
            <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-3">
              ✅ Resultado Final
            </h4>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                {isFinite(finalProbability) ? (finalProbability * 100).toFixed(4) : '≈ 0.0000'}%
              </div>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                Probabilidade de obter mais de {k} sucessos em {n} tentativas
              </p>
              <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded border">
                <p className="text-xs font-medium theme-text mb-2">💡 Interpretação Prática:</p>
                <div className="space-y-2 text-xs theme-text-secondary">
                  {finalProbability > 0.001 ? (
                    <div className="space-y-1">
                      <p>
                        <strong>Se você repetir este experimento:</strong>
                      </p>
                      <p>
                        • Em <strong>{n} tentativas</strong> com probabilidade <strong>{(p * 100).toFixed(2)}%</strong> cada
                      </p>
                      <p>
                        • Há <strong>{(finalProbability * 100).toFixed(4)}%</strong> de chance de obter <strong>mais de {k} sucessos</strong>
                      </p>
                      <p className="pt-1 border-t border-gray-200 dark:border-gray-600">
                        <strong>Na prática:</strong> Se você fizer este experimento <strong>100 vezes</strong>, 
                        espera obter mais de {k} sucessos em aproximadamente <strong>{Math.round(finalProbability * 100)} dessas 100 repetições</strong>.
                      </p>
                      {finalProbability > 0.5 && (
                        <p className="text-orange-600 dark:text-orange-400 text-xs">
                          ⚡ <em>Este resultado é bastante provável de acontecer!</em>
                        </p>
                      )}
                      {finalProbability < 0.05 && finalProbability > 0.001 && (
                        <p className="text-blue-600 dark:text-blue-400 text-xs">
                          🔍 <em>Este é um evento raro, mas não impossível.</em>
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p><strong>Este é um evento extremamente raro!</strong></p>
                      <p>A probabilidade é menor que 0.1% - quase impossível de acontecer na prática.</p>
                      <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                        ⚠️ <em>Você precisaria repetir o experimento milhares de vezes para ver este resultado.</em>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }

      default:
        return (
          <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="theme-text text-center">
              Visualização não disponível para este tipo: {visual}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="theme-card rounded-xl theme-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-semibold theme-text">
            Explicação Passo-a-Passo
          </h2>
        </div>
        <button
          onClick={() => setShowFormula(!showFormula)}
          className="text-xs px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/50 hover:bg-indigo-200 dark:hover:bg-indigo-800/50 text-indigo-700 dark:text-indigo-300 rounded flex items-center gap-1 transition-colors"
        >
          <Calculator className="w-3 h-3" />
          {showFormula ? 'Ocultar' : 'Mostrar'} Fórmula
        </button>
      </div>

      {showFormula && (
        <div className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg">
          <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">📚 Fórmula da Distribuição Binomial:</h3>
          <div className="text-center theme-card p-3 rounded border mb-3">
            <BlockMath math="P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}" />
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-indigo-800 dark:text-indigo-200">
            <div>
              <p><strong>n:</strong> número de tentativas ({n})</p>
              <p><strong>k:</strong> número de sucessos desejados</p>
            </div>
            <div>
              <p><strong>p:</strong> probabilidade de sucesso ({p.toFixed(3)})</p>
              <p><strong><InlineMath math="\binom{n}{k}" />:</strong> combinações de n, k a k</p>
            </div>
          </div>
        </div>
      )}

      {/* Controles de navegação */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 theme-text rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Anterior
        </button>
        
        <button
          onClick={toggleAnimation}
          className="flex items-center gap-1 px-3 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors"
        >
          {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isAnimating ? 'Pausar' : 'Animar'}
        </button>
        
        <button
          onClick={resetAnimation}
          className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
        
        <button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 theme-text rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Próximo →
        </button>
      </div>

      {/* Indicador de progresso */}
      <div className="flex justify-center gap-2 mb-6">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
              index === currentStep 
                ? 'bg-indigo-600 dark:bg-indigo-400' 
                : index < currentStep 
                  ? 'bg-indigo-300 dark:bg-indigo-600' 
                  : 'bg-gray-300 dark:bg-gray-600'
            }`}
            onClick={() => setCurrentStep(index)}
          />
        ))}
      </div>

      {/* Conteúdo do passo atual */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold theme-text mb-2">
            {steps[currentStep].title}
          </h3>
          <p className="theme-text-secondary">
            {steps[currentStep].content}
          </p>
        </div>

        {/* Visualização */}
        <div className="mt-4">
          {renderVisual(steps[currentStep].visual)}
        </div>
      </div>

      {/* Dica educacional */}
      <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
        <div className="flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">💡 Contexto do Seu Problema</h4>
            <div className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
              <p>
                <strong>Seu cenário:</strong> {n} tentativas com {(p * 100).toFixed(1)}% de chance de sucesso cada.
              </p>
              <p>
                <strong>Pergunta:</strong> Qual a probabilidade de obter <em>mais de {k}</em> sucessos?
              </p>
              <p className="pt-2 border-t border-yellow-300 dark:border-yellow-600">
                <strong>Aplicações similares:</strong> Controle de qualidade, pesquisas de opinião, 
                análises médicas, testes A/B, e qualquer situação com tentativas independentes.
              </p>
              {p < 0.1 && n > 20 && (
                <p className="text-blue-700 dark:text-blue-300">
                  ⚡ <strong>Dica:</strong> Com p baixo ({(p * 100).toFixed(1)}%) e n alto ({n}), 
                  considere usar a aproximação de Poisson para cálculos mais rápidos!
                </p>
              )}
              {n * p > 5 && n * (1-p) > 5 && (
                <p className="text-purple-700 dark:text-purple-300">
                  ⚡ <strong>Dica:</strong> Com np={(n*p).toFixed(1)} e n(1-p)={(n*(1-p)).toFixed(1)}, ambos {'>'} 5, 
                  a aproximação Normal também funciona bem!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinomialExplainer;