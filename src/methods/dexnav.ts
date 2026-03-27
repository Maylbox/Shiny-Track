import type { HuntMethodDefinition, MethodCalculationInput, MethodCalculationResult } from "../types/method";
import { clamp } from "../utils/math";

export const DEXNAV_TABLE = {
  noCharm: [
    { min: 0, max: 0, normal: 4096.0, chain5: 4096.0, boost4: 4096.0, chain50: 4096.0, chain100: 4096.0 },
    { min: 1, max: 16, normal: 2906.0, chain5: 1344.23, boost4: 804.22, chain50: 573.81, chain100: 573.81 },
    { min: 17, max: 33, normal: 2251.79, chain5: 804.18, boost4: 446.06, chain50: 308.72, chain100: 308.72 },
    { min: 34, max: 50, normal: 1838.01, chain5: 573.76, boost4: 308.7, chain50: 211.26, chain100: 211.26 },
    { min: 51, max: 66, normal: 1552.69, chain5: 446.02, boost4: 236.07, chain50: 160.62, chain100: 160.62 },
    { min: 67, max: 83, normal: 1344.05, chain5: 364.83, boost4: 191.14, chain50: 129.6, chain100: 129.6 },
    { min: 84, max: 100, normal: 1184.84, chain5: 308.66, boost4: 160.6, chain50: 108.65, chain100: 108.65 },
    { min: 101, max: 150, normal: 1059.36, chain5: 267.49, boost4: 138.5, chain50: 93.54, chain100: 93.54 },
    { min: 151, max: 200, normal: 957.9, chain5: 236.03, boost4: 121.75, chain50: 82.14, chain100: 82.14 },
    { min: 201, max: 300, normal: 874.19, chain5: 211.2, boost4: 108.63, chain50: 73.23, chain100: 73.23 },
    { min: 301, max: 400, normal: 803.93, chain5: 191.1, boost4: 98.07, chain50: 66.07, chain100: 66.07 },
    { min: 401, max: 500, normal: 744.12, chain5: 174.5, boost4: 89.39, chain50: 60.19, chain100: 60.19 },
    { min: 501, max: 600, normal: 692.59, chain5: 160.56, boost4: 82.12, chain50: 55.28, chain100: 55.28 },
    { min: 601, max: 700, normal: 647.74, chain5: 148.68, boost4: 75.96, chain50: 51.12, chain100: 51.12 },
    { min: 701, max: 800, normal: 608.35, chain5: 138.45, boost4: 70.66, chain50: 47.54, chain100: 47.54 },
    { min: 801, max: 900, normal: 573.47, chain5: 129.54, boost4: 66.05, chain50: 44.44, chain100: 44.44 },
    { min: 901, max: 999, normal: 542.37, chain5: 121.7, boost4: 62.01, chain50: 41.72, chain100: 41.72 },
  ],
  charm: [
    { min: 0, max: 0, normal: 1365.67, chain5: 1365.67, boost4: 1365.67, chain50: 1365.67, chain100: 1365.67 },
    { min: 1, max: 16, normal: 969.0, chain5: 698.56, boost4: 517.95, chain50: 411.58, chain100: 411.58 },
    { min: 17, max: 33, normal: 750.93, chain5: 469.4, boost4: 319.71, chain50: 242.46, chain100: 242.46 },
    { min: 34, max: 50, normal: 613.0, chain5: 353.5, boost4: 231.28, chain50: 171.93, chain100: 171.93 },
    { min: 51, max: 66, normal: 517.9, chain5: 283.54, boost4: 181.22, chain50: 133.23, chain100: 133.23 },
    { min: 67, max: 83, normal: 448.35, chain5: 236.72, boost4: 149.0, chain50: 108.79, chain100: 108.79 },
    { min: 84, max: 100, normal: 395.28, chain5: 203.19, boost4: 126.53, chain50: 91.95, chain100: 91.95 },
    { min: 101, max: 150, normal: 353.45, chain5: 177.99, boost4: 109.96, chain50: 79.64, chain100: 79.64 },
    { min: 151, max: 200, normal: 319.64, chain5: 158.36, boost4: 97.25, chain50: 70.25, chain100: 70.25 },
    { min: 201, max: 300, normal: 291.73, chain5: 142.64, boost4: 87.18, chain50: 62.85, chain100: 62.85 },
    { min: 301, max: 400, normal: 268.31, chain5: 129.77, boost4: 79.0, chain50: 56.87, chain100: 56.87 },
    { min: 401, max: 500, normal: 248.37, chain5: 119.03, boost4: 72.24, chain50: 51.93, chain100: 51.93 },
    { min: 501, max: 600, normal: 231.2, chain5: 109.94, boost4: 66.55, chain50: 47.79, chain100: 47.79 },
    { min: 601, max: 700, normal: 216.25, chain5: 102.14, boost4: 61.69, chain50: 44.27, chain100: 44.27 },
    { min: 701, max: 800, normal: 203.12, chain5: 95.38, boost4: 57.5, chain50: 41.24, chain100: 41.24 },
    { min: 801, max: 900, normal: 191.49, chain5: 89.47, boost4: 53.85, chain50: 38.6, chain100: 38.6 },
    { min: 901, max: 999, normal: 181.12, chain5: 84.24, boost4: 50.63, chain50: 36.28, chain100: 36.28 },
  ],
};

