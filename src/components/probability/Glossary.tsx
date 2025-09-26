import React, { useState } from 'react';
import { Book, Search, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  formula?: string;
  example?: string;
  references?: string[];
  relatedTerms?: string[];
}

interface GlossaryProps {
  isOpen: boolean;
  onClose: () => void;
}

const Glossary: React.FC<GlossaryProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const glossaryTerms: GlossaryTerm[] = [
    {
      id: 'binomial',
      term: 'Distribuição Binomial',
      definition: 'Distribuição de probabilidade discreta que modela o número de sucessos em n tentativas independentes, cada uma com probabilidade p de sucesso.',
      formula: 'P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}',
      example: 'Lançar uma moeda 10 vezes e contar o número de caras.',
      references: [
        'Ross, S. Introduction to Probability Models (2014)',
        'Montgomery, D. Applied Statistics and Probability for Engineers (2018)'
      ],
      relatedTerms: ['bernoulli', 'combinacao', 'tentativas']
    },
    {
      id: 'bernoulli',
      term: 'Distribuição de Bernoulli',
      definition: 'Caso especial da distribuição binomial com n = 1. Modelo uma única tentativa com dois resultados possíveis.',
      formula: 'P(X = 1) = p, \\quad P(X = 0) = 1-p',
      example: 'Resultado de um único lançamento de moeda.',
      relatedTerms: ['binomial']
    },
    {
      id: 'combinacao',
      term: 'Combinação C(n,k)',
      definition: 'Número de maneiras de escolher k objetos de um conjunto de n objetos, onde a ordem não importa.',
      formula: '\\binom{n}{k} = \\frac{n!}{k!(n-k)!}',
      example: 'C(5,2) = 10 maneiras de escolher 2 cartas de um baralho de 5.',
      relatedTerms: ['binomial', 'fatorial']
    },
    {
      id: 'poisson',
      term: 'Aproximação de Poisson',
      definition: 'Aproximação da distribuição binomial quando n é grande e p é pequeno (np ≈ λ constante).',
      formula: 'P(X = k) \\approx \\frac{\\lambda^k e^{-\\lambda}}{k!}, \\text{ onde } \\lambda = np',
      example: 'Aproximar Binomial(100, 0.02) por Poisson(2)',
      references: [
        'Devore, J. Probability and Statistics for Engineering and Sciences (2016)'
      ],
      relatedTerms: ['binomial', 'aproximação']
    },
    {
      id: 'normal',
      term: 'Aproximação Normal',
      definition: 'Aproximação da distribuição binomial quando n é grande usando o Teorema Central do Limite.',
      formula: 'X \\sim N(\\mu, \\sigma^2), \\text{ onde } \\mu = np \\text{ e } \\sigma^2 = np(1-p)',
      example: 'Aproximar Binomial(100, 0.5) por Normal(50, 25)',
      references: [
        'Walpole, R. Probability and Statistics for Engineers and Scientists (2016)'
      ],
      relatedTerms: ['binomial', 'aproximação', 'teorema-central']
    },
    {
      id: 'tentativas',
      term: 'Tentativas Independentes',
      definition: 'Experimentos onde o resultado de uma tentativa não afeta as outras tentativas.',
      example: 'Lançamentos consecutivos de uma moeda são independentes.',
      relatedTerms: ['binomial', 'bernoulli']
    },
    {
      id: 'esperanca',
      term: 'Valor Esperado (Esperança)',
      definition: 'Média teórica de uma distribuição de probabilidade.',
      formula: '\\text{Para Binomial: } E[X] = np',
      example: 'Para Binomial(10, 0.3), E[X] = 3',
      relatedTerms: ['variancia', 'binomial']
    },
    {
      id: 'variancia',
      term: 'Variância',
      definition: 'Medida de dispersão dos valores em torno da média.',
      formula: '\\text{Para Binomial: } \\text{Var}(X) = np(1-p)',
      example: 'Para Binomial(10, 0.3), Var(X) = 2.1',
      relatedTerms: ['esperanca', 'desvio-padrao', 'binomial']
    }
  ];

  const categories = [
    { id: 'todos', name: 'Todos os Termos', count: glossaryTerms.length },
    { id: 'distribuicoes', name: 'Distribuições', count: 4 },
    { id: 'aproximações', name: 'Aproximações', count: 2 },
    { id: 'conceitos', name: 'Conceitos Básicos', count: 4 }
  ];

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === 'todos') return matchesSearch;
    
    const categoryTerms = {
      'distribuicoes': ['binomial', 'bernoulli', 'poisson', 'normal'],
      'aproximações': ['poisson', 'normal'],
      'conceitos': ['combinacao', 'tentativas', 'esperanca', 'variancia']
    };
    
    return matchesSearch && categoryTerms[selectedCategory as keyof typeof categoryTerms]?.includes(term.id);
  });

  const toggleTermExpansion = (termId: string) => {
    const newExpanded = new Set(expandedTerms);
    if (newExpanded.has(termId)) {
      newExpanded.delete(termId);
    } else {
      newExpanded.add(termId);
    }
    setExpandedTerms(newExpanded);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="theme-card rounded-xl theme-shadow max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
              <Book className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold theme-text">
              Glossário & Referências
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors theme-text"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar com categorias */}
          <div className="w-1/4 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 theme-text-secondary'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{category.name}</span>
                    <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Referências Bibliográficas */}
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <h4 className="font-semibold theme-text mb-3 flex items-center gap-2">
                📚 Bibliografia
              </h4>
              <div className="space-y-2 text-xs theme-text-secondary">
                <div className="p-2 theme-card rounded border">
                  <p className="font-medium theme-text">Livros Recomendados:</p>
                  <ul className="mt-1 space-y-1 text-xs">
                    <li>• Ross, S. - Introduction to Probability Models</li>
                    <li>• Montgomery, D. - Applied Statistics</li>
                    <li>• Devore, J. - Probability and Statistics</li>
                  </ul>
                </div>
                <div className="p-2 theme-card rounded border">
                  <p className="font-medium theme-text">Recursos Online:</p>
                  <ul className="mt-1 space-y-1 text-xs">
                    <li className="flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      Khan Academy - Statistics
                    </li>
                    <li className="flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      MIT OpenCourseWare
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo principal */}
          <div className="flex-1 flex flex-col">
            {/* Barra de busca */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Buscar termos, definições..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent theme-card theme-text"
                />
              </div>
            </div>

            {/* Lista de termos */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {filteredTerms.length === 0 ? (
                  <div className="text-center py-12 theme-text-secondary">
                    <Search className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                    <p>Nenhum termo encontrado para "{searchTerm}"</p>
                  </div>
                ) : (
                  filteredTerms.map(term => (
                    <div key={term.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleTermExpansion(term.id)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-lg font-semibold theme-text">
                            {term.term}
                          </div>
                        </div>
                        {expandedTerms.has(term.id) ? 
                          <ChevronDown className="w-5 h-5 theme-text-secondary" /> : 
                          <ChevronRight className="w-5 h-5 theme-text-secondary" />
                        }
                      </button>
                      
                      {expandedTerms.has(term.id) && (
                        <div className="p-4 theme-card">
                          <p className="theme-text-secondary mb-4">{term.definition}</p>
                          
                          {term.formula && (
                            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                              <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">📐 Fórmula:</p>
                              <div className="theme-card p-3 rounded border flex justify-center">
                                <BlockMath math={term.formula} />
                              </div>
                            </div>
                          )}

                          {term.example && (
                            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                              <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-2">💡 Exemplo:</p>
                              <p className="text-sm text-green-800 dark:text-green-200">{term.example}</p>
                            </div>
                          )}

                          {term.relatedTerms && term.relatedTerms.length > 0 && (
                            <div className="mb-4">
                              <p className="text-sm font-medium theme-text mb-2">🔗 Termos Relacionados:</p>
                              <div className="flex flex-wrap gap-2">
                                {term.relatedTerms.map(relatedId => {
                                  const relatedTerm = glossaryTerms.find(t => t.id === relatedId);
                                  return relatedTerm ? (
                                    <button
                                      key={relatedId}
                                      onClick={() => toggleTermExpansion(relatedId)}
                                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-800/40 text-purple-700 dark:text-purple-300 rounded-full text-xs transition-colors"
                                    >
                                      {relatedTerm.term}
                                    </button>
                                  ) : null;
                                })}
                              </div>
                            </div>
                          )}

                          {term.references && term.references.length > 0 && (
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                              <p className="text-sm font-medium theme-text mb-2">📖 Referências:</p>
                              <ul className="space-y-1">
                                {term.references.map((ref, index) => (
                                  <li key={index} className="text-sm theme-text-secondary flex items-start gap-2">
                                    <span className="text-gray-400 dark:text-gray-500">•</span>
                                    {ref}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Glossary;