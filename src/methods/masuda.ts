import type {
  HuntMethodDefinition,
  MethodCalculationInput,
  MethodCalculationResult,
} from "../types/method";

function getMasudaOdds(shinyCharm: boolean) {
  return shinyCharm ? 512 : 4096 / 6;
}

function calculate(input: MethodCalculationInput): MethodCalculationResult {
  const oddsDenominator = getMasudaOdds(input.shinyCharm);
  const singleProbability = 1 / oddsDenominator;
  const cumulativeProbability =
    input.progress <= 0 ? 0 : 1 - Math.pow(1 - singleProbability, input.progress);

  return {
    oddsDenominator,
    singleProbability,
    cumulativeProbability,
    extras: {
      method: "Masuda Method",
      eggsPerAttempt: 1,
    },
  };
}

export const masudaMethod: HuntMethodDefinition = {
  id: "masuda",
  label: "Masuda Method",
  calculate,
};