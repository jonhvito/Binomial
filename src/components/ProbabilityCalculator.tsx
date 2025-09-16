import React from 'react';
import { BookOpen, Calculator, HelpCircle } from 'lucide-react';

// Hooks customizados
import { useProbabilityCalculator } from '../hooks/useProbabilityCalculator';
import { useModalState } from '../hooks/useModalState';

// Componentes modulares
import ParameterControls from './probability/ParameterControls';
import PresetButtons from './probability/PresetButtons';
import ApproximationOptions from './probability/ApproximationOptions';
import ResultsDisplay from './probability/ResultsDisplay';
import DistributionChart from './probability/DistributionChart';
import ExplanationModal from './probability/ExplanationModal';

const ProbabilityCalculator: React.FC = () => {
  // Hooks para gerenciar estado
  const calculator = useProbabilityCalculator();
  const modal = useModalState();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold theme-text mb-2">
            Calculadora de Probabilidade Binomial
          </h1>
          <p className="text-lg theme-text-secondary max-w-3xl mx-auto">
            Descubra a probabilidade de ocorrer mais de <strong>k</strong> "sucessos" em
            <strong> n</strong> tentativas, comparando o cálculo <strong>Binomial exato </strong>
            com as aproximações <strong>Poisson</strong> e <strong>Normal</strong>.
          </p>

          {/* Seção de Teoria Interativa */}
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => modal.openModal('history')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-800/50 text-blue-700 dark:text-blue-300 rounded-lg transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              História
            </button>
            <button
              onClick={() => modal.openModal('manual_calc')}
              className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/50 hover:bg-green-200 dark:hover:bg-green-800/50 text-green-700 dark:text-green-300 rounded-lg transition-colors"
            >
              <Calculator className="w-4 h-4" />
              Cálculo Manual
            </button>
            <button
              onClick={() => modal.openModal('faq')}
              className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/50 hover:bg-purple-200 dark:hover:bg-purple-800/50 text-purple-700 dark:text-purple-300 rounded-lg transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              FAQ
            </button>
          </div>

          <p className="mt-4 text-base theme-text-secondary max-w-2xl mx-auto bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
            Exemplo: uma fábrica produz <strong>2 %</strong> de peças defeituosas.
            Em um lote de <strong>100</strong> peças, qual a probabilidade de encontrar
            <strong> mais de 5 defeituosas</strong>?
            (n=100, p=0.02, k=5 — selecione "Caso 1" abaixo.)
          </p>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 mb-8 rounded-r-lg text-sm theme-text">
          <p className="font-semibold mb-1">Como usar:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Comece clicando em um dos <strong>Cenários Práticos</strong> para ver exemplos prontos.</li>
            <li>Depois ajuste os parâmetros (<strong>n</strong>, <strong>p</strong>, <strong>k</strong>) e veja o gráfico mudar em tempo real.</li>
            <li>Compare o valor exato da Binomial com as aproximações Poisson e Normal.</li>
            <li>A seção "Distribuição" mostra a probabilidade de cada quantidade possível de sucessos.</li>
          </ul>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            {/* Presets - Movido para o topo para melhor UX */}
            <PresetButtons onApplyPreset={calculator.applyPreset} />

            {/* Parameter Controls - Agora abaixo para ajuste em tempo real */}
            <ParameterControls
              n={calculator.n}
              p={calculator.p}
              k={calculator.k}
              onNChange={calculator.setN}
              onPChange={calculator.setP}
              onKChange={calculator.setK}
              onOpenModal={modal.openModal}
            />

            {/* Approximation Options */}
            <ApproximationOptions
              showPoisson={calculator.showPoisson}
              showNormal={calculator.showNormal}
              onShowPoissonChange={calculator.setShowPoisson}
              onShowNormalChange={calculator.setShowNormal}
            />
          </div>

          {/* Right Column - Results and Chart */}
          <div className="space-y-6">
            {/* Results */}
            <ResultsDisplay
              validInput={calculator.validInput}
              validationErrors={calculator.validationErrors}
              results={calculator.results}
              showPoisson={calculator.showPoisson}
              showNormal={calculator.showNormal}
              k={calculator.k}
              onOpenModal={modal.openModal}
              smartTips={calculator.smartTips}
            />

            {/* Chart */}
            <DistributionChart
              validInput={calculator.validInput}
              chartData={calculator.chartData}
              n={calculator.n}
              p={calculator.p}
              k={calculator.k}
            />
          </div>
        </div>

        <footer className="mt-12 text-center theme-text-secondary text-sm max-w-3xl mx-auto">
          <p>
            Esta aplicação ilustra um problema clássico de controle de qualidade:
            contar "sucessos" (por exemplo, peças defeituosas) em um número fixo de
            tentativas independentes. Use para entender como a distribuição Binomial
            funciona e como as aproximações Poisson e Normal se comportam.
          </p>
        </footer>
      </div>

      {/* Modal de Explicações */}
      <ExplanationModal
        isOpen={modal.modalState.isOpen}
        onClose={modal.closeModal}
        type={modal.modalState.type}
      />
    </div>
  );
};

export default ProbabilityCalculator;
