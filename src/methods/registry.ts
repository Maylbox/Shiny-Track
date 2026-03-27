import { dexnavMethod } from "./dexnav";
import { hordeMethod } from "./horde";
import { randomMethod } from "./random";

export const METHOD_OPTIONS = [
  { value: "random", label: "Random / Soft Reset" },
  { value: "dexnav", label: "DexNav" },
  { value: "horde", label: "Horde Encounters" },
];

export const METHOD_REGISTRY = {
  random: randomMethod,
  dexnav: dexnavMethod,
  horde: hordeMethod,
};