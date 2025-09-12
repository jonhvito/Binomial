/**
 * Módulo de validação para parâmetros probabilísticos
 */

/**
 * Valida se os parâmetros de entrada são válidos
 */
export const isValidInput = (n: number, p: number, k: number): boolean => {
  return n >= 1 && n <= 100000 && p >= 0 && p <= 1 && k >= 0 && k <= n;
};

/**
 * Fornece mensagens de erro detalhadas e didáticas sobre parâmetros inválidos
 */
export const getValidationErrors = (n: number, p: number, k: number): string[] => {
  const errors: string[] = [];

  if (n < 1) {
    errors.push("O número de tentativas (n) deve ser pelo menos 1. Pense em pelo menos uma tentativa!");
  } else if (n > 100000) {
    errors.push("O número de tentativas (n) é muito grande. Use valores até 100.000 para evitar problemas de performance.");
  }

  if (p < 0 || p > 1) {
    errors.push("A probabilidade de sucesso (p) deve estar entre 0 e 1. Por exemplo: 0.5 significa 50% de chance.");
  }

  if (k < 0) {
    errors.push("O limite superior (k) deve ser um número não-negativo. Não faz sentido procurar por menos de 0 sucessos!");
  } else if (k > n) {
    errors.push(`O limite superior (k=${k}) não pode ser maior que o número de tentativas (n=${n}). Você não pode ter mais sucessos que tentativas!`);
  }

  return errors;
};
