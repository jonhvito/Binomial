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
  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Distribuição Binomial (n=${n}, p=${p.toFixed(3)}) — destaque: x > ${k}`,
      },
      tooltip: {
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
        },
      },
      x: {
        title: {
          display: true,
          text: 'Valor (x)',
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Distribuição</h2>
      </div>

      {validInput && chartData ? (
        <div className="h-80">
          <Bar data={chartData} options={chartOptions} />
          {Math.min(n, k + 20, 300) < Math.min(n, k + 20) && (
            <p className="mt-2 text-xs text-gray-500">
              Exibindo apenas os primeiros 300 valores de x para desempenho.
            </p>
          )}
        </div>
      ) : (
        <div className="h-80 flex items-center justify-center text-gray-500">
          <p>Aguardando parâmetros válidos...</p>
        </div>
      )}

      <div className="mt-4 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-gray-600">barras: x ≤ k</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span className="text-gray-600">barras: x &gt; k</span>
        </div>
      </div>
    </div>
  );
};

export default DistributionChart;
