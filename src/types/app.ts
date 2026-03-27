import type { MethodId } from "./method";

export type GenerationOption = {
  value: string;
  label: string;
};

export type AppState = {
  method: MethodId;
  generation: string;
  shinyCharm: boolean;
  randomBoost: boolean;
  progress: number;
  startSearchLevel: number;
  pokemonQuery: string;
  targetPokemon: string;
};