/**
 * Módulo de cálculos probabilísticos para distribuições Binomial, Poisson e Normal
 */

export interface CalculationResult {
  exact: number;
  poisson: number;
  normal: number;
  poissonError: number;
  normalError: number;
  normalValid: boolean;
  mean: number;
  stdDev: number;
}

export interface DistributionData {
  x: number;
  probability: number;
}

/**
 * Calcula o coeficiente binomial C(n,k) = n! / (k! * (n-k)!) usando logaritmos
 * para evitar overflow numérico com valores grandes de n.
 *
 * Fórmula: C(n,k) = ∏(i=1 to min(k,n-k)) (n-i+1)/i
 * Usamos log para calcular: log(C(n,k)) = ∑ log(n-i+1) - ∑ log(i)
 */
export const logBinomialCoeff = (n: number, k: number): number => {
  if (k > n || k < 0) return -Infinity;
  if (k === 0 || k === n) return 0; // C(n,0) = C(n,n) = 1, log(1) = 0

  let result = 0;
  // Calculamos apenas até min(k, n-k) para eficiência
  for (let i = 1; i <= Math.min(k, n - k); i++) {
    result += Math.log(n - i + 1) - Math.log(i);
  }
  return result;
};

/**
 * Calcula a probabilidade binomial P(X = k) usando logaritmos
 * para evitar underflow numérico.
 *
 * Fórmula: P(X = k) = C(n,k) * p^k * (1-p)^(n-k)
 * Em log: log(P) = log(C(n,k)) + k*log(p) + (n-k)*log(1-p)
 */
export const logBinomialProb = (n: number, k: number, p: number): number => {
  if (p === 0) return k === 0 ? 0 : -Infinity; // Se p=0, só P(X=0)=1
  if (p === 1) return k === n ? 0 : -Infinity; // Se p=1, só P(X=n)=1

  const logCoeff = logBinomialCoeff(n, k);
  const logProb = k * Math.log(p) + (n - k) * Math.log(1 - p);
  return logCoeff + logProb;
};

/**
 * Calcula a probabilidade binomial exata P(X > k) usando recorrência
 * e somando pelo lado mais curto para melhor performance.
 *
 * Quando k < média: soma P(X ≤ k) e subtrai de 1
 * Quando k ≥ média: soma diretamente P(X ≥ k+1)
 *
 * Fórmula de recorrência: P(X=i) = P(X=i-1) * ((n-i+1)/i) * (p/q)
 * Onde q = 1-p
 */
export const calculateBinomial = (n: number, p: number, k: number): number => {
  if (p === 0 || k >= n) return 0;
  if (p === 1) return k < n ? 1 : 0;

  const q = 1 - p;
  const mean = n * p;

  // Se k < média, soma P(X ≤ k) e subtrai de 1 (mais eficiente para caudas esquerda)
  if (k < mean) {
    let px = Math.exp(n * Math.log(q)); // P(X=0)
    let cum = px;
    const ratio = p / q;
    for (let i = 1; i <= k; i++) {
      px *= ((n - i + 1) / i) * ratio;
      cum += px;
      if (!isFinite(px)) break;
    }
    return Math.max(0, 1 - cum);
  } else {
    // Se k ≥ média, soma diretamente P(X ≥ k+1) (mais eficiente para caudas direita)
    // Primeiro calcula P(X=k) de forma estável
    let px = Math.exp(n * Math.log(q)); // P(X=0)
    let pk = px; // P(X=k) será calculado
    const ratio = p / q;
    for (let i = 1; i <= k; i++) {
      px *= ((n - i + 1) / i) * ratio;
      if (i === k) pk = px; // Salva P(X=k)
      if (!isFinite(px)) break;
    }

    // Agora soma P(X ≥ k+1) = P(X=k+1) + P(X=k+2) + ... + P(X=n)
    if (k === n) return 0; // redundante, mas explícito
    let tail = 0;
    px = pk * ((n - k) / (k + 1)) * ratio; // P(X=k+1)
    for (let i = k + 1; i <= n; i++) {
      tail += px;
      px *= ((n - i) / (i + 1)) * ratio; // Próxima probabilidade
      if (!isFinite(px) || isNaN(px)) break;
    }
    return Math.max(0, tail);
  }
};

/**
 * Calcula a aproximação Poisson para P(X > k)
 *
 * A distribuição Poisson é uma boa aproximação quando:
 * - n é grande
 * - p é pequeno
 * - λ = n*p é pequeno (geralmente λ < 10)
 *
 * Fórmula: P(X > k) ≈ 1 - ∑(i=0 to k) e^(-λ) * λ^i / i!
 */
