/**
 * Módulo de dicas inteligentes baseadas nos parâmetros
 */

export const getSmartTips = (n: number, p: number, k: number, exact: number): string[] => {
  const tips: string[] = [];

  // Dicas sobre o tamanho da amostra
  if (n < 10) {
    tips.push("Com poucos ensaios (n < 10), a distribuição binomial pode ser bastante irregular. Considere aumentar n para uma melhor aproximação.");
  } else if (n > 1000) {
    tips.push("Com muitos ensaios (n > 1000), considere usar a aproximação Normal se as condições forem atendidas.");
  }

  // Dicas sobre probabilidade
  if (p < 0.01) {
    tips.push("Probabilidade muito baixa (p < 0.01). A distribuição Poisson pode ser uma excelente aproximação!");
  } else if (p > 0.99) {
    tips.push("Probabilidade muito alta (p > 0.99). Isso é como procurar falhas em um sistema muito confiável.");
  } else if (p === 0.5) {
    tips.push("Probabilidade de 50% cria uma distribuição simétrica. A média e a mediana coincidem!");
  }

  // Dicas sobre o limite k
  const mean = n * p;
  if (k < mean * 0.5) {
    tips.push("k está bem abaixo da média. Você está procurando por um evento muito improvável!");
  } else if (k > mean * 1.5) {
    tips.push("k está bem acima da média. Isso pode indicar um evento bastante provável.");
  }

  // Dicas sobre aproximações
  const lambda = n * p;
  if (lambda < 10 && lambda > 0) {
    tips.push("λ = n×p < 10. A aproximação Poisson é recomendada para este cenário.");
  }

  const condition1 = n * p >= 10;
  const condition2 = n * (1 - p) >= 10;
  if (condition1 && condition2) {
    tips.push("As condições para a aproximação Normal estão satisfeitas (np ≥ 10 e n(1-p) ≥ 10).");
  } else if (!condition1) {
    tips.push("np < 10. A aproximação Normal pode não ser confiável.");
  } else if (!condition2) {
    tips.push("n(1-p) < 10. A aproximação Normal pode não ser confiável.");
  }

  // Dicas sobre interpretação
  if (exact > 0.5) {
    tips.push("Probabilidade alta (>50%). Este evento é mais provável de acontecer do que não acontecer!");
  } else if (exact < 0.01) {
    tips.push("Probabilidade muito baixa (<1%). Este é um evento raro!");
  }

  return tips;
};
