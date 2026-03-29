import type { GenerationId } from "./app";

export type MethodId =
  | "random"
  | "dexnav"
  | "horde"
  | "masuda"
  | "chain_fishing"
  | "friend_safari";

export type MethodCalculationInput = {
  shinyCharm: boolean;
  progress: number;

  // DexNav-specific
  startSearchLevel?: number;
  randomBoost?: boolean;

  // Optional generic chain support
  chain?: number;
};

export type MethodCalculationResult = {
  oddsDenominator: number;
  singleProbability: number;
  cumulativeProbability: number;
  extras?: Record<string, string | number>;
};

export type MethodOption = {
  value: MethodId;
  label: string;
  generations: GenerationId[];
};

export type HuntMethodDefinition = {
  id: MethodId;
  label: string;
  calculate: (input: MethodCalculationInput) => MethodCalculationResult;
};