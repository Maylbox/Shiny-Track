import type {
  HuntMethodDefinition,
  MethodCalculationInput,
  MethodCalculationResult,
} from "../types/method";

function getChainFishingRolls(chain: number, shinyCharm: boolean) {
  const cappedChain = Math.min(Math.max(chain, 0), 20);

  let rolls = 1;

  if (shinyCharm) {
    rolls += 2;
  }

  rolls += 2 * cappedChain;

  return rolls;
}

function calculate(input: MethodCalculationInput): MethodCalculationResult {
  const chain = input.chain ?? input.progress;
  const rolls = getChainFishingRolls(chain, input.shinyCharm);

  const singleProbability = 1 - Math.pow(4095 / 4096, rolls);
  const oddsDenominator = 1 / singleProbability;

  return {
    oddsDenominator,
    singleProbability,
    cumulativeProbability: singleProbability,
    extras: {
      chain: Math.min(Math.max(chain, 0), 20),
      rolls,
      chainCap: 20,
    },
  };
}

export const chainFishingMethod: HuntMethodDefinition = {
  id: "chain_fishing",
  label: "Chain Fishing",
  calculate,
};