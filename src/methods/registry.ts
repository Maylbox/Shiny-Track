import { HordeMethod } from "./horde";
import { DexNavMethod } from "./dexnav";
import { RandomMethod } from "./random";

export const METHODS = [
  RandomMethod,
  DexNavMethod,
  HordeMethod, 
];

export const METHOD_OPTIONS = [
  { value: "random", label: "Random / Soft Reset" },
  { value: "dexnav", label: "DexNav" },
  { value: "horde", label: "Horde Encounters" },
];