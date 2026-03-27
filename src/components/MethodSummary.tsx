import StatCard from "./StatCard";
import { formatOdds } from "../utils/format";
import { getDexNavBoosts, getDexNavBracket } from "../methods/dexnav";
import { METHOD_OPTIONS } from "../methods/registry";

type MethodSummaryProps = {
  method: "random" | "dexnav";
  shinyCharm: boolean;
  randomBoost: boolean;
  searchLevel: number;
  startSearchLevel: number;
  effectiveDexNavGain: number;
  chain: number;
};

export default function MethodSummary({
  method,
  shinyCharm,
  randomBoost,
  searchLevel,
  startSearchLevel,
  effectiveDexNavGain,
  chain,
}: MethodSummaryProps) {
  return (
    <section className="rounded-[24px] sm:rounded-[28px] border-4 border-slate-900 bg-pink-200 p-4 sm:p-5 shadow-[6px_6px_0_0_rgba(15,23,42,1)] sm:shadow-[8px_8px_0_0_rgba(15,23,42,1)]">
      <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.24em] sm:tracking-[0.28em] text-slate-700">
        Method summary
      </div>

      <div className="mt-2 text-xl sm:text-2xl font-black">
        {METHOD_OPTIONS.find((m) => m.value === method)?.label}
      </div>

      <div className="mt-4 grid gap-3">
        <StatCard label="Charm" value={shinyCharm ? "Enabled" : "Disabled"} />

        {method === "dexnav" ? (
          <>
            <StatCard
              label="Search level bracket"
              value={`${getDexNavBracket(searchLevel, shinyCharm).min}-${getDexNavBracket(searchLevel, shinyCharm).max}`}
              sub={`Started at ${startSearchLevel}`}
            />
            <StatCard
              label="Search level gain"
              value={`+${effectiveDexNavGain}`}
              sub={`Current ${searchLevel} • Start ${startSearchLevel}`}
            />
            <StatCard
              label="Chain state"
              value={
                chain === 100
                  ? "Chain 100"
                  : chain === 50
                    ? "Chain 50"
                    : chain > 0 && chain % 5 === 0
                      ? "Multiple of 5"
                      : "Normal"
              }
              sub={randomBoost ? "4% boost applied where relevant" : "Standard calculation"}
            />
          </>
        ) : (
          <StatCard label="Base shiny rate" value={formatOdds(shinyCharm ? 1365.67 : 4096)} sub="Gen 6 standard odds" />
        )}
      </div>
    </section>
  );
}

export function DexNavBonusPanel({
  searchLevel,
  startSearchLevel,
  effectiveDexNavGain,
}: {
  searchLevel: number;
  startSearchLevel: number;
  effectiveDexNavGain: number;
}) {
  const boosts = getDexNavBoosts(searchLevel);

  return (
    <section className="rounded-[24px] sm:rounded-[28px] border-4 border-slate-900 bg-cyan-100 p-4 sm:p-5 shadow-[6px_6px_0_0_rgba(15,23,42,1)] sm:shadow-[8px_8px_0_0_rgba(15,23,42,1)]">
      <div className="mb-4">
        <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.24em] sm:tracking-[0.28em] text-slate-700">
          DexNav bonus panel
        </div>
        <h2 className="mt-1 text-xl sm:text-2xl font-black">
          Extra encounter perks at search level {searchLevel}
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Started this chain at {startSearchLevel}, so your net gain is +{effectiveDexNavGain} search levels.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Hidden Ability" value={`${boosts.hiddenAbility}%`} />
        <StatCard label="Egg Move" value={`${boosts.eggMove}%`} />
        <StatCard label='"50%" Item Rate' value={`${boosts.item50}%`} />
        <StatCard label='"5%" Item Rate' value={`${boosts.item5}%`} />
        <StatCard label="1 IV Potential" value={`${boosts.iv1}%`} />
        <StatCard label="2 IV Potential" value={`${boosts.iv2}%`} sub={`3 IV: ${boosts.iv3}%`} />
      </div>
    </section>
  );
}