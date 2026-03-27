import type {
  HuntMethodDefinition,
  MethodCalculationInput,
  MethodCalculationResult,
} from "../types/method";

function getFriendSafariRolls(shinyCharm: boolean) {
  return shinyCharm ? 7 : 5;
}

function calculate(input: MethodCalculationInput): MethodCalculationResult {
  const rolls = getFriendSafariRolls(input.shinyCharm);

  const singleProbability = 1 - Math.pow(4095 / 4096, rolls);
  const oddsDenominator = 1 / singleProbability;

  const cumulativeProbability =
    input.progress <= 0 ? 0 : 1 - Math.pow(1 - singleProbability, input.progress);

  return {
    oddsDenominator,
    singleProbability,
    cumulativeProbability,
    extras: {
      rolls,
      guaranteedPerfectIVs: 2,
      hiddenAbilityChance: "Available in unlocked third-slot safaris",
    },
  };
}

export const friendSafariMethod: HuntMethodDefinition = {
  id: "friend_safari",
  label: "Friend Safari",
  calculate,
};