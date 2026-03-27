import { Method } from "../types/method";

function getBaseOdds(shinyCharm: boolean) {
  return shinyCharm ? 1365.67 : 4096;
}

export const HordeMethod: Method = {
  id: "horde",
  label: "Horde Encounters",

  calculate({ shinyCharm }) {
    const base = getBaseOdds(shinyCharm);

    const effectiveOdds = base / 5;

    return {
      odds: effectiveOdds,
      probability: 1 / effectiveOdds,
      extra: {}
    };
  }
};