import React from 'react';
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
import { BarChart3 } from 'lucide-react';
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
  // Detectar tema atual
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDarkMode ? '#e5e7eb' : '#374151',
        },
      },
      title: {
        display: true,
        text: `Distribuição Binomial (n=${n}, p=${p.toFixed(3)}) — destaque: x > ${k}`,
        color: isDarkMode ? '#f3f4f6' : '#1f2937',
      },
      tooltip: {
        backgroundColor: isDarkMode ? '#374151' : '#ffffff',
        titleColor: isDarkMode ? '#f3f4f6' : '#1f2937',
        bodyColor: isDarkMode ? '#e5e7eb' : '#374151',
        borderColor: isDarkMode ? '#6b7280' : '#e5e7eb',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            const prob = context.parsed.y;
            const xVal = Number(context.label);
            const isGreaterThanK = xVal > k;
            return `P(X=${xVal}) = ${prob.toFixed(6)}${isGreaterThanK ? ' (>k)' : ''}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Probabilidade',
          color: isDarkMode ? '#e5e7eb' : '#374151',
        },
        ticks: {
          color: isDarkMode ? '#d1d5db' : '#6b7280',
        },
        grid: {
          color: isDarkMode ? '#4b5563' : '#e5e7eb',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Valor (x)',
          color: isDarkMode ? '#e5e7eb' : '#374151',
        },
        ticks: {
          color: isDarkMode ? '#d1d5db' : '#6b7280',
        },
        grid: {
          color: isDarkMode ? '#4b5563' : '#e5e7eb',
        },
      },
    },
  };

  return (
    <div className="theme-card rounded-xl theme-shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-xl font-semibold theme-text">Distribuição</h2>
      </div>

      {validInput && chartData ? (
        <div className="h-80">
          <Bar data={chartData} options={chartOptions} />
          {Math.min(n, k + 20, 300) < Math.min(n, k + 20) && (
            <p className="mt-2 text-xs theme-text-secondary">
              Exibindo apenas os primeiros 300 valores de x para desempenho.
            </p>
          )}
        </div>
      ) : (
        <div className="h-80 flex items-center justify-center theme-text-secondary">
          <p>Aguardando parâmetros válidos...</p>
        </div>
      )}

      <ChartLegend k={k} />
    </div>
  );
};

export default DistributionChart;
