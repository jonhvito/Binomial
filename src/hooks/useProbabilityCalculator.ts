import { useState, useMemo } from 'react';
import { calculateAllResults, generateDistributionData } from '../utils/probabilityCalculations';
import { isValidInput, getValidationErrors } from '../utils/validation';
import { getSmartTips } from '../utils/smartTips';
import type { CalculationResult } from '../utils/probabilityCalculations';

export const useProbabilityCalculator = () => {
  const [n, setN] = useState(100);
  const [p, setP] = useState(0.02);
  const [k, setK] = useState(5);
  const [showPoisson, setShowPoisson] = useState(true);
  const [showNormal, setShowNormal] = useState(true);

  // Validação de entrada
  const validInput = useMemo(() => isValidInput(n, p, k), [n, p, k]);

  // Erros de validação
  const validationErrors = useMemo(() => getValidationErrors(n, p, k), [n, p, k]);

  // Resultados dos cálculos
  const results: CalculationResult = useMemo(() => {
    if (!validInput) {
      return {
        exact: 0,
        poisson: 0,
        normal: 0,
        poissonError: 0,
        normalError: 0,
        normalValid: false,
        normalCalculable: false,
        mean: 0,
        stdDev: 0,
      };
    }
    return calculateAllResults(n, p, k);
  }, [n, p, k, validInput]);

  // Dicas inteligentes
  const smartTips = useMemo(() => {
    if (!validInput) return [];
    return getSmartTips(n, p, k, results.exact);
  }, [n, p, k, results.exact, validInput]);

  // Dados para o gráfico
  const chartData = useMemo(() => {
    if (!validInput) return null;

    const distributionData = generateDistributionData(n, p, k);

    return {
      labels: distributionData.map(d => d.x.toString()),
      datasets: [
        {
          label: 'P(X = x)',
          data: distributionData.map(d => d.probability),
          backgroundColor: distributionData.map(d =>
            d.x > k ? '#F97316' : '#3B82F6'
          ),
          borderColor: distributionData.map(d =>
            d.x > k ? '#EA580C' : '#2563EB'
          ),
          borderWidth: 1,
        },
      ],
    };
  }, [n, p, k, validInput]);

  // Funções para aplicar presets
  const applyPreset = (presetN: number, presetP: number, presetK: number) => {
    setN(presetN);
    setP(presetP);
    setK(presetK);
  };

  return {
    // Estados
    n,
    p,
    k,
    showPoisson,
    showNormal,

    // Setters
    setN,
    setP,
    setK,
    setShowPoisson,
    setShowNormal,

    // Dados calculados
    validInput,
    validationErrors,
    results,
    smartTips,
    chartData,

    // Ações
    applyPreset,
  };
};
