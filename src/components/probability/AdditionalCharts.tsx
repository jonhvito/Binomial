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

  // Preparar dados para o gráfico de comparação
  const getComparisonChartData = (): ChartData<'line'> | null => {
    if (!validInput) return null;

    const labels = Array.from({ length: Math.min(n + 1, 50) }, (_, i) => i.toString());
    const datasets = [
      {
        label: 'Binomial (Exato)',
        data: binomialData.slice(0, 50),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: false,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ];

    if (showPoisson && poissonData) {
      datasets.push({
        label: 'Aproximação Poisson',
        data: poissonData.slice(0, 50),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: false,
        pointRadius: 2,
        pointHoverRadius: 4,
      });
    }

    if (showNormal && normalData) {
      datasets.push({
        label: 'Aproximação Normal',
        data: normalData.slice(0, 50),
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        fill: false,
        pointRadius: 2,
        pointHoverRadius: 4,
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
      </div>

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
              <li>• <strong>Linha sólida:</strong> Distribuição Binomial (exata)</li>
              <li>• <strong>Linha tracejada:</strong> Aproximação Poisson</li>
              <li>• <strong>Linha pontilhada:</strong> Aproximação Normal</li>
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