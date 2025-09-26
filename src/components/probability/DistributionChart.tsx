import React, { useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { BarChart3, Target, Eye, Info, Maximize2 } from 'lucide-react';
import type { ChartOptions, ChartData } from 'chart.js';
import ChartLegend from './ChartLegend';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DistributionChartProps {
  validInput: boolean;
  chartData: ChartData<'bar'> | null;
  n: number;
  p: number;
  k: number;
}

const DistributionChart: React.FC<DistributionChartProps> = ({
  validInput,
  chartData,
  n,
  p,
  k,
}) => {
  // Estados para melhorias visuais
  const [showStatistics, setShowStatistics] = useState(false);
  const [highlightMode, setHighlightMode] = useState<'normal' | 'focus' | 'comparison'>('normal');
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Detectar tema atual
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  // Calcular estatísticas da distribuição
  const distributionStats = useMemo(() => {
    if (!chartData || !validInput) return null;
    
    const probabilities = chartData.datasets[0].data as number[];
    const mean = n * p;
    const variance = n * p * (1 - p);
    const stdDev = Math.sqrt(variance);
    
    // Encontrar o valor mais provável (moda)
    let maxProb = 0;
    let mode = 0;
    probabilities.forEach((prob, index) => {
      if (prob > maxProb) {
        maxProb = prob;
        mode = index;
      }
    });
    
    // Calcular probabilidade acumulada até k
    const cumulativeUpToK = probabilities.slice(0, k + 1).reduce((sum, prob) => sum + prob, 0);
    const probabilityOverK = 1 - cumulativeUpToK;
    
    return {
      mean: mean.toFixed(2),
      stdDev: stdDev.toFixed(2),
      mode,
      maxProb: maxProb.toFixed(6),
      cumulativeUpToK: (cumulativeUpToK * 100).toFixed(2),
      probabilityOverK: (probabilityOverK * 100).toFixed(4)
    };
  }, [chartData, validInput, n, p, k]);
  
  // Modificar dados do gráfico baseado no modo de destaque
  const processedChartData = useMemo(() => {
    if (!chartData) return null;
    
    if (highlightMode === 'focus') {
      // No modo focus, vamos criar uma visualização mais clara da área de interesse
      const focusedData = { ...chartData };
      focusedData.datasets = chartData.datasets.map(dataset => {
        const newDataset = { ...dataset };
        
        // Adicionar um dataset extra para destacar a área de cálculo
        const backgroundColors: (string | CanvasGradient)[] = [];
        const borderColors: string[] = [];
        
        (dataset.data as number[]).forEach((_, index) => {
          const isTargetArea = index > k;
          if (isTargetArea) {
            // Área de interesse: cores mais vibrantes e destacadas
            backgroundColors.push(index === k + 1 ? 'rgba(255, 165, 0, 0.8)' : 'rgba(255, 140, 0, 0.7)'); // Laranja vibrante
            borderColors.push(index === k + 1 ? 'rgba(255, 140, 0, 1)' : 'rgba(255, 100, 0, 1)'); // Borda laranja
          } else {
            // Área NÃO interessante: cores muito sutis mas ainda visíveis
            backgroundColors.push('rgba(59, 130, 246, 0.15)'); // Azul muito claro
            borderColors.push('rgba(59, 130, 246, 0.4)'); // Borda azul clara
          }
        });
        
        newDataset.backgroundColor = backgroundColors;
        newDataset.borderColor = borderColors;
        newDataset.borderWidth = (dataset.data as number[]).map((_, index) => index > k ? 3 : 1);
        
        return newDataset;
      });
      
      return focusedData;
    }
    
    return chartData;
  }, [chartData, highlightMode, k]);

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDarkMode ? '#e5e7eb' : '#374151',
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            weight: 'bold'
          }
        },
      },
      title: {
        display: true,
        text: highlightMode === 'focus' 
          ? [
              `🎯 MODO FOCO: Calculando P(X > ${k})`,
              `Área LARANJA = nossa resposta | Área azul = não conta no cálculo`
            ]
          : [
              `📊 Distribuição Binomial: B(${n}, ${p.toFixed(3)})`,
              `🎯 Destacando valores > ${k} (nossa área de interesse)`
            ],
        color: isDarkMode ? '#f3f4f6' : '#1f2937',
        font: {
          size: highlightMode === 'focus' ? 13 : 14,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
        titleColor: isDarkMode ? '#f3f4f6' : '#1f2937',
        bodyColor: isDarkMode ? '#e5e7eb' : '#374151',
        borderColor: isDarkMode ? '#6b7280' : '#e5e7eb',
        borderWidth: 2,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          size: 13,
          weight: 'bold'
        },
        bodyFont: {
          size: 12
        },
        callbacks: {
          title: function(context) {
            const xVal = Number(context[0].label);
            return `X = ${xVal}`;
          },
          label: function(context) {
            const prob = context.parsed.y;
            const xVal = Number(context.label);
            const percentage = (prob * 100).toFixed(4);
            const isTarget = xVal > k;
            
            if (highlightMode === 'focus') {
              return [
                `P(X = ${xVal}) = ${prob.toFixed(6)} (${percentage}%)`,
                isTarget 
                  ? '🎯 ESTA BARRA FAZ PARTE DO CÁLCULO!' 
                  : '❌ Esta barra NÃO entra no cálculo'
              ];
            }
            
            return [
              `Probabilidade: ${prob.toFixed(6)} (${percentage}%)`,
              isTarget ? '🎯 Faz parte do nosso cálculo!' : '📊 Não faz parte do cálculo'
            ];
          },
          afterLabel: function(context) {
            const xVal = Number(context.label);
            const messages = [];
            
            if (distributionStats && xVal === distributionStats.mode) {
              messages.push('⭐ Este é o valor mais provável (moda)!');
            }
            
            if (highlightMode === 'focus') {
              const isTarget = xVal > k;
              if (isTarget) {
                messages.push('🔍 ÁREA FOCADA: Faz parte do cálculo');
              } else {
                messages.push('🔍 Área desfocada (não relevante)');
              }
            }
            
            return messages;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '📈 Probabilidade P(X = x)',
          color: isDarkMode ? '#e5e7eb' : '#374151',
          font: {
            size: 13,
            weight: 'bold'
          }
        },
        ticks: {
          color: isDarkMode ? '#d1d5db' : '#6b7280',
          font: {
            size: 11
          },
          callback: function(value) {
            return (Number(value) * 100).toFixed(2) + '%';
          }
        },
        grid: {
          color: isDarkMode ? '#374151' : '#f3f4f6',
          lineWidth: 1,
        },
      },
      x: {
        title: {
          display: true,
          text: '🎲 Número de Sucessos (X)',
          color: isDarkMode ? '#e5e7eb' : '#374151',
          font: {
            size: 13,
            weight: 'bold'
          }
        },
        ticks: {
          color: isDarkMode ? '#d1d5db' : '#6b7280',
          font: {
            size: 11
          },
          callback: function(value) {
            const xVal = Number(value);
            if (xVal === k) return `${xVal} (limite)`;
            if (distributionStats && xVal === parseInt(distributionStats.mode.toString())) {
              return `${xVal} (moda)`;
            }
            return xVal.toString();
          }
        },
        grid: {
          color: isDarkMode ? '#374151' : '#f3f4f6',
          lineWidth: 1,
        },
      },
    },
    onHover: (event, elements) => {
      const canvas = event.native?.target as HTMLCanvasElement;
      if (canvas && elements.length > 0) {
        canvas.style.cursor = 'pointer';
      } else if (canvas) {
        canvas.style.cursor = 'default';
      }
    }
  };

  return (
    <div className="theme-card rounded-xl theme-shadow p-6">
      {/* Header com controles melhorados */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold theme-text">Distribuição da Probabilidade</h2>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Controles de visualização */}
          <button
            onClick={() => setHighlightMode(highlightMode === 'normal' ? 'focus' : 'normal')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              highlightMode === 'focus' 
                ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            title="Destacar área de interesse"
          >
            <Target className="w-4 h-4" />
            Focar
          </button>
          
          <button
            onClick={() => setShowStatistics(!showStatistics)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              showStatistics 
                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            title="Mostrar estatísticas detalhadas"
          >
            <Info className="w-4 h-4" />
            Stats
          </button>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
            title="Expandir gráfico"
          >
            <Maximize2 className="w-820 h-8" />
            {isExpanded ? 'Compactar' : 'Expandir'}
          </button>
        </div>
      </div>

      {/* Painel de estatísticas detalhadas */}
      {showStatistics && distributionStats && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">📊 Média (μ)</div>
            <div className="text-lg font-bold text-blue-900 dark:text-blue-100">{distributionStats.mean}</div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">📏 Desvio Padrão (σ)</div>
            <div className="text-lg font-bold text-purple-900 dark:text-purple-100">{distributionStats.stdDev}</div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-xs text-green-600 dark:text-green-400 font-medium">⭐ Moda</div>
            <div className="text-lg font-bold text-green-900 dark:text-green-100">
              {distributionStats.mode} ({(parseFloat(distributionStats.maxProb) * 100).toFixed(2)}%)
            </div>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="text-xs text-orange-600 dark:text-orange-400 font-medium">🎯 P(X {'>'} {k})</div>
            <div className="text-lg font-bold text-orange-900 dark:text-orange-100">{distributionStats.probabilityOverK}%</div>
          </div>
        </div>
      )}

      {/* Explicação do modo focus */}
      {highlightMode === 'focus' && validInput && processedChartData && (
        <div className="mb-4 p-4 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 rounded-r-lg">
          <div className="flex items-start gap-2">
            <Target className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
                🎯 Modo Foco Ativo - Entenda o Cálculo!
              </h4>
              <div className="text-sm text-orange-800 dark:text-orange-200 space-y-2">
                <p>
                  <strong>Estamos calculando:</strong> P(X {'>'} {k}) = probabilidade de ter MAIS de {k} sucessos
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span className="text-xs">Barras LARANJAS = entram no cálculo (X {'>'} {k})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-300 rounded opacity-40"></div>
                    <span className="text-xs">Barras azuis claras = NÃO entram (X ≤ {k})</span>
                  </div>
                </div>
                <p className="text-xs mt-2 font-medium">
                  💡 A soma de todas as barras laranjas = {distributionStats?.probabilityOverK}% (nosso resultado!)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {validInput && processedChartData ? (
        <div className={`${isExpanded ? 'h-96' : 'h-80'} transition-all duration-300`}>
          <Bar data={processedChartData} options={chartOptions} />
          {Math.min(n, k + 20, 300) < Math.min(n, k + 20) && (
            <p className="mt-2 text-xs theme-text-secondary flex items-center gap-1">
              <Eye className="w-3 h-3" />
              Exibindo apenas os primeiros 300 valores de x para otimização.
            </p>
          )}
        </div>
      ) : (
        <div className={`${isExpanded ? 'h-96' : 'h-80'} flex items-center justify-center theme-text-secondary`}>
          <div className="text-center">
            <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Aguardando parâmetros válidos...</p>
            <p className="text-xs mt-1">Ajuste n, p e k para visualizar a distribuição</p>
          </div>
        </div>
      )}

      <ChartLegend k={k} />
    </div>
  );
};

export default DistributionChart;
