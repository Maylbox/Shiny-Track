import { useEffect, useMemo, useState } from "react";
import { Sparkles, Settings2 } from "lucide-react";
import Select from "./components/Select";
import Stepper from "./components/Stepper";
import HuntPanel from "./components/HuntPanel";
import PokemonPanel from "./components/PokemonPanel";
import MethodSummary, { DexNavBonusPanel } from "./components/MethodSummary";
import { GEN_OPTIONS } from "./data/generations";
import { METHOD_OPTIONS, METHOD_REGISTRY } from "./methods/registry";
import { clamp } from "./utils/math";
import { titleCasePokemonName } from "./utils/pokemon";

export default function App() {
  const [method, setMethod] = useState<"random" | "dexnav">("dexnav");
  const [generation, setGeneration] = useState("6");
  const [shinyCharm, setShinyCharm] = useState(true);
  const [randomBoost, setRandomBoost] = useState(false);
  const [progress, setProgress] = useState(0);
  const [startSearchLevel, setStartSearchLevel] = useState(0);
  const [pokemonQuery, setPokemonQuery] = useState("ralts");
  const [targetPokemon, setTargetPokemon] = useState("ralts");
  const [spriteOk, setSpriteOk] = useState(true);

  useEffect(() => {
    setSpriteOk(true);
  }, [targetPokemon]);

  const chain = useMemo(() => progress, [progress]);

  const searchLevel = useMemo(() => {
    return clamp(startSearchLevel + progress, 0, 999);
  }, [startSearchLevel, progress]);

  const effectiveDexNavGain = useMemo(() => {
    return Math.max(0, searchLevel - startSearchLevel);
  }, [searchLevel, startSearchLevel]);

  const calculation = useMemo(() => {
    return METHOD_REGISTRY[method].calculate({
      shinyCharm,
      progress,
      startSearchLevel,
      randomBoost,
    });
  }, [method, shinyCharm, progress, startSearchLevel, randomBoost]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#1d4ed8_0%,#60a5fa_45%,#fef08a_46%,#fde68a_100%)] px-3 py-3 text-slate-900 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 sm:mb-6 rounded-[24px] sm:rounded-[28px] border-4 border-slate-900 bg-white/90 p-4 sm:p-5 shadow-[6px_6px_0_0_rgba(15,23,42,1)] sm:shadow-[8px_8px_0_0_rgba(15,23,42,1)] backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-sky-700">
                <Sparkles className="h-4 w-4" /> ORAS Shiny Hunter
              </div>
              <h1 className="mt-2 text-2xl font-black leading-tight sm:text-5xl">Pixel hunt tracker</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
                Start with ORAS DexNav and soft resets now, then expand later into other generations and methods.
              </p>
            </div>

            <div className="rounded-2xl border-4 border-slate-900 bg-yellow-200 px-4 py-3 text-center shadow-[5px_5px_0_0_rgba(15,23,42,1)]">
              <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] text-slate-700">
                Current target
              </div>
              <div className="mt-1 text-xl sm:text-2xl font-black break-words">
                {titleCasePokemonName(targetPokemon)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 xl:grid-cols-[340px,1fr]">
          <aside className="space-y-4">
            <div className="rounded-[24px] sm:rounded-[28px] border-4 border-slate-900 bg-emerald-200 p-4 shadow-[6px_6px_0_0_rgba(15,23,42,1)] sm:shadow-[8px_8px_0_0_rgba(15,23,42,1)]">
              <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em]">
                <Settings2 className="h-4 w-4" /> Settings
              </div>

              <div className="space-y-3">
                <Select label="Generation" value={generation} onChange={setGeneration} options={GEN_OPTIONS} />
                <Select label="Method" value={method} onChange={(value) => setMethod(value as "random" | "dexnav")} options={METHOD_OPTIONS} />

                <div className="rounded-2xl border-4 border-slate-900 bg-white p-3 shadow-[5px_5px_0_0_rgba(15,23,42,1)]">
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Shiny Charm</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setShinyCharm(true)}
                      className={`rounded-xl border-4 px-3 py-2 text-sm font-black transition ${
                        shinyCharm ? "border-slate-900 bg-emerald-300" : "border-slate-300 bg-slate-100"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setShinyCharm(false)}
                      className={`rounded-xl border-4 px-3 py-2 text-sm font-black transition ${
                        !shinyCharm ? "border-slate-900 bg-rose-300" : "border-slate-300 bg-slate-100"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <Stepper label="Current progress" value={progress} onChange={setProgress} max={999999} />

            {method === "dexnav" ? (
              <>
                <Stepper
                  label="Start search level"
                  value={startSearchLevel}
                  onChange={(value) => setStartSearchLevel(clamp(value, 0, 999))}
                  max={999}
                />

                <div className="rounded-2xl border-4 border-slate-900 bg-white p-4 shadow-[5px_5px_0_0_rgba(15,23,42,1)]">
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                    Current search level
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">{searchLevel}</div>
                  <div className="mt-1 text-xs text-slate-600">
                    Auto-calculated from start search level + encounters.
                  </div>
                </div>

                <div className="rounded-2xl border-4 border-slate-900 bg-white p-4 shadow-[5px_5px_0_0_rgba(15,23,42,1)]">
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                    Current chain
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">{chain}</div>
                  <div className="mt-1 text-xs text-slate-600">
                    Automatically linked to encounter count.
                  </div>
                </div>

                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border-4 border-slate-900 bg-white p-4 shadow-[5px_5px_0_0_rgba(15,23,42,1)]">
                  <input
                    type="checkbox"
                    checked={randomBoost}
                    onChange={(e) => setRandomBoost(e.target.checked)}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-sky-600"
                  />
                  <div>
                    <div className="text-sm font-black">Apply 4% random DexNav boost</div>
                    <div className="text-xs text-slate-600">
                      Use this when you want to model the boosted encounter case.
                    </div>
                  </div>
                </label>
              </>
            ) : null}
          </aside>

          <main className="space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.05fr,0.95fr]">
              <div className="space-y-4">
                <PokemonPanel
                  pokemonQuery={pokemonQuery}
                  setPokemonQuery={setPokemonQuery}
                  targetPokemon={targetPokemon}
                  setTargetPokemon={setTargetPokemon}
                  spriteOk={spriteOk}
                  setSpriteOk={setSpriteOk}
                />

                <section className="rounded-[24px] sm:rounded-[28px] border-4 border-slate-900 bg-slate-900 p-4 sm:p-5 text-white shadow-[6px_6px_0_0_rgba(15,23,42,1)] sm:shadow-[8px_8px_0_0_rgba(15,23,42,1)]">
                  <HuntPanel
                    progress={progress}
                    setProgress={setProgress}
                    oddsDenominator={calculation.oddsDenominator}
                    cumulativeProbability={calculation.cumulativeProbability}
                  />
                </section>
              </div>

              <MethodSummary
                method={method}
                shinyCharm={shinyCharm}
                randomBoost={randomBoost}
                searchLevel={searchLevel}
                startSearchLevel={startSearchLevel}
                effectiveDexNavGain={effectiveDexNavGain}
                chain={chain}
              />
            </div>

            {method === "dexnav" ? (
              <DexNavBonusPanel
                searchLevel={searchLevel}
                startSearchLevel={startSearchLevel}
                effectiveDexNavGain={effectiveDexNavGain}
              />
            ) : null}

            <section className="rounded-[24px] sm:rounded-[28px] border-4 border-slate-900 bg-white p-4 sm:p-5 shadow-[6px_6px_0_0_rgba(15,23,42,1)] sm:shadow-[8px_8px_0_0_rgba(15,23,42,1)]">
              <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.24em] sm:tracking-[0.28em] text-slate-700">
                Starter roadmap
              </div>
              <h2 className="mt-1 text-xl sm:text-2xl font-black">What to build next</h2>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border-4 border-slate-900 bg-yellow-100 p-4">
                  <div className="text-sm font-black">1. Save hunts locally</div>
                  <p className="mt-2 text-sm text-slate-700">
                    Store progress, target, method, charm, search level, and chain in localStorage so the tracker survives refreshes.
                  </p>
                </div>

                <div className="rounded-2xl border-4 border-slate-900 bg-emerald-100 p-4">
                  <div className="text-sm font-black">2. Add more methods</div>
                  <p className="mt-2 text-sm text-slate-700">
                    Masuda, Friend Safari, Pokeradar, full odds, SOS, chain fishing, sandwiches later for newer games.
                  </p>
                </div>

                <div className="rounded-2xl border-4 border-slate-900 bg-sky-100 p-4">
                  <div className="text-sm font-black">3. Add game-specific logic</div>
                  <p className="mt-2 text-sm text-slate-700">
                    Each generation should define its own methods, odds rules, and UI panels so the app scales cleanly.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}