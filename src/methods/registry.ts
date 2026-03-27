import type { MethodOption } from "../types/method";
import { chainFishingMethod } from "./chainfishing";
import { dexnavMethod } from "./dexnav";
import { friendSafariMethod } from "./friendsafari";
import { hordeMethod } from "./horde";
import { masudaMethod } from "./masuda";
import { randomMethod } from "./random";

export const METHOD_OPTIONS: MethodOption[] = [
  { value: "random", label: "Random / Soft Reset" },
  { value: "dexnav", label: "DexNav" },
  { value: "horde", label: "Horde Encounters" },
  { value: "masuda", label: "Masuda Method" },
  { value: "chain_fishing", label: "Chain Fishing" },
  { value: "friend_safari", label: "Friend Safari" },
];

export const METHOD_REGISTRY = {
  random: randomMethod,
  dexnav: dexnavMethod,
  horde: hordeMethod,
  masuda: masudaMethod,
  chain_fishing: chainFishingMethod,
  friend_safari: friendSafariMethod,
};