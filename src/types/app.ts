import type { MethodId } from "./method";

export type GenerationId = "6" | "7";

export type GenerationOption = {
  value: GenerationId;
  label: string;
};

export type AppState = {
  method: MethodId;
  generation: GenerationId;
  shinyCharm: boolean;
  randomBoost: boolean;
  progress: number;
  startSearchLevel: number;
  pokemonQuery: string;
  targetPokemon: string;
};