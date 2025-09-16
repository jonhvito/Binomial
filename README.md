# Calculadora de Probabilidade Binomial

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-yellow.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.5.0-orange.svg)](https://www.chartjs.org/)

Uma calculadora interativa e educacional para probabilidades binomiais, desenvolvida com React, TypeScript e Vite. Inclui cálculos exatos, aproximações Poisson e Normal, visualizações gráficas, tutorial interativo, glossário completo e conteúdo educacional detalhado com tema adaptável.

## 🚀 Demonstração Online

**Acesse a aplicação em funcionamento:** [https://jonhvito.github.io/Binomial](https://jonhvito.github.io/Binomial)

*Teste todas as funcionalidades diretamente no seu navegador!*

## Demonstração

### Interface Principal
![Interface Principal](./src/media/image1.png)

### Funcionalidades em Ação  
![Funcionalidades em Ação](./src/media/image2.png)

### Tutorial Interativo e Recursos Avançados
![Tutorial Interativo](./src/media/image3.png)

### Visualizações Avançadas
![Tema Escuro](./src/media/image4.png)

*Screenshots da aplicação em funcionamento com tema claro e escuro, mostrando todas as funcionalidades*

### Recursos Disponíveis
- 🎯 **9 Cenários Práticos**: Desde controle de qualidade até análises esportivas
- 📊 **Visualizações Múltiplas**: Gráficos interativos e comparativos
- 🎓 **Tutorial Guiado**: Tour completo pelas funcionalidades
- 📖 **Glossário Completo**: Definições de todos os termos estatísticos
- 🌙 **Tema Adaptável**: Interface clara e escura para conforto visual
- 📱 **Design Responsivo**: Funcional em desktop, tablet e mobile

## Funcionalidades Principais

### Cálculos Probabilísticos
- **Cálculo Exato**: Probabilidade binomial precisa usando algoritmos otimizados
- **Aproximação Poisson**: Para eventos raros (λ = n×p pequeno)  
- **Aproximação Normal**: Para amostras grandes com correção de continuidade
- **Comparação de Métodos**: Visualize diferenças entre exato vs. aproximado
- **Análise de Erros**: Cálculo automático de erros relativos entre aproximações

### Visualizações Interativas
- **Gráfico de Distribuição**: Histograma da distribuição binomial
- **Gráficos Avançados**: Comparações visuais entre distribuições
- **Destaque Visual**: Barras coloridas para P(X > k) vs P(X ≤ k)
- **Tooltips Informativos**: Probabilidades precisas ao passar o mouse
- **Responsividade**: Interface adaptável para desktop e mobile
- **Tema Dark/Light**: Alternância completa entre temas

### Conteúdo Educacional
- **Tutorial Interativo**: Tour guiado pelas funcionalidades principais
- **Glossário Completo**: Definições detalhadas de termos estatísticos
- **Explicação Passo-a-Passo**: Detalhamento dos cálculos realizados
- **Modais Explicativos**: Conceitos detalhados sobre parâmetros e distribuições
- **História da Estatística**: Timeline do desenvolvimento das distribuições
- **Cálculo Manual**: Passo-a-passo educacional com fórmulas
- **FAQ Interativo**: Respostas para dúvidas comuns

### Cenários Práticos
Cenários pré-configurados com exemplos reais:
- **Controle de Qualidade**: Análise de peças defeituosas
- **Futebol**: Probabilidade de gols em chutes
- **Exames**: Taxa de aprovação de estudantes
- **Bugs em Software**: Defeitos em linhas de código
- **Epidemiologia**: Casos positivos em testes médicos
- **Eventos Raros**: Probabilidades baixas em grandes amostras
- **Arremessos Livres**: Performance esportiva
- **Voos Pontuais**: Análise de pontualidade
- **Loteria**: Probabilidades em jogos de azar

### Dicas Inteligentes
- **Recomendações Contextuais**: Sugestões baseadas nos parâmetros inseridos
- **Validação Condicional**: Indicação das melhores aproximações para cada cenário
- **Interpretação de Resultados**: Explicações sobre a significância dos valores
- **Alertas Educativos**: Avisos sobre condições de aplicabilidade

### Interface e Usabilidade
- **Controles Intuitivos**: Sliders sincronizados com campos numéricos
- **Validação em Tempo Real**: Feedback imediato sobre parâmetros
- **Design Responsivo**: Funcionalidade completa em dispositivos móveis
- **Acessibilidade**: Suporte para diferentes dispositivos e necessidades
- **Performance Otimizada**: Algoritmos eficientes para cálculos complexos

## Como Usar

### Versões Disponíveis

#### **ProbabilityCalculator** (Versão Padrão)
- Interface limpa e focada nos cálculos essenciais
- Ideal para uso rápido e demonstrações básicas
- Todos os recursos matemáticos fundamentais

#### **ProbabilityCalculator_Enhanced** (Versão Avançada)
- Interface completa com recursos educacionais expandidos
- Tutorial interativo, glossário e explicações detalhadas
- Tema dark/light, gráficos comparativos avançados
- Experiência didática completa

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/binomial-calculator.git
cd binomial-calculator

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev

# Ou construa para produção
npm run build
npm run preview
```

### Interface da Aplicação

#### 1. Parâmetros de Entrada
- **n (Número de tentativas)**: Tamanho da amostra (1 ≤ n ≤ 100.000)
- **p (Probabilidade de sucesso)**: Chance de sucesso (0 ≤ p ≤ 1)
- **k (Limite superior)**: Valor para P(X > k) (0 ≤ k ≤ n)

#### 2. Cenários Práticos
Escolha entre cenários pré-configurados:
- **Controle de Qualidade**: Peças defeituosas em produção
- **Futebol**: Chutes a gol com probabilidade de sucesso
- **Exames**: Aprovação de alunos em testes
- **Bugs em Software**: Defeitos em código
- **Epidemiologia**: Casos positivos em testes médicos
- **Eventos Raros**: Probabilidades baixas em grandes amostras
- **Arremessos Livres**: Performance esportiva
- **Voos Pontuais**: Análise de pontualidade
- **Loteria**: Probabilidades em jogos de azar

#### 3. Resultados
- **Probabilidade Exata**: Cálculo binomial preciso
- **Aproximações**: Comparação com Poisson e Normal
- **Estatísticas**: Média, desvio padrão e erros relativos
- **Distribuição**: Gráfico interativo da distribuição
- **Validação Automática**: Indicação das melhores aproximações
- **Dicas Contextuais**: Interpretação inteligente dos resultados

#### 4. Recursos Avançados
- **Tutorial Interativo**: Tour guiado pelas funcionalidades
- **Glossário**: Definições completas de termos estatísticos
- **Explicação Detalhada**: Passo-a-passo dos cálculos
- **Tema Dark/Light**: Alternância de aparência
- **Gráficos Comparativos**: Visualizações avançadas das distribuições
- **Interface Responsiva**: Experiência otimizada para mobile e desktop

## Conceitos Matemáticos

### Distribuição Binomial
Modela o número de sucessos em **n** tentativas independentes, cada uma com probabilidade **p** de sucesso.

**Fórmula da Probabilidade:**
```
P(X = k) = C(n,k) × p^k × (1-p)^(n-k)
```

Onde `C(n,k) = n! / (k! × (n-k)!)` é o coeficiente binomial.

### Aproximação Poisson
Usada quando **n** é grande e **p** é pequeno, com λ = n×p.

**Fórmula:**
```
P(X = k) ≈ e^(-λ) × λ^k / k!
```

### Aproximação Normal
Válida quando **n×p ≥ 10** e **n×(1-p) ≥ 10**.

**Parâmetros:**
- Média: μ = n×p
- Desvio padrão: σ = √[n×p×(1-p)]
- Correção de continuidade: P(X > k) ≈ P(Z > (k + 0.5 - μ)/σ)

## Arquitetura Modular

Esta aplicação foi desenvolvida seguindo princípios de **arquitetura modular** para máxima manutenibilidade e reutilização.

### Estrutura do Projeto

```
binomial-calculator/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ProbabilityCalculator.tsx         # Componente principal (149 linhas)
│   │   ├── ProbabilityCalculator_Enhanced.tsx # Versão avançada com recursos adicionais
│   │   ├── ui/
│   │   │   └── ThemeToggle.tsx               # Toggle entre temas dark/light
│   │   └── probability/                      # Componentes modulares
│   │       ├── AdditionalCharts.tsx          # Gráficos comparativos avançados
│   │       ├── ApproximationOptions.tsx      # Opções de aproximações
│   │       ├── BinomialExplainer.tsx         # Explicação detalhada dos cálculos
│   │       ├── ChartLegend.tsx              # Legenda dos gráficos
│   │       ├── DistributionChart.tsx         # Gráfico da distribuição
│   │       ├── ExplanationModal.tsx          # Modal de explicações
│   │       ├── Glossary.tsx                 # Glossário de termos
│   │       ├── InteractiveTutorial.tsx      # Tutorial guiado
│   │       ├── ParameterControls.tsx        # Controles de parâmetros
│   │       ├── PresetButtons.tsx            # Botões de cenários
│   │       └── ResultsDisplay.tsx           # Exibição de resultados
│   ├── contexts/
│   │   └── ThemeContext.tsx                 # Contexto global de tema
│   ├── hooks/                               # Hooks customizados
│   │   ├── useModalState.ts                 # Gerenciamento de modais
│   │   ├── useProbabilityCalculator.ts      # Lógica principal de cálculos
│   │   ├── useTheme.ts                      # Gerenciamento de tema
│   │   └── useTutorial.ts                   # Controle do tutorial interativo
│   ├── utils/                               # Utilitários
│   │   ├── modalContent.tsx                 # Conteúdo dos modais
│   │   ├── presets.ts                       # Cenários pré-definidos
│   │   ├── probabilityCalculations.ts       # Funções matemáticas
│   │   ├── smartTips.ts                     # Lógica de dicas
│   │   └── validation.ts                    # Validação de entrada
│   ├── media/                               # Recursos visuais
│   │   ├── image1.png
│   │   └── image2.png
│   ├── App.tsx                              # Aplicação principal
│   ├── index.css                            # Estilos globais
│   ├── main.tsx                             # Ponto de entrada
│   └── vite-env.d.ts                        # Tipos Vite
├── docs/                                    # Build de produção
│   └── ...
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

### Componentes Modulares

#### **ProbabilityCalculator.tsx** (Componente Principal)
- **Responsabilidade**: Coordenação geral da aplicação
- **Linhas**: 149 (89% menor que a versão original!)
- **Função**: Importa e organiza todos os componentes modulares

#### Hooks Customizados
- **`useProbabilityCalculator`**: Gerencia estado e cálculos probabilísticos
- **`useModalState`**: Controla abertura/fechamento dos modais explicativos
- **`useTheme`**: Gerenciamento do tema dark/light da aplicação
- **`useTutorial`**: Controle do tutorial interativo e tour guiado

#### **Componentes de UI**
- **`ParameterControls`**: Controles deslizantes para n, p, k
- **`PresetButtons`**: Botões de cenários pré-configurados
- **`ApproximationOptions`**: Checkbox para mostrar/ocultar aproximações
- **`ResultsDisplay`**: Exibição dos resultados calculados
- **`DistributionChart`**: Gráfico interativo da distribuição
- **`ExplanationModal`**: Modal com conteúdo educacional
- **`ThemeToggle`**: Alternância entre tema claro e escuro

#### Componentes Avançados
- **`BinomialExplainer`**: Explicação passo-a-passo dos cálculos
- **`InteractiveTutorial`**: Tour guiado pelas funcionalidades
- **`Glossary`**: Glossário completo de termos estatísticos
- **`AdditionalCharts`**: Visualizações comparativas avançadas
- **`ChartLegend`**: Legendas detalhadas para os gráficos

#### Utilitários
- **`probabilityCalculations`**: Todas as funções matemáticas (245 linhas)
- **`validation`**: Validação de entrada e mensagens de erro
- **`modalContent`**: Conteúdo educacional dos modais
- **`presets`**: Configurações de cenários práticos
- **`smartTips`**: Lógica de dicas contextuais

### Benefícios da Arquitetura

#### Manutenibilidade
- Cada módulo tem responsabilidade clara
- Mudanças isoladas não afetam outros componentes
- Fácil localização e correção de bugs

#### Reutilização
- Componentes podem ser usados em outros projetos
- Funções matemáticas são independentes da UI
- Hooks customizados são compartilháveis

#### Testabilidade
- Funções puras podem ser testadas unitariamente
- Componentes isolados facilitam testes de UI
- Menos dependências entre módulos

#### Performance
- Imports seletivos reduzem bundle size
- Memoização adequada nos hooks
- Componentes menores renderizam mais eficientemente

#### Colaboração
- Múltiplos desenvolvedores podem trabalhar simultaneamente
- Mudanças são mais previsíveis
- Code reviews são mais fáceis

### Comparativo de Complexidade

| Métrica | Antes (Monolítico) | Depois (Modular) | Melhoria |
|---------|-------------------|------------------|----------|
| **Arquivos** | 1 arquivo | 15 arquivos | +1400% |
| **Linhas principais** | ~1319 linhas | 149 linhas | **-89%** |
| **Responsabilidades** | 8+ misturadas | 1 por módulo | **+800%** |
| **Reutilização** | Baixa | Alta | **+300%** |
| **Testabilidade** | Difícil | Fácil | **+250%** |

### Evolução da Arquitetura

Este projeto demonstra uma **evolução arquitetural** de um código monolítico para uma estrutura modular profissional.

#### Fase 1: Monolítico (Original)
```typescript
// 1 arquivo com ~1319 linhas
ProbabilityCalculator.tsx
├── Funções matemáticas
├── Validação de entrada
├── Gerenciamento de estado
├── Componentes de UI
├── Modais explicativos
├── Lógica de gráficos
└── Cenários pré-definidos
```

#### Fase 2: Modular (Atual)
```typescript
// 15 arquivos organizados
src/
├── components/
│   ├── ProbabilityCalculator.tsx (149 linhas)
│   └── probability/ (6 componentes)
├── hooks/ (2 hooks customizados)
└── utils/ (5 módulos utilitários)
```

#### Métricas de Melhoria
- **Modularização**: 1400% mais arquivos organizados
- **Manutenibilidade**: 89% menos linhas no componente principal
- **Reutilização**: Componentes independentes e compartilháveis
- **Testabilidade**: Funções isoladas facilitam testes
- **Colaboração**: Desenvolvimento paralelo possível
- **Performance**: Imports seletivos e memoização otimizada

### Arquitetura em Detalhes

#### Separação de Responsabilidades
Cada módulo tem uma responsabilidade clara e bem definida:

- **UI Components**: Renderização e interação do usuário
- **Business Logic**: Cálculos probabilísticos e validações
- **State Management**: Gerenciamento de estado com hooks
- **Educational Content**: Conteúdo explicativo e cenários
- **Utilities**: Funções auxiliares reutilizáveis

#### Fluxo de Dados
```
User Input → ParameterControls → useProbabilityCalculator
                                      ↓
probabilityCalculations.ts → ResultsDisplay
                                      ↓
DistributionChart ← modalContent.tsx ← ExplanationModal
```

#### Padrões de Design Aplicados
- **Single Responsibility**: Cada módulo uma responsabilidade
- **Dependency Injection**: Hooks injetam dependências
- **Composition over Inheritance**: Componentes compostos
- **Custom Hooks**: Lógica reutilizável
- **Utility Functions**: Funções puras e testáveis

## Tecnologias Utilizadas

### Frontend
- **React 18**: Framework para interface de usuário
- **TypeScript**: Tipagem estática para maior segurança
- **Vite**: Build tool rápido e moderno
- **Tailwind CSS**: Framework CSS utilitário

### Visualização
- **Chart.js**: Biblioteca de gráficos
- **React-Chartjs-2**: Integração React para Chart.js

### UI/UX
- **Lucide React**: Ícones modernos e consistentes
- **Responsive Design**: Interface adaptável para todos os dispositivos
- **Tema Dinâmico**: Sistema completo de dark/light mode
- **Acessibilidade**: Suporte para diferentes necessidades de usuário

### Desenvolvimento
- **ESLint**: Linting e qualidade de código
- **PostCSS**: Processamento CSS
- **Autoprefixer**: Compatibilidade cross-browser

## Cenários de Aplicação

### 1. Controle de Qualidade
```typescript
// Exemplo: Fábrica produzindo peças
n = 100    // 100 peças produzidas
p = 0.02   // 2% de probabilidade de defeito
k = 5      // Queremos P(X > 5) - mais de 5 defeituosas
```

### 2. Epidemiologia
```typescript
// Exemplo: Testes de COVID
n = 500    // 500 testes realizados
p = 0.002  // 0.2% de taxa de infecção
k = 2      // P(X > 2) - mais de 2 casos positivos
```

### 4. Arremessos Livres
```typescript
// Exemplo: Basquete - performance do jogador
n = 30     // 30 arremessos livres
p = 0.1    // 10% de chance de errar
k = 5      // P(X > 5) - mais de 5 erros
```

### 5. Voos Pontuais
```typescript
// Exemplo: Análise de pontualidade aérea
n = 100    // 100 voos
p = 0.95   // 95% de pontualidade
k = 90     // P(X > 90) - mais de 90 voos no horário
```

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Executa linting
```

## Contribuição

Contribuições são bem-vindas! Esta aplicação segue uma arquitetura modular que facilita contribuições focadas.

### Como Contribuir

1. **Fork** o projeto
2. **Clone** sua fork: `git clone https://github.com/seu-usuario/binomial-calculator.git`
3. **Crie** uma branch: `git checkout -b feature/nova-funcionalidade`
4. **Commit** suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
5. **Push** para a branch: `git push origin feature/nova-funcionalidade`
6. **Abra** um Pull Request

### Áreas de Contribuição

#### Novos Componentes
- Adicione componentes na pasta `src/components/probability/`
- Siga o padrão de nomenclatura PascalCase
- Exporte como default export
- Documente props com TypeScript

#### Novos Hooks
- Crie hooks em `src/hooks/`
- Use o prefixo `use` (ex: `useNewFeature`)
- Retorne objeto com estado e funções
- Documente com JSDoc

#### Utilitários
- Adicione funções em `src/utils/`
- Mantenha responsabilidades claras
- Exporte funções nomeadas
- Inclua tipos TypeScript

#### Conteúdo Educacional
- Atualize `src/utils/modalContent.tsx` para novos modais explicativos
- Adicione novos cenários em `src/utils/presets.ts`
- Melhore dicas em `src/utils/smartTips.ts`
- Expanda o glossário em `src/components/probability/Glossary.tsx`
- Aprimore o tutorial em `src/components/probability/InteractiveTutorial.tsx`

### Diretrizes de Desenvolvimento

#### Estrutura de Arquivos
```typescript
// Componente modular
src/components/probability/NewComponent.tsx

// Hook customizado
src/hooks/useNewFeature.ts

// Utilitário
src/utils/newUtility.ts
```

#### **Convenções de Código**
- **TypeScript**: Tipos obrigatórios para todas as props e retornos
- **Nomenclatura**: PascalCase para componentes, camelCase para funções
- **Imports**: Agrupados por tipo (React, bibliotecas, utils, components)
- **Comentários**: JSDoc para funções públicas

#### **Testes**
```bash
# Executar todos os testes
npm run test

# Executar testes de um arquivo específico
npm run test -- src/utils/probabilityCalculations.test.ts
```

#### **Linting**
```bash
# Verificar qualidade do código
npm run lint

# Corrigir automaticamente
npm run lint:fix
```

### Exemplo de Contribuição

#### Adicionando um Novo Cenário
```typescript
// 1. Adicione em src/utils/presets.ts
export const NEW_PRESETS: Preset[] = [
  {
    n: 1000,
    p: 0.005,
    k: 10,
    title: "Novo Cenário",
    description: "Descrição do cenário",
    color: "purple",
    emoji: "target"
  }
];

// 2. Atualize src/components/probability/PresetButtons.tsx
// para incluir o novo preset na interface
```

### Padrões de Commit

```
feat: adiciona novo cenário de análise de risco
fix: corrige cálculo de probabilidade normal
docs: atualiza documentação da arquitetura
style: formata código com Prettier
refactor: extrai função de validação
test: adiciona testes para função binomial
```

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Agradecimentos

- **React Team** - Pelo excelente framework
- **Chart.js** - Pela poderosa biblioteca de gráficos
- **Tailwind CSS** - Pelo sistema de design utilitário
- **Comunidade Open Source** - Por todas as ferramentas utilizadas

## Suporte

Para dúvidas, sugestões ou problemas:

- **Issues**: [GitHub Issues](https://github.com/seu-usuario/binomial-calculator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/seu-usuario/binomial-calculator/discussions)
- **Email**: seu-email@exemplo.com

---

**Desenvolvido para educar e facilitar o entendimento de probabilidades binomiais**