export const BOOST_TABLE = [
  { min: 0, max: 4, hiddenAbility: 0, eggMove: 20, item50: 40, item5: 10, iv1: 0, iv2: 0, iv3: 0 },
  { min: 5, max: 9, hiddenAbility: 0, eggMove: 50, item50: 40, item5: 10, iv1: 10, iv2: 0, iv3: 0 },
  { min: 10, max: 24, hiddenAbility: 5, eggMove: 55, item50: 45, item5: 15, iv1: 15, iv2: 10, iv3: 0 },
  { min: 25, max: 49, hiddenAbility: 15, eggMove: 60, item50: 50, item5: 20, iv1: 20, iv2: 15, iv3: 5 },
  { min: 50, max: 99, hiddenAbility: 20, eggMove: 65, item50: 50, item5: 20, iv1: 15, iv2: 20, iv3: 5 },
  { min: 100, max: 999, hiddenAbility: 25, eggMove: 80, item50: 50, item5: 30, iv1: 10, iv2: 25, iv3: 10 },
];

export function getDexNavBracket(level: number, shinyCharm: boolean) {
  const safeLevel = clamp(level, 0, 999);
  const rows = shinyCharm ? DEXNAV_TABLE.charm : DEXNAV_TABLE.noCharm;
  return rows.find((row) => safeLevel >= row.min && safeLevel <= row.max) ?? rows[0];
}

export function getDexNavBoosts(level: number) {
  const safeLevel = clamp(level, 0, 999);
  return BOOST_TABLE.find((row) => safeLevel >= row.min && safeLevel <= row.max) ?? BOOST_TABLE[0];
}

export function getDexNavOdds({
  searchLevel,
  chain,
  shinyCharm,
  randomBoost,
}: {
  searchLevel: number;
  chain: number;
  shinyCharm: boolean;
  randomBoost: boolean;
}) {
  const row = getDexNavBracket(searchLevel, shinyCharm);

  if (chain === 100) return row.chain100;
  if (chain === 50) return row.chain50;
  if (chain > 0 && chain % 5 === 0) return randomBoost ? row.boost4 : row.chain5;
  return randomBoost ? row.boost4 : row.normal;
}

function calculate(input: MethodCalculationInput): MethodCalculationResult {
  const searchLevel = clamp((input.startSearchLevel ?? 0) + input.progress, 0, 999);
  const chain = input.progress;
  const oddsDenominator = getDexNavOdds({
    searchLevel,
    chain,
    shinyCharm: input.shinyCharm,
    randomBoost: input.randomBoost ?? false,
  });
  const singleProbability = 1 / oddsDenominator;
  const cumulativeProbability =
    input.progress <= 0 ? 0 : 1 - Math.pow(1 - singleProbability, input.progress);

  return {
    oddsDenominator,
    singleProbability,
    cumulativeProbability,
    extras: {
      searchLevel,
      chain,
    },
  };
}

export const dexnavMethod: HuntMethodDefinition = {
  id: "dexnav",
  label: "DexNav",
  calculate,
};