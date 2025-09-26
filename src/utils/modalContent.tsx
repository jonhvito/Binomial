/**
 * Conteúdo dos modais explicativos
 */

import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export type ModalType = 'n' | 'p' | 'k' | 'binomial' | 'poisson' | 'normal' | 'history' | 'manual_calc' | 'faq';

export const getModalContent = (type: ModalType): React.ReactNode => {
  switch (type) {
    case 'n':
      return (
        <div className="space-y-4">
          <p className="theme-text-secondary">
            <strong>Número de tentativas (n)</strong> representa o tamanho da amostra ou o número total de experimentos independentes que serão realizados.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Exemplos:</h4>
            <ul className="list-disc list-inside text-blue-800 dark:text-blue-200 space-y-1">
              <li>100 peças em um lote de produção</li>
              <li>20 chutes a gol em uma partida</li>
              <li>50 alunos em uma turma</li>
            </ul>
          </div>
          <p className="text-sm theme-text-secondary">
            Quanto maior o n, mais confiável será a distribuição binomial.
          </p>
        </div>
      );

    case 'p':
      return (
        <div className="space-y-4">
          <p className="theme-text-secondary">
            <strong>Probabilidade de sucesso (p)</strong> é a chance de ocorrência do evento de interesse em cada tentativa independente.
          </p>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Exemplos:</h4>
            <ul className="list-disc list-inside text-green-800 dark:text-green-200 space-y-1">
              <li>0.02 (2%) = probabilidade de uma peça ser defeituosa</li>
              <li>0.30 (30%) = probabilidade de um chute resultar em gol</li>
              <li>0.85 (85%) = probabilidade de um aluno passar no exame</li>
            </ul>
          </div>
          <p className="text-sm theme-text-secondary">
            Deve estar entre 0 e 1. Valores próximos de 0 ou 1 indicam distribuições assimétricas.
          </p>
        </div>
      );

    case 'k':
      return (
        <div className="space-y-4">
          <p className="theme-text-secondary">
            <strong>Limite superior (k)</strong> define o valor limite para calcular P(X &gt; k) - a probabilidade de obter mais de k sucessos.
          </p>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Interpretação:</h4>
            <p className="text-purple-800 dark:text-purple-200">
              Se k = 5, estamos calculando a probabilidade de obter 6 ou mais sucessos.
            </p>
          </div>
          <p className="text-sm theme-text-secondary">
            Deve ser menor ou igual a n. Valores baixos de k indicam eventos raros.
          </p>
        </div>
      );

    case 'binomial':
      return (
        <div className="space-y-4">
          <p className="theme-text-secondary">
            <strong>Distribuição Binomial</strong> modela o número de sucessos em n tentativas independentes, cada uma com probabilidade p de sucesso.
          </p>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">Fórmula:</h4>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded border">
              <BlockMath math="P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}" />
            </div>
            <p className="text-indigo-800 dark:text-indigo-200 mt-2">
              Onde <InlineMath math="\binom{n}{k}" /> é o coeficiente binomial "n escolhe k"
            </p>
          </div>
          <p className="text-sm theme-text-secondary">
            É exata quando as condições são atendidas, mas pode ser computacionalmente intensiva para grandes n.
          </p>
        </div>
      );

    case 'poisson':
      return (
        <div className="space-y-4">
          <p className="theme-text-secondary">
            <strong>Aproximação Poisson</strong> é usada quando n é grande e p é pequeno, fazendo λ = n×p pequeno.
          </p>
          <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-teal-900 dark:text-teal-100 mb-2">Fórmula:</h4>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded border">
              <BlockMath math="P(X = k) \approx \frac{e^{-\lambda} \lambda^k}{k!}" />
            </div>
            <p className="text-teal-800 dark:text-teal-200 mt-2">
              Onde <InlineMath math="\lambda = n \times p" /> é o parâmetro da distribuição
            </p>
          </div>
          <p className="text-sm theme-text-secondary">
            Recomendada quando λ &lt; 10. É útil para modelar eventos raros.
          </p>
        </div>
      );

    case 'normal':
      return (
        <div className="space-y-4">
          <p className="theme-text-secondary">
            <strong>Aproximação Normal</strong> é válida quando n×p ≥ 10 e n×(1-p) ≥ 10.
          </p>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Parâmetros:</h4>
            <div className="text-orange-800 dark:text-orange-200">
              <p>Média: <InlineMath math="\mu = n \times p" /></p>
              <p>Desvio padrão: <InlineMath math="\sigma = \sqrt{n \times p \times (1-p)}" /></p>
            </div>
          </div>
          <p className="text-sm theme-text-secondary">
            Usa correção de continuidade para melhor precisão com variáveis discretas.
          </p>
        </div>
      );

    case 'history':
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-600 dark:text-blue-400">📚</span>
            <h4 className="font-semibold theme-text">História (Binomial & Aproximações)</h4>
          </div>
          <div className="space-y-3">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-medium text-blue-700 dark:text-blue-300">1713 — Jakob Bernoulli</p>
              <p className="text-blue-600 dark:text-blue-200 text-sm">
                <em>Ars Conjectandi</em>: ensaios de Bernoulli (sucesso/fracasso) e fundamentos da binomial.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-medium text-green-700 dark:text-green-300">1733 — Abraham de Moivre</p>
              <p className="text-green-600 dark:text-green-200 text-sm">
                Aproximação normal da binomial para <em>n</em> grande (moedas).
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <p className="font-medium text-purple-700 dark:text-purple-300">1812 — Pierre-Simon Laplace</p>
              <p className="text-purple-600 dark:text-purple-200 text-sm">
                Generalização (qualquer <em>p</em>), método de Laplace (CLT/De Moivre–Laplace).
              </p>
            </div>
            <div className="border-l-4 border-teal-500 pl-4">
              <p className="font-medium text-teal-700 dark:text-teal-300">1837 — Siméon Denis Poisson</p>
              <p className="text-teal-600 dark:text-teal-200 text-sm">
                Distribuição de Poisson como limite/aproximação da binomial (eventos raros).
              </p>
            </div>
          </div>
          <p className="text-sm theme-text-secondary mt-4">
            Controle de qualidade é uma aplicação moderna dessas ideias (binomial exata, Poisson e Normal).
          </p>
        </div>
      );

    case 'manual_calc':
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-600 dark:text-blue-400">🧮</span>
            <h4 className="font-semibold theme-text">Cálculo Manual Passo-a-Passo</h4>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h5 className="font-medium theme-text mb-2">Exemplo: n=5, p=0.3, k=2</h5>
              <p className="theme-text-secondary mb-2">Calcular P(X &gt; 2) = P(X=3) + P(X=4) + P(X=5)</p>

              <div className="space-y-2 text-sm">
                <p><strong>Passo 1:</strong> Calcular coeficientes binomiais</p>
                <p><InlineMath math="C(5,3) = \frac{5!}{3! \times 2!} = 10" /></p>
                <p><InlineMath math="C(5,4) = \frac{5!}{4! \times 1!} = 5" /></p>
                <p><InlineMath math="C(5,5) = \frac{5!}{5! \times 0!} = 1" /></p>

                <p className="mt-3"><strong>Passo 2:</strong> Calcular probabilidades</p>
                <p><InlineMath math="P(X=3) = 10 \times (0.3)^3 \times (0.7)^2 = 10 \times 0.027 \times 0.49 = 0.1323" /></p>
                <p><InlineMath math="P(X=4) = 5 \times (0.3)^4 \times (0.7)^1 = 5 \times 0.0081 \times 0.7 = 0.02835" /></p>
                <p><InlineMath math="P(X=5) = 1 \times (0.3)^5 \times (0.7)^0 = 1 \times 0.00243 \times 1 = 0.00243" /></p>

                <p className="mt-3"><strong>Passo 3:</strong> Somar probabilidades</p>
                <p><InlineMath math="P(X>2) = 0.1323 + 0.02835 + 0.00243 = 0.16308" /></p>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                <strong>Dica:</strong> Para valores grandes de n, o cálculo manual se torna impraticável.
                É aí que as aproximações Poisson e Normal se tornam essenciais!
              </p>
            </div>
          </div>
        </div>
      );

    case 'faq':
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-600 dark:text-blue-400">❓</span>
            <h4 className="font-semibold theme-text">Perguntas Frequentes</h4>
          </div>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">O que é distribuição binomial?</h5>
              <p className="text-blue-600 dark:text-blue-200 text-sm">
                É um modelo probabilístico que conta o número de sucessos em n tentativas independentes,
                cada uma com probabilidade p de sucesso. Exemplo: número de caras em 10 lançamentos de moeda.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h5 className="font-medium text-green-700 dark:text-green-300 mb-2">Quando usar a aproximação Poisson?</h5>
              <p className="text-green-600 dark:text-green-200 text-sm">
                Quando n é grande e p é pequeno (<InlineMath math="\lambda = n \times p < 10" />). É útil para modelar eventos raros como
                acidentes de trânsito ou defeitos em produção.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <h5 className="font-medium text-orange-700 dark:text-orange-300 mb-2">Quando usar a aproximação Normal?</h5>
              <p className="text-orange-600 dark:text-orange-200 text-sm">
                Quando <InlineMath math="n \times p \geq 10" /> e <InlineMath math="n \times (1-p) \geq 10" />. A distribuição binomial se aproxima da Normal quando
                o número de tentativas é grande.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h5 className="font-medium text-purple-700 dark:text-purple-300 mb-2">O que significa P(X &gt; k)?</h5>
              <p className="text-purple-600 dark:text-purple-200 text-sm">
                É a probabilidade de obter mais de k sucessos. Por exemplo, se k=5, calcula <InlineMath math="P(X=6) + P(X=7) + \ldots + P(X=n)" />.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h5 className="font-medium text-red-700 dark:text-red-300 mb-2">Por que usar logaritmos nos cálculos?</h5>
              <div className="text-red-600 dark:text-red-200 text-sm space-y-3">
                <p>
                  Quando temos <strong>valores grandes de n e pequenos de p</strong>, as probabilidades podem ser 
                  <strong> extremamente pequenas</strong> (como <InlineMath math="10^{-100}" /> ou menores), causando 
                  <strong> overflow/underflow numérico</strong> nos computadores.
                </p>
                
                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                  <p className="font-medium mb-2">🔍 Cenários Problemáticos:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Controle de qualidade:</strong> n=10.000 peças, p=0.0001 (1 defeito em 10.000)</li>
                    <li><strong>Eventos raros:</strong> n=1.000.000 pessoas, p=0.000001 (doença rara)</li>
                    <li><strong>Sistemas confiáveis:</strong> n=100.000 componentes, p=0.00001 (falha)</li>
                  </ul>
                  <p className="mt-2 text-xs">
                    💡 <strong>Resultado:</strong> <InlineMath math="P(X=0)" /> pode ser <InlineMath math="\approx 10^{-434}" />
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                  <p className="font-medium mb-2">🧮 Solução Logarítmica:</p>
                  <p>Em vez de calcular diretamente:</p>
                  <p className="text-center my-2">
                    <InlineMath math="P = \binom{n}{k} p^k (1-p)^{n-k}" />
                  </p>
                  <p>Usamos a propriedade: <InlineMath math="\log(a \times b) = \log a + \log b" /></p>
                  <p className="text-center my-2">
                    <InlineMath math="\log P = \log\binom{n}{k} + k\log p + (n-k)\log(1-p)" />
                  </p>
                  <p>Depois convertemos: <InlineMath math="P = e^{\log P}" /> (apenas no resultado final)</p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <p className="font-medium mb-2">✅ Vantagens:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Estabilidade:</strong> <InlineMath math="-1000" /> é manejável, <InlineMath math="10^{-1000}" /> não</li>
                    <li><strong>Precisão:</strong> Mantém dígitos significativos</li>
                    <li><strong>Eficiência:</strong> Multiplicações → Somas (mais rápido)</li>
                    <li><strong>Robustez:</strong> Funciona para qualquer n e p</li>
                  </ul>
                </div>

                <p>
                  <strong>🎯 Na prática:</strong> Essa aplicação usa essa técnica automaticamente, 
                  garantindo resultados precisos mesmo para distribuições com probabilidades microscópicas!
                </p>
              </div>
            </div>

            <div className="border-l-4 border-teal-500 pl-4">
              <h5 className="font-medium text-teal-700 dark:text-teal-300 mb-2">Qual a diferença entre média e variância?</h5>
              <p className="text-teal-600 dark:text-teal-200 text-sm">
                Média <InlineMath math="(\mu) = n \times p" /> indica o valor esperado. Variância <InlineMath math="(\sigma^2) = n \times p \times (1-p)" /> mede a dispersão.
                Desvio padrão <InlineMath math="(\sigma) = \sqrt{\text{variância}}" /> é mais fácil de interpretar.
              </p>
            </div>
          </div>
        </div>
      );

    default:
      return <div>Conteúdo não encontrado</div>;
  }
};

export const getModalTitle = (type: ModalType): string => {
  switch (type) {
    case 'n': return 'Número de Tentativas (n)';
    case 'p': return 'Probabilidade de Sucesso (p)';
    case 'k': return 'Limite Superior (k)';
    case 'binomial': return 'Distribuição Binomial';
    case 'poisson': return 'Aproximação de Poisson';
    case 'normal': return 'Aproximação de Normal';
    case 'history': return 'História da Distribuição Binomial';
    case 'manual_calc': return 'Cálculo Manual Passo-a-Passo';
    case 'faq': return 'Perguntas Frequentes';
    default: return 'Explicação';
  }
};
