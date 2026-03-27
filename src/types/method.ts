export type MethodId = "random" | "dexnav" | "horde";

export type MethodCalculationInput = {
  shinyCharm: boolean;
  progress: number;
  startSearchLevel?: number;
  randomBoost?: boolean;
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
};

export type HuntMethodDefinition = {
  id: MethodId;
  label: string;
  calculate: (input: MethodCalculationInput) => MethodCalculationResult;
};