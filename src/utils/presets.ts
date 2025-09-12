/**
 * Constantes para cenários pré-definidos
 */

export interface Preset {
  n: number;
  p: number;
  k: number;
  title: string;
  description: string;
  color: string;
  emoji: string;
}

export const PRESETS: Preset[] = [
  {
    n: 100,
    p: 0.02,
    k: 5,
    title: "Controle de Qualidade",
    description: "Probabilidade de mais de 5 peças defeituosas em 100",
    color: "blue",
    emoji: "🏭"
  },
  {
    n: 20,
    p: 0.3,
    k: 8,
    title: "Futebol",
    description: "Probabilidade de mais de 8 chutes resultando em gol em 20 tentativas",
    color: "teal",
    emoji: "⚽"
  },
  {
    n: 50,
    p: 0.85,
    k: 40,
    title: "Exames",
    description: "Probabilidade de mais de 40 alunos passando em 50",
    color: "green",
    emoji: "📚"
  },
  {
    n: 1000,
    p: 0.001,
    k: 3,
    title: "Bugs em Software",
    description: "Probabilidade de mais de 3 bugs em 1000 linhas de código",
    color: "purple",
    emoji: "💻"
  },
  {
    n: 500,
    p: 0.002,
    k: 2,
    title: "Epidemiologia",
    description: "Probabilidade de mais de 2 casos positivos em 500 testes",
    color: "orange",
    emoji: "🦠"
  },
  {
    n: 200,
    p: 0.05,
    k: 15,
    title: "Eventos Raros",
    description: "Probabilidade de mais de 15 sucessos em 200 tentativas",
    color: "red",
    emoji: "🎲"
  },
  {
    n: 30,
    p: 0.1,
    k: 5,
    title: "Arremessos Livres",
    description: "Probabilidade de mais de 5 cestas em 30 arremessos livres",
    color: "indigo",
    emoji: "🎯"
  },
  {
    n: 100,
    p: 0.95,
    k: 90,
    title: "Voos Pontuais",
    description: "Probabilidade de mais de 90 voos pontuais em 100",
    color: "pink",
    emoji: "✈️"
  },
  {
    n: 60,
    p: 0.15,
    k: 12,
    title: "Loteria",
    description: "Probabilidade de mais de 12 números sorteados em 60",
    color: "cyan",
    emoji: "🍀"
  }
];
