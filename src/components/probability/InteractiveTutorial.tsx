import React, { useState, useEffect, useMemo } from 'react';
import { X, ArrowLeft, ArrowRight, HelpCircle, Target } from 'lucide-react';

interface TutorialStep {
  id: string;
  title: string;
  content: string;
  target?: string; // CSS selector do elemento a ser destacado
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  action?: string; // Ação sugerida para o usuário
}

interface InteractiveTutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);

  const tutorialSteps: TutorialStep[] = useMemo(() => [
    {
      id: 'welcome',
      title: '👋 Bem-vindo à Calculadora Binomial!',
      content: 'Este tutorial irá guiá-lo através de todas as funcionalidades da aplicação. Você aprenderá a usar cada ferramenta e entender os conceitos por trás da distribuição binomial.',
      position: 'center'
    },
    {
      id: 'parameters',
      title: '🎛️ Controles de Parâmetros',
      content: 'Aqui você define os parâmetros principais: n (tentativas), p (probabilidade) e k (limite). Estes valores determinam o comportamento da distribuição.',
      target: '[data-tutorial="parameters"]',
      position: 'right',
      action: 'Experimente alterar o valor de n para 50'
    },
    {
      id: 'presets',
      title: '🎯 Casos de Teste',
      content: 'Use estes botões para carregar exemplos pré-configurados. Cada caso representa um problema do mundo real.',
      target: '[data-tutorial="presets"]',
      position: 'right',
      action: 'Clique em "Caso 1" para ver um exemplo prático'
    },
    {
      id: 'results',
      title: '📊 Resultados',
      content: 'Esta seção mostra os cálculos da distribuição binomial exata e suas aproximações. Compare os valores para entender a precisão de cada método.',
      target: '[data-tutorial="results"]',
      position: 'left',
      action: 'Observe como os valores das aproximações se comparam ao valor exato'
    },
    {
      id: 'chart',
      title: '📈 Gráfico de Distribuição',
      content: 'O gráfico visualiza a distribuição de probabilidade. As barras azuis representam P(X ≤ k) e as laranjas P(X > k).',
      target: '[data-tutorial="chart"]',
      position: 'left',
      action: 'Observe como as cores mudam quando você altera o valor de k'
    },
    {
      id: 'legend',
      title: '🏷️ Legenda Interativa',
      content: 'A legenda explica o significado das cores no gráfico. Clique no botão "Explicação" para mais detalhes.',
      target: '[data-tutorial="legend"]',
      position: 'top',
      action: 'Clique em "Explicação" na legenda para ver mais detalhes'
    },
    {
      id: 'advanced',
      title: '🔬 Visualizações Avançadas',
      content: 'Esta seção oferece gráficos adicionais para análise mais profunda, como comparação entre distribuições e função acumulada.',
      target: '[data-tutorial="advanced"]',
      position: 'top',
      action: 'Explore os diferentes tipos de gráfico disponíveis'
    },
    {
      id: 'explainer',
      title: '📚 Explicação Passo-a-Passo',
      content: 'Aqui você encontra uma explicação detalhada e interativa de como calcular a probabilidade binomial, com animações e exemplos.',
      target: '[data-tutorial="explainer"]',
      position: 'top',
      action: 'Use os controles de navegação para seguir a explicação'
    },
    {
      id: 'modals',
      title: '💡 Modais de Ajuda',
      content: 'Clique nos ícones de ajuda (?) ao lado dos parâmetros para obter explicações detalhadas sobre cada conceito.',
      target: '[data-tutorial="help-buttons"]',
      position: 'right',
      action: 'Clique no ícone (?) ao lado de qualquer parâmetro'
    },
    {
      id: 'complete',
      title: '🎉 Tutorial Concluído!',
      content: 'Agora você conhece todas as funcionalidades da aplicação. Continue explorando e experimentando com diferentes parâmetros para aprofundar seu entendimento da distribuição binomial.',
      position: 'center'
    }
  ], []);

  useEffect(() => {
    if (!isOpen) return;

    const step = tutorialSteps[currentStep];
    if (step.target) {
      const element = document.querySelector(step.target) as HTMLElement;
      if (element) {
        setHighlightedElement(element);
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Adicionar classe de destaque
        element.classList.add('tutorial-highlight');
        
        return () => {
          element.classList.remove('tutorial-highlight');
        };
      }
    } else {
      setHighlightedElement(null);
    }
  }, [currentStep, isOpen, tutorialSteps]);

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const closeTutorial = () => {
    if (highlightedElement) {
      highlightedElement.classList.remove('tutorial-highlight');
    }
    setCurrentStep(0);
    onClose();
  };

  if (!isOpen) return null;

  const step = tutorialSteps[currentStep];

  return (
    <>
      {/* Overlay escuro */}
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40" onClick={closeTutorial} />
      
      {/* Spotlight overlay para destacar elementos */}
      {highlightedElement && (
        <div 
          className="fixed inset-0 pointer-events-none z-45"
          style={{
            background: `radial-gradient(circle at ${highlightedElement.offsetLeft + highlightedElement.offsetWidth / 2}px ${highlightedElement.offsetTop + highlightedElement.offsetHeight / 2}px, transparent 150px, rgba(0,0,0,0.6) 250px)`
          }}
        />
      )}

      {/* Modal do tutorial */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="theme-card rounded-xl theme-shadow max-w-lg w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold theme-text">
                Tutorial Interativo
              </h2>
            </div>
            <button
              onClick={closeTutorial}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 theme-text-secondary" />
            </button>
          </div>

          {/* Indicador de progresso */}
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between text-sm theme-text-secondary mb-2">
              <span>Progresso</span>
              <span>{currentStep + 1} de {tutorialSteps.length}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-6">
            <h3 className="text-lg font-semibold theme-text mb-3">
              {step.title}
            </h3>
            
            <p className="theme-text-secondary mb-4 leading-relaxed">
              {step.content}
            </p>

            {step.action && (
              <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg mb-4">
                <Target className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">Ação sugerida:</p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300">{step.action}</p>
                </div>
              </div>
            )}

            {/* Miniatura dos passos */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {tutorialSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStep(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentStep
                      ? 'bg-blue-500'
                      : index < currentStep
                      ? 'bg-blue-300 dark:bg-blue-400'
                      : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'
                  }`}
                  title={`Ir para passo ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Footer com controles */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-4 py-2 theme-text-secondary hover:text-gray-800 dark:hover:text-gray-200 disabled:text-gray-400 dark:disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </button>

            <div className="flex items-center gap-2">
              {currentStep === tutorialSteps.length - 1 ? (
                <button
                  onClick={closeTutorial}
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  Finalizar
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Próximo
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InteractiveTutorial;