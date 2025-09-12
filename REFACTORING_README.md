# Estrutura Modular da Calculadora de Probabilidade Binomial

## Visão Geral

O código foi refatorado de um único componente de 1319 linhas para uma arquitetura modular organizada em:

- **Utils**: Funções utilitárias e constantes
- **Hooks**: Lógica de estado customizada
- **Components**: Componentes modulares reutilizáveis

## Estrutura de Arquivos

```
src/
├── utils/
│   ├── probabilityCalculations.ts  # Funções matemáticas
│   ├── validation.ts               # Validação de entrada
│   ├── presets.ts                  # Cenários pré-definidos
│   └── modalContent.tsx            # Conteúdo dos modais
├── hooks/
│   ├── useProbabilityCalculator.ts # Hook principal de cálculos
│   └── useModalState.ts           # Hook para gerenciamento de modais
└── components/
    ├── ProbabilityCalculator.tsx   # Componente principal (refatorado)
    └── probability/
        ├── ExplanationModal.tsx    # Modal de explicações
        ├── ParameterControls.tsx   # Controles de parâmetros
        ├── PresetButtons.tsx       # Botões de cenários
        ├── ApproximationOptions.tsx # Opções de aproximações
        ├── ResultsDisplay.tsx      # Exibição de resultados
        └── DistributionChart.tsx   # Gráfico da distribuição
```

## Benefícios da Refatoração

### 1. **Manutenibilidade**
- Cada módulo tem uma responsabilidade clara
- Código mais fácil de entender e modificar
- Redução significativa no tamanho dos arquivos

### 2. **Reutilização**
- Componentes podem ser reutilizados em outros contextos
- Funções matemáticas podem ser testadas isoladamente
- Hooks customizados podem ser compartilhados

### 3. **Testabilidade**
- Funções puras podem ser testadas unitariamente
- Componentes podem ser testados isoladamente
- Menos dependências entre módulos

### 4. **Performance**
- Imports seletivos reduzem o bundle
- Memoização adequada em hooks customizados
- Componentes menores renderizam mais eficientemente

### 5. **Colaboração**
- Desenvolvedores podem trabalhar em módulos distintos
- Mudanças são mais isoladas e previsíveis
- Code reviews são mais fáceis

## Como Usar

### Componente Principal
```tsx
import ProbabilityCalculator from './components/ProbabilityCalculator';

// Uso direto - todos os hooks e componentes são gerenciados internamente
<ProbabilityCalculator />
```

### Hooks Customizados
```tsx
import { useProbabilityCalculator } from './hooks/useProbabilityCalculator';

const MyComponent = () => {
  const calculator = useProbabilityCalculator();

  // Acesso direto ao estado e funções
  return (
    <div>
      <p>n: {calculator.n}</p>
      <button onClick={() => calculator.setN(100)}>Set n=100</button>
    </div>
  );
};
```

### Componentes Individuais
```tsx
import ParameterControls from './components/probability/ParameterControls';
import { useModalState } from './hooks/useModalState';

const CustomCalculator = () => {
  const modal = useModalState();

  return (
    <ParameterControls
      n={100}
      p={0.5}
      k={10}
      onNChange={(value) => console.log('n changed:', value)}
      onPChange={(value) => console.log('p changed:', value)}
      onKChange={(value) => console.log('k changed:', value)}
      onOpenModal={modal.openModal}
    />
  );
};
```

## Funcionalidades Mantidas

- ✅ Todos os cálculos matemáticos (Binomial, Poisson, Normal)
- ✅ Interface completa com modais explicativos
- ✅ Gráficos interativos
- ✅ Validação de entrada
- ✅ Cenários pré-definidos
- ✅ Dicas inteligentes
- ✅ Responsividade

## Melhorias Futuras Possíveis

1. **Testes Unitários**: Adicionar testes para funções matemáticas
2. **Storybook**: Documentar componentes visualmente
3. **TypeScript**: Melhorar tipos para maior segurança
4. **Performance**: Lazy loading de componentes
5. **Internacionalização**: Suporte a múltiplos idiomas

## Conclusão

A refatoração transformou um código monolítico em uma arquitetura modular, profissional e escalável, mantendo todas as funcionalidades originais enquanto melhorando significativamente a manutenibilidade e reutilização do código.</content>
<parameter name="filePath">/home/jonh_vito/Área de trabalho/Binomial/REFACTORING_README.md
