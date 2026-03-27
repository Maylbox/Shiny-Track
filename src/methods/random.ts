import type { HuntMethodDefinition, MethodCalculationInput, MethodCalculationResult } from "../types/method";

function getBaseOdds(shinyCharm: boolean) {
  return shinyCharm ? 1365.67 : 4096;
}

function calculate(input: MethodCalculationInput): MethodCalculationResult {
  const oddsDenominator = getBaseOdds(input.shinyCharm);
  const singleProbability = 1 / oddsDenominator;
  const cumulativeProbability =
    input.progress <= 0 ? 0 : 1 - Math.pow(1 - singleProbability, input.progress);

  return {
    oddsDenominator,
    singleProbability,
    cumulativeProbability,
  };
}

export const randomMethod: HuntMethodDefinition = {
  id: "random",
  label: "Random / Soft Reset",
  calculate,
};