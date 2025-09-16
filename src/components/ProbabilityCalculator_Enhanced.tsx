import React from 'react';
import { BookOpen, Calculator, HelpCircle, GraduationCap, Compass } from 'lucide-react';

// Hooks customizados
import { useProbabilityCalculator } from '../hooks/useProbabilityCalculator';
import { useModalState } from '../hooks/useModalState';
import { useTutorial } from '../hooks/useTutorial';

// Componentes existentes
import ParameterControls from './probability/ParameterControls';
import PresetButtons from './probability/PresetButtons';
import ApproximationOptions from './probability/ApproximationOptions';
import ResultsDisplay from './probability/ResultsDisplay';
import DistributionChart from './probability/DistributionChart';
import ExplanationModal from './probability/ExplanationModal';

// Novos componentes didáticos
import AdditionalCharts from './probability/AdditionalCharts';
import BinomialExplainer from './probability/BinomialExplainer';
import InteractiveTutorial from './probability/InteractiveTutorial';
import Glossary from './probability/Glossary';
import ThemeToggle from './ui/ThemeToggle';

const ProbabilityCalculatorEnhanced: React.FC = () => {
  // Hooks para gerenciar estado
  const calculator = useProbabilityCalculator();
  const modal = useModalState();
  const tutorial = useTutorial();
  const [showGlossary, setShowGlossary] = React.useState(false);

  // Preparar dados para os gráficos avançados
  const getDistributionArrays = () => {
    if (!calculator.validInput) return { binomialData: [], poissonData: [], normalData: [] };

    const maxX = Math.min(calculator.n + 1, 100);
    const binomialData: number[] = [];
    
    // Gerar dados da distribuição binomial
    for (let x = 0; x < maxX; x++) {
      const coeff = factorial(calculator.n) / (factorial(x) * factorial(calculator.n - x));
      const prob = coeff * Math.pow(calculator.p, x) * Math.pow(1 - calculator.p, calculator.n - x);
      binomialData.push(isFinite(prob) ? prob : 0);
    }

    // Dados das aproximações (simplificado para demonstração)
    const poissonData = calculator.showPoisson ? binomialData.map((_, i) => {
      const lambda = calculator.n * calculator.p;
      return Math.pow(lambda, i) * Math.exp(-lambda) / factorial(i);
    }) : undefined;

    const normalData = calculator.showNormal ? binomialData.map((_, i) => {
      const mu = calculator.n * calculator.p;
      const sigma = Math.sqrt(calculator.n * calculator.p * (1 - calculator.p));
      return Math.exp(-0.5 * Math.pow((i - mu) / sigma, 2)) / (sigma * Math.sqrt(2 * Math.PI));
    }) : undefined;

    return { binomialData, poissonData, normalData };
  };

  const factorial = (n: number): number => {
    if (n <= 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const { binomialData, poissonData, normalData } = getDistributionArrays();

  return (
    <div className="min-h-screen theme-bg-gradient transition-all duration-300 overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-8">
        {/* Header com Toggle de Tema */}
        <div className="flex items-start justify-between mb-6 sm:mb-8">
          <div className="flex-1" />
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>

        {/* Header Melhorado */}
        <div className="text-center mb-6 lg:mb-8 w-full">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold theme-text mb-2 px-2 sm:px-0">
            Calculadora Didática de Probabilidade Binomial
          </h1>
          <p className="text-sm sm:text-base lg:text-lg theme-text-secondary max-w-3xl mx-auto px-4 sm:px-2">
            Descubra a probabilidade de ocorrer mais de <strong>k</strong> "sucessos" em
            <strong> n</strong> tentativas, comparando o cálculo <strong>Binomial exato </strong>
            com as aproximações <strong>Poisson</strong> e <strong>Normal</strong>.
          </p>

          {/* Seção de Teoria Interativa Expandida */}
          <div className="mt-4 lg:mt-6 flex flex-wrap justify-center gap-2 lg:gap-3 px-4 sm:px-2 w-full overflow-x-auto">
            <button
              onClick={tutorial.openTutorial}
              className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm lg:text-base whitespace-nowrap"
            >
              <Compass className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
              Tour Guiado
            </button>
            <button
              onClick={() => setShowGlossary(true)}
              className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors font-medium text-sm lg:text-base whitespace-nowrap"
            >
              <GraduationCap className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
              Glossário
            </button>
            <button
              onClick={() => modal.openModal('history')}
              className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm lg:text-base whitespace-nowrap"
            >
              <BookOpen className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
              História
            </button>
            <button
              onClick={() => modal.openModal('manual_calc')}
              className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg transition-colors text-sm lg:text-base whitespace-nowrap"
            >
              <Calculator className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
              Cálculo Manual
            </button>
            <button
              onClick={() => modal.openModal('faq')}
              className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg transition-colors text-sm lg:text-base whitespace-nowrap"
            >
              <HelpCircle className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
              FAQ
            </button>
          </div>

          <p className="mt-3 lg:mt-4 text-sm lg:text-base theme-text-secondary max-w-2xl mx-auto bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mx-4 sm:mx-2 lg:mx-auto">
            Exemplo: uma fábrica produz <strong>2 %</strong> de peças defeituosas.
            Em um lote de <strong>100</strong> peças, qual a probabilidade de encontrar
            <strong> mais de 5 defeituosas</strong>?
            (n=100, p=0.02, k=5 — selecione "Caso 1" abaixo.)
          </p>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 p-3 lg:p-4 mb-6 lg:mb-8 rounded-r-lg text-sm theme-text mx-2 sm:mx-0 w-full max-w-full overflow-hidden">
          <p className="font-semibold mb-1">💡 Como usar esta aplicação didática:</p>
          <ul className="list-disc list-inside space-y-1 text-xs lg:text-sm">
            <li>Comece com o <strong>Tour Guiado</strong> para conhecer todas as funcionalidades</li>
            <li>Escolha um dos <strong>Cenários Práticos</strong> para ver exemplos reais</li>
            <li>Ajuste os parâmetros (<strong>n</strong>, <strong>p</strong>, <strong>k</strong>) e veja mudanças em tempo real</li>
            <li className="hidden md:list-item">Explore as <strong>Visualizações Avançadas</strong> e a <strong>Explicação Passo-a-Passo</strong></li>
            <li>Consulte o <strong>Glossário</strong> para entender os conceitos matemáticos</li>
            <li>Use os ícones (?) para obter ajuda contextual sobre cada elemento</li>
          </ul>
        </div>

        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-full overflow-hidden">
          {/* Left Column - Controls */}
          <div className="space-y-4 lg:space-y-6 w-full min-w-0">
            {/* Presets - Movido para o topo para melhor UX */}
            <div data-tutorial="presets" className="w-full">
              <PresetButtons onApplyPreset={calculator.applyPreset} />
            </div>

            {/* Parameter Controls - Agora abaixo para ajuste em tempo real */}
            <div data-tutorial="parameters" className="w-full">
              <ParameterControls
                n={calculator.n}
                p={calculator.p}
                k={calculator.k}
                onNChange={calculator.setN}
                onPChange={calculator.setP}
                onKChange={calculator.setK}
                onOpenModal={modal.openModal}
              />
            </div>

            {/* Approximation Options */}
            <div className="w-full">
              <ApproximationOptions
                showPoisson={calculator.showPoisson}
                showNormal={calculator.showNormal}
                onShowPoissonChange={calculator.setShowPoisson}
                onShowNormalChange={calculator.setShowNormal}
              />
            </div>
          </div>

          {/* Right Column - Results and Chart */}
          <div className="space-y-4 lg:space-y-6 w-full min-w-0">
            {/* Results - Always visible for mobile */}
            <div data-tutorial="results" className="w-full">
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
            </div>

            {/* Chart with Legend - Hidden on mobile, visible on medium screens and up */}
            <div data-tutorial="chart" className="hidden md:block w-full">
              <DistributionChart
                validInput={calculator.validInput}
                chartData={calculator.chartData}
                n={calculator.n}
                p={calculator.p}
                k={calculator.k}
              />
            </div>
            
            {/* Mobile Chart Notice - Only visible on small screens */}
            <div className="md:hidden w-full">
              <div className="theme-card rounded-lg p-4 text-center theme-shadow border theme-border">
                <div className="text-3xl mb-2">📱</div>
                <h3 className="font-semibold theme-text mb-2">Gráficos disponíveis no desktop</h3>
                <p className="text-sm theme-text-secondary">
                  Para uma melhor experiência com visualizações e gráficos interativos, 
                  acesse este site em uma tela maior (tablet ou desktop).
                </p>
                <p className="text-xs theme-text-secondary mt-2">
                  Os resultados numéricos estão totalmente funcionais no mobile! 📊
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Advanced Components - Hidden on mobile */}
        <div className="mt-6 lg:mt-8 space-y-6 lg:space-y-8 w-full max-w-full overflow-hidden">
          {/* Explicação Passo-a-Passo - Always visible but optimized for mobile */}
          <div data-tutorial="explainer" className="w-full">
            <BinomialExplainer
              n={calculator.n}
              p={calculator.p}
              k={calculator.k}
            />
          </div>

          {/* Visualizações Avançadas - Hidden on mobile, visible on large screens */}
          <div data-tutorial="advanced" className="hidden lg:block w-full">
            <AdditionalCharts
              validInput={calculator.validInput}
              n={calculator.n}
              p={calculator.p}
              showPoisson={calculator.showPoisson}
              showNormal={calculator.showNormal}
              binomialData={binomialData}
              poissonData={poissonData}
              normalData={normalData}
            />
          </div>
          
          {/* Mobile Advanced Charts Notice */}
          <div className="lg:hidden w-full">
            <div className="theme-card rounded-lg p-4 text-center theme-shadow border theme-border">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-semibold theme-text mb-2">Visualizações Avançadas</h3>
              <p className="text-sm theme-text-secondary">
                Gráficos comparativos detalhados, histogramas e análises visuais 
                estão disponíveis na versão desktop para melhor experiência.
              </p>
              <p className="text-xs theme-text-secondary mt-2">
                Todos os cálculos e explicações estão funcionais! 🧮
              </p>
            </div>
          </div>
        </div>

        <footer className="mt-8 lg:mt-12 text-center theme-text-secondary text-sm max-w-4xl mx-auto px-4 sm:px-2 lg:px-0 w-full">
          <div className="theme-card rounded-lg p-4 lg:p-6 theme-shadow border theme-border w-full max-w-full overflow-hidden">
            <p className="mb-3 lg:mb-4 text-xs lg:text-sm">
              <strong>📚 Esta aplicação didática</strong> ilustra conceitos fundamentais de estatística através de um problema clássico:
              contar "sucessos" em tentativas independentes. Use todas as ferramentas disponíveis para
              aprofundar sua compreensão da distribuição binomial e suas aproximações.
            </p>
            <div className="flex flex-wrap justify-center gap-2 lg:gap-4 text-xs theme-text-secondary">
              <span className="whitespace-nowrap">🎯 Casos práticos reais</span>
              <span className="whitespace-nowrap">📊 Múltiplas visualizações</span>
              <span className="whitespace-nowrap">🧮 Cálculos detalhados</span>
              <span className="whitespace-nowrap">📖 Glossário completo</span>
              <span className="whitespace-nowrap">🎓 Tutorial interativo</span>
              <span className="whitespace-nowrap">🌙 Modo escuro/claro</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Modals */}
      <ExplanationModal
        isOpen={modal.modalState.isOpen}
        onClose={modal.closeModal}
        type={modal.modalState.type}
      />

      <InteractiveTutorial
        isOpen={tutorial.isOpen}
        onClose={tutorial.closeTutorial}
      />

      <Glossary
        isOpen={showGlossary}
        onClose={() => setShowGlossary(false)}
      />
    </div>
  );
};

export default ProbabilityCalculatorEnhanced;