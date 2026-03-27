import type {
  HuntMethodDefinition,
  MethodCalculationInput,
  MethodCalculationResult,
} from "../types/method";

function getBaseOdds(shinyCharm: boolean) {
  return shinyCharm ? 1365.67 : 4096;
}

function calculate(input: MethodCalculationInput): MethodCalculationResult {
  const baseOdds = getBaseOdds(input.shinyCharm);

  const p = 1 / baseOdds;
  const singleProbability = 1 - Math.pow(1 - p, 5);
  const oddsDenominator = 1 / singleProbability;

  const cumulativeProbability =
    input.progress <= 0 ? 0 : 1 - Math.pow(1 - singleProbability, input.progress);

  return {
    oddsDenominator,
    singleProbability,
    cumulativeProbability,
    extras: {
      pokemonPerEncounter: 5,
    },
  };
}

export const hordeMethod: HuntMethodDefinition = {
  id: "horde",
  label: "Horde Encounters",
  calculate,
};