import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { TrendingUp, BarChart3, PieChart, Eye, EyeOff } from 'lucide-react';
import type { ChartOptions, ChartData } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface AdditionalChartsProps {
  validInput: boolean;
  n: number;
  p: number;
  showPoisson: boolean;
  showNormal: boolean;
  binomialData: number[];
  poissonData?: number[];
  normalData?: number[];
}

const AdditionalCharts: React.FC<AdditionalChartsProps> = ({
  validInput,
  n,
  p,
  showPoisson,
  showNormal,
  binomialData,
  poissonData,
  normalData,
}) => {
  const [activeChart, setActiveChart] = useState<'comparison' | 'cumulative' | 'overlay'>('comparison');
  const [showExplanation, setShowExplanation] = useState(false);
  const [separateOverlap, setSeparateOverlap] = useState(false);

  // Função para detectar sobreposição das curvas
  const detectOverlap = () => {
    if (!validInput) return { 
      hasOverlap: false, 
      poissonOverlap: 0, 
      normalOverlap: 0, 
      maxDiffPoisson: 0, 
      maxDiffNormal: 0 
    };

    const results = { 
      hasOverlap: false,
      poissonOverlap: 0,
      normalOverlap: 0,
      maxDiffPoisson: 0,
      maxDiffNormal: 0
    };

    const range = Math.min(n + 1, 20); // Analisa os primeiros 20 pontos
    
    if (showPoisson && poissonData) {
      let totalDiff = 0;
      let maxDiff = 0;
      
      for (let i = 0; i < range; i++) {
        const diff = Math.abs(binomialData[i] - poissonData[i]);
        totalDiff += diff;
        maxDiff = Math.max(maxDiff, diff);
      }
      
      results.poissonOverlap = totalDiff / range;
      results.maxDiffPoisson = maxDiff;
    }

    if (showNormal && normalData) {
      let totalDiff = 0;
      let maxDiff = 0;
      
      for (let i = 0; i < range; i++) {
        const diff = Math.abs(binomialData[i] - normalData[i]);
        totalDiff += diff;
        maxDiff = Math.max(maxDiff, diff);
      }
      
      results.normalOverlap = totalDiff / range;
      results.maxDiffNormal = maxDiff;
    }

    // Define como sobreposição se a diferença média é muito pequena
    results.hasOverlap = results.poissonOverlap < 0.001 || results.normalOverlap < 0.001;
    
    return results;
  };

  const overlapInfo = detectOverlap();

  // Preparar dados para o gráfico de comparação
  const getComparisonChartData = (): ChartData<'line'> | null => {
    if (!validInput) return null;

    const labels = Array.from({ length: Math.min(n + 1, 50) }, (_, i) => i.toString());
    const hasOverlap = overlapInfo.hasOverlap;
    
    const datasets = [
      {
        label: 'Binomial (Exato)',
        data: binomialData.slice(0, 50),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: false,
        pointRadius: hasOverlap ? 4 : 3,
        pointHoverRadius: 6,
        borderWidth: hasOverlap ? 3 : 2,
        tension: 0,
      },
    ];

    if (showPoisson && poissonData) {
      const isPoissonClose = overlapInfo.poissonOverlap < 0.001;
      const separationFactor = separateOverlap && isPoissonClose ? 1.05 : 1; // 5% de separação quando ativado
      
      datasets.push({
        label: `Aproximação Poisson ${isPoissonClose ? '(muito próxima!)' : ''}`,
        data: poissonData.slice(0, 50).map(val => val * separationFactor),
        borderColor: separateOverlap && isPoissonClose ? 'rgb(22, 163, 74)' : 'rgb(34, 197, 94)', // Cor diferente quando separado
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: false,
        pointRadius: hasOverlap ? 3 : 2,
        pointHoverRadius: 5,
        borderWidth: isPoissonClose ? 3 : 2,
        tension: 0,
        ...(isPoissonClose && { borderDash: separateOverlap ? [15, 5] : [5, 5] }), // Padrão diferente quando separado
      });
    }

    if (showNormal && normalData) {
      const isNormalClose = overlapInfo.normalOverlap < 0.001;
      const separationFactor = separateOverlap && isNormalClose ? 0.95 : 1; // -5% de separação quando ativado
      
      datasets.push({
        label: `Aproximação Normal ${isNormalClose ? '(muito próxima!)' : ''}`,
        data: normalData.slice(0, 50).map(val => val * separationFactor),
        borderColor: separateOverlap && isNormalClose ? 'rgb(147, 51, 234)' : 'rgb(168, 85, 247)', // Cor diferente quando separado
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        fill: false,
        pointRadius: hasOverlap ? 3 : 2,
        pointHoverRadius: 5,
        borderWidth: isNormalClose ? 3 : 2,
        tension: 0,
        ...(isNormalClose && { borderDash: separateOverlap ? [20, 10] : [10, 3] }), // Padrão diferente quando separado
      });
    }

    return { labels, datasets };
  };

  // Preparar dados para o gráfico cumulativo
  const getCumulativeChartData = (): ChartData<'line'> | null => {
    if (!validInput) return null;

    const labels = Array.from({ length: Math.min(n + 1, 50) }, (_, i) => i.toString());
    const binomialCumulative = binomialData.slice(0, 50).reduce((acc: number[], val, index) => {
      const prevSum = index > 0 ? acc[index - 1] : 0;
      acc.push(prevSum + val);
      return acc;
    }, []);

    const datasets = [
      {
        label: 'F(x) = P(X ≤ x) - Binomial',
        data: binomialCumulative,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        pointRadius: 2,
        tension: 0.1,
      },
    ];

    return { labels, datasets };
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151',
        },
      },
      tooltip: {
        backgroundColor: document.documentElement.classList.contains('dark') ? '#374151' : '#ffffff',
        titleColor: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#1f2937',
        bodyColor: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151',
        borderColor: document.documentElement.classList.contains('dark') ? '#6b7280' : '#e5e7eb',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            return `${context.dataset.label}: ${value.toFixed(6)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: activeChart === 'cumulative' ? 'Probabilidade Acumulada' : 'Probabilidade',
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151',
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#d1d5db' : '#6b7280',
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? '#4b5563' : '#e5e7eb',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Número de Sucessos (x)',
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151',
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#d1d5db' : '#6b7280',
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? '#4b5563' : '#e5e7eb',
        },
      },
    },
  };

  const getChartData = () => {
    switch (activeChart) {
      case 'comparison':
        return getComparisonChartData();
      case 'cumulative':
        return getCumulativeChartData();
      default:
        return getComparisonChartData();
    }
  };

  const getChartTitle = () => {
    switch (activeChart) {
      case 'comparison':
        return 'Comparação das Distribuições';
      case 'cumulative':
        return 'Função de Distribuição Acumulada';
      default:
        return 'Visualizações Avançadas';
    }
  };

  const chartData = getChartData();

  return (
    <div className="theme-card rounded-xl theme-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-semibold theme-text">Visualizações Avançadas</h2>
        </div>
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="text-xs px-3 py-1.5 bg-purple-100 dark:bg-purple-900/50 hover:bg-purple-200 dark:hover:bg-purple-800/50 text-purple-700 dark:text-purple-300 rounded flex items-center gap-1 transition-colors"
        >
          {showExplanation ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          {showExplanation ? 'Ocultar Ajuda' : 'Como Usar'}
        </button>
      </div>

      {/* Botões de Seleção */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveChart('comparison')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeChart === 'comparison'
              ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-600'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Comparação
        </button>
        <button
          onClick={() => setActiveChart('cumulative')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeChart === 'cumulative'
              ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-600'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <PieChart className="w-4 h-4" />
          Acumulada
        </button>

        {/* Botão para separar curvas sobrepostas */}
        {overlapInfo.hasOverlap && activeChart === 'comparison' && (
          <button
            onClick={() => setSeparateOverlap(!separateOverlap)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              separateOverlap
                ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 border border-orange-300 dark:border-orange-600'
                : 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800/50'
            }`}
            title="As curvas estão muito próximas. Clique para separá-las visualmente."
          >
            <Eye className="w-4 h-4" />
            {separateOverlap ? 'Juntar Curvas' : 'Separar Curvas'}
          </button>
        )}
      </div>

      {/* Painel de Análise de Sobreposição */}
      {overlapInfo.hasOverlap && activeChart === 'comparison' && (showPoisson || showNormal) && (
        <div className="mb-4 p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 dark:border-amber-500 rounded-r-lg">
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 bg-amber-100 dark:bg-amber-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Eye className="w-3 h-3 text-amber-600 dark:text-amber-300" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                📊 Curvas Muito Próximas Detectadas
              </h4>
              <p className="text-sm text-amber-800 dark:text-amber-200 mb-3">
                As aproximações estão excelentes! As curvas se sobrepõem quase perfeitamente.
              </p>
              
              <div className="grid md:grid-cols-2 gap-3 text-xs">
                {showPoisson && overlapInfo.poissonOverlap < 0.001 && (
                  <div className="bg-white dark:bg-gray-800 p-2 rounded border">
                    <p className="font-medium text-green-700 dark:text-green-300">
                      ✅ Aproximação Poisson
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Diferença média: {(overlapInfo.poissonOverlap * 100).toExponential(2)}%
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Máx diferença: {(overlapInfo.maxDiffPoisson * 100).toFixed(4)}%
                    </p>
                  </div>
                )}
                
                {showNormal && overlapInfo.normalOverlap < 0.001 && (
                  <div className="bg-white dark:bg-gray-800 p-2 rounded border">
                    <p className="font-medium text-purple-700 dark:text-purple-300">
                      ✅ Aproximação Normal
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Diferença média: {(overlapInfo.normalOverlap * 100).toExponential(2)}%
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Máx diferença: {(overlapInfo.maxDiffNormal * 100).toFixed(4)}%
                    </p>
                  </div>
                )}
              </div>
              
              <div className="mt-3 text-xs text-amber-700 dark:text-amber-300">
                💡 <strong>Dica:</strong> Para melhor visualização, use linhas tracejadas e formas diferentes nos pontos.
                {separateOverlap ? (
                  <span className="block mt-1 font-medium text-orange-700 dark:text-orange-300">
                    🔧 <strong>Separação Ativa:</strong> Curvas deslocadas ±5% para melhor visibilidade!
                  </span>
                ) : (
                  " Clique em 'Separar Curvas' para um pequeno deslocamento visual."
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showExplanation && (
        <div className="mb-4 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
          <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-2">📈 Guia das Visualizações:</h4>
          <div className="text-sm text-purple-800 dark:text-purple-300 space-y-2">
            <div>
              <strong>Comparação:</strong> Mostra as três distribuições lado a lado. 
              Note como as aproximações se comportam comparadas ao valor exato.
            </div>
            <div>
              <strong>Acumulada:</strong> Mostra P(X ≤ x), útil para entender probabilidades 
              "até" um valor específico.
            </div>
            <ul className="mt-2 text-xs space-y-1 pl-4">
              <li>• <strong>Linha sólida azul:</strong> Distribuição Binomial (exata)</li>
              <li>• <strong>Linha tracejada verde:</strong> Aproximação Poisson {separateOverlap && overlapInfo.poissonOverlap < 0.001 ? '(+5% quando separada)' : ''}</li>
              <li>• <strong>Linha tracejada roxa:</strong> Aproximação Normal {separateOverlap && overlapInfo.normalOverlap < 0.001 ? '(-5% quando separada)' : ''}</li>
              {separateOverlap && overlapInfo.hasOverlap && (
                <li className="text-orange-600 dark:text-orange-400">
                  • <strong>Separação visual ativa:</strong> Curvas próximas foram deslocadas para melhor visualização
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Gráfico */}
      {validInput && chartData ? (
        <div className="h-80">
          <Line 
            data={chartData} 
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  display: true,
                  text: getChartTitle(),
                  color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#1f2937',
                },
              },
            }} 
          />
        </div>
      ) : (
        <div className="h-80 flex items-center justify-center theme-text-secondary">
          <p>Aguardando parâmetros válidos...</p>
        </div>
      )}

      {/* Insights automáticos */}
      {validInput && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-1">💡 Insights Automáticos:</h4>
          <div className="text-xs text-blue-800 dark:text-blue-300 space-y-1">
            {p < 0.05 && (
              <p>• Com p = {p.toFixed(3)} (baixo), a distribuição é assimétrica à esquerda</p>
            )}
            {p > 0.95 && (
              <p>• Com p = {p.toFixed(3)} (alto), a distribuição é assimétrica à direita</p>
            )}
            {n * p > 5 && n * (1 - p) > 5 && (
              <p>• Condições para aproximação Normal são satisfeitas (np &gt; 5 e n(1-p) &gt; 5)</p>
            )}
            {n >= 20 && p <= 0.05 && (
              <p>• Condições para aproximação Poisson são boas (n ≥ 20 e p ≤ 0.05)</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdditionalCharts;