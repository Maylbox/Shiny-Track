import type { MethodOption } from "../types/method";
import { dexnavMethod } from "./dexnav";
import { randomMethod } from "./random";

export const METHOD_OPTIONS: MethodOption[] = [
  { value: "random", label: "Random / Soft Reset" },
  { value: "dexnav", label: "DexNav" },
];

export const METHOD_REGISTRY = {
  random: randomMethod,
  dexnav: dexnavMethod,
};