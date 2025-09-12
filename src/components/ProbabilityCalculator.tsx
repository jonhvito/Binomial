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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Calculadora de Probabilidade Binomial
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descubra a probabilidade de ocorrer mais de <strong>k</strong> "sucessos" em
            <strong> n</strong> tentativas, comparando o cálculo <strong>Binomial exato </strong>
            com as aproximações <strong>Poisson</strong> e <strong>Normal</strong>.
          </p>

          {/* Seção de Teoria Interativa */}
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => modal.openModal('history')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              História
            </button>
            <button
              onClick={() => modal.openModal('manual_calc')}
              className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
            >
              <Calculator className="w-4 h-4" />
              Cálculo Manual
            </button>
            <button
              onClick={() => modal.openModal('faq')}
              className="flex items-center gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              FAQ
            </button>
          </div>

          <p className="mt-4 text-base text-gray-700 max-w-2xl mx-auto bg-blue-50 border border-blue-200 rounded-lg p-3">
            Exemplo: uma fábrica produz <strong>2 %</strong> de peças defeituosas.
            Em um lote de <strong>100</strong> peças, qual a probabilidade de encontrar
            <strong> mais de 5 defeituosas</strong>?
            (n=100, p=0.02, k=5 — selecione "Caso 1" abaixo.)
          </p>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg text-sm text-gray-800">
          <p className="font-semibold mb-1">Como usar:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Ajuste o número de tentativas (<strong>n</strong>), a probabilidade de sucesso (<strong>p</strong>) e o limite superior (<strong>k</strong>).</li>
            <li>Clique em um dos <strong>Casos de Teste</strong> para ver exemplos prontos.</li>
            <li>Compare o valor exato da Binomial com as aproximações Poisson e Normal.</li>
            <li>A seção "Distribuição" mostra a probabilidade de cada quantidade possível de sucessos.</li>
          </ul>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            {/* Parameter Controls */}
            <ParameterControls
              n={calculator.n}
              p={calculator.p}
              k={calculator.k}
              onNChange={calculator.setN}
              onPChange={calculator.setP}
              onKChange={calculator.setK}
              onOpenModal={modal.openModal}
            />

            {/* Presets */}
            <PresetButtons onApplyPreset={calculator.applyPreset} />

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

        <footer className="mt-12 text-center text-gray-600 text-sm max-w-3xl mx-auto">
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