export const calculatePoisson = (n: number, p: number, k: number): number => {
  const lambda = n * p; // Parâmetro da distribuição Poisson
  if (lambda === 0) return 0;

  // Começamos com P(X=0) = e^(-λ)
  let term = Math.exp(-lambda);
  let cum = term;

  // Calculamos P(X=1) até P(X=k) iterativamente
  for (let i = 1; i <= k; i++) {
    term *= lambda / i;       // P(X=i) = P(X=i-1) * λ/i
    cum += term;
    if (!isFinite(term)) break; // Proteção contra overflow
  }
  return Math.max(0, 1 - cum);
};

/**
 * Calcula a função de distribuição cumulativa da Normal padrão Q(z) = 1 - Φ(z)
 * usando uma aproximação precisa baseada na função erro (erfc).
 *
 * Esta implementação usa a fórmula de Abramowitz & Stegun 7.1.26
 * que é numericamente estável para valores na cauda da distribuição.
 */
export const normalTail = (z: number): number => {
  // Abramowitz–Stegun 7.1.26 para erfc, estável em cauda
  const ax = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.5 * ax);
  const tau = t * Math.exp(
    -ax * ax
    - 1.26551223
    + t * (1.00002368
    + t * (0.37409196
    + t * (0.09678418
    + t * (-0.18628806
    + t * (0.27886807
    + t * (-1.13520398
    + t * (1.48851587
    + t * (-0.82215223 + t * 0.17087277))))))))
  );
  const erfc = z >= 0 ? tau : 2 - tau;
  return 0.5 * erfc;
};

/**
 * Calcula a aproximação Normal para P(X > k) com correção de continuidade
 *
 * A distribuição Normal é uma boa aproximação quando:
 * - n*p ≥ 10
 * - n*(1-p) ≥ 10
 *
 * Parâmetros: μ = n*p, σ = √[n*p*(1-p)]
 * Correção de continuidade: P(X > k) ≈ P(Z > (k + 0.5 - μ)/σ), z = (k + 0.5 - μ)/σ
 */
export const calculateNormal = (n: number, p: number, k: number): { value: number; valid: boolean } => {
  const mean = n * p;
  const variance = n * p * (1 - p);
  // Verifica se as condições para a aproximação são atendidas
  const valid = mean >= 10 && n * (1 - p) >= 10;
  if (!valid || variance === 0) return { value: 0, valid: false };

  const stdDev = Math.sqrt(variance);
  // Correção de continuidade: z = (k + 0.5 - μ) / σ
  const z = (k + 0.5 - mean) / stdDev;
  const value = Math.max(0, normalTail(z));
  return { value, valid };
};

/**
 * Gera dados da distribuição para o gráfico
 */
export const generateDistributionData = (n: number, p: number, k: number, maxBars: number = 300): DistributionData[] => {
  const maxX = Math.min(n, Math.min(k + 20, maxBars));
  const data: DistributionData[] = [];

  // Short-circuit for edge cases
  if (p === 0) {
    for (let x = 0; x <= maxX; x++) {
      data.push({ x, probability: x === 0 ? 1 : 0 });
    }
    return data;
  }
  if (p === 1) {
    for (let x = 0; x <= maxX; x++) {
      data.push({ x, probability: x === n ? 1 : 0 });
    }
    return data;
  }

  for (let x = 0; x <= maxX; x++) {
    const logProb = logBinomialProb(n, x, p);
    const probability = logProb !== -Infinity ? Math.exp(logProb) : 0;
    data.push({ x, probability });
  }

  return data;
};

/**
 * Calcula todos os resultados probabilísticos
 */
export const calculateAllResults = (n: number, p: number, k: number): CalculationResult => {
  const exact = calculateBinomial(n, p, k);
  const poisson = calculatePoisson(n, p, k);
  const normalResult = calculateNormal(n, p, k);

  const poissonError =
    exact > 0 ? Math.abs((poisson - exact) / exact) * 100
              : Math.abs(poisson - exact) * 100;

  const normalError =
    normalResult.valid
      ? (exact > 0 ? Math.abs((normalResult.value - exact) / exact) * 100
                   : Math.abs(normalResult.value - exact) * 100)
      : 0;

  return {
    exact,
    poisson,
    normal: normalResult.value,
    poissonError,
    normalError,
    normalValid: normalResult.valid,
    mean: n * p,
    stdDev: Math.sqrt(n * p * (1 - p)),
  };
};
