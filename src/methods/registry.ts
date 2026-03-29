import type { MethodOption } from "../types/method";
import { chainFishingMethod } from "./chainfishing";
import { dexnavMethod } from "./dexnav";
import { friendSafariMethod } from "./friendsafari";
import { hordeMethod } from "./horde";
import { masudaMethod } from "./masuda";
import { randomMethod } from "./random";

export const METHOD_OPTIONS: MethodOption[] = [
  { value: "random", label: "Random / Soft Reset", generations: ["6", "7"] },
  { value: "dexnav", label: "DexNav", generations: ["6"] },
  { value: "horde", label: "Horde Encounters", generations: ["6"] },
  { value: "masuda", label: "Masuda Method", generations: ["6", "7"] },
  { value: "chain_fishing", label: "Chain Fishing", generations: ["6"] },
  { value: "friend_safari", label: "Friend Safari", generations: ["6"] },
];

export const METHOD_REGISTRY = {
  random: randomMethod,
  dexnav: dexnavMethod,
  horde: hordeMethod,
  masuda: masudaMethod,
  chain_fishing: chainFishingMethod,
  friend_safari: friendSafariMethod,
};