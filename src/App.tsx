import { useEffect, useMemo, useState } from "react";
import { Search, Sparkles, Plus, Minus, RotateCcw, Settings2, ChevronDown } from "lucide-react";

const DEXNAV_TABLE = {
  noCharm: [
    { min: 0, max: 0, normal: 4096.0, chain5: 4096.0, boost4: 4096.0, chain50: 4096.0, chain100: 4096.0 },
    { min: 1, max: 16, normal: 2906.0, chain5: 1344.23, boost4: 804.22, chain50: 573.81, chain100: 573.81 },
    { min: 17, max: 33, normal: 2251.79, chain5: 804.18, boost4: 446.06, chain50: 308.72, chain100: 308.72 },
    { min: 34, max: 50, normal: 1838.01, chain5: 573.76, boost4: 308.7, chain50: 211.26, chain100: 211.26 },
    { min: 51, max: 66, normal: 1552.69, chain5: 446.02, boost4: 236.07, chain50: 160.62, chain100: 160.62 },
    { min: 67, max: 83, normal: 1344.05, chain5: 364.83, boost4: 191.14, chain50: 129.6, chain100: 129.6 },
    { min: 84, max: 100, normal: 1184.84, chain5: 308.66, boost4: 160.6, chain50: 108.65, chain100: 108.65 },
    { min: 101, max: 150, normal: 1059.36, chain5: 267.49, boost4: 138.5, chain50: 93.54, chain100: 93.54 },
    { min: 151, max: 200, normal: 957.9, chain5: 236.03, boost4: 121.75, chain50: 82.14, chain100: 82.14 },
    { min: 201, max: 300, normal: 874.19, chain5: 211.2, boost4: 108.63, chain50: 73.23, chain100: 73.23 },
    { min: 301, max: 400, normal: 803.93, chain5: 191.1, boost4: 98.07, chain50: 66.07, chain100: 66.07 },
    { min: 401, max: 500, normal: 744.12, chain5: 174.5, boost4: 89.39, chain50: 60.19, chain100: 60.19 },
    { min: 501, max: 600, normal: 692.59, chain5: 160.56, boost4: 82.12, chain50: 55.28, chain100: 55.28 },
    { min: 601, max: 700, normal: 647.74, chain5: 148.68, boost4: 75.96, chain50: 51.12, chain100: 51.12 },
    { min: 701, max: 800, normal: 608.35, chain5: 138.45, boost4: 70.66, chain50: 47.54, chain100: 47.54 },
    { min: 801, max: 900, normal: 573.47, chain5: 129.54, boost4: 66.05, chain50: 44.44, chain100: 44.44 },
    { min: 901, max: 999, normal: 542.37, chain5: 121.7, boost4: 62.01, chain50: 41.72, chain100: 41.72 },
  ],
  charm: [
    { min: 0, max: 0, normal: 1365.67, chain5: 1365.67, boost4: 1365.67, chain50: 1365.67, chain100: 1365.67 },
    { min: 1, max: 16, normal: 969.0, chain5: 698.56, boost4: 517.95, chain50: 411.58, chain100: 411.58 },
    { min: 17, max: 33, normal: 750.93, chain5: 469.4, boost4: 319.71, chain50: 242.46, chain100: 242.46 },
    { min: 34, max: 50, normal: 613.0, chain5: 353.5, boost4: 231.28, chain50: 171.93, chain100: 171.93 },
    { min: 51, max: 66, normal: 517.9, chain5: 283.54, boost4: 181.22, chain50: 133.23, chain100: 133.23 },
    { min: 67, max: 83, normal: 448.35, chain5: 236.72, boost4: 149.0, chain50: 108.79, chain100: 108.79 },
    { min: 84, max: 100, normal: 395.28, chain5: 203.19, boost4: 126.53, chain50: 91.95, chain100: 91.95 },
    { min: 101, max: 150, normal: 353.45, chain5: 177.99, boost4: 109.96, chain50: 79.64, chain100: 79.64 },
    { min: 151, max: 200, normal: 319.64, chain5: 158.36, boost4: 97.25, chain50: 70.25, chain100: 70.25 },
    { min: 201, max: 300, normal: 291.73, chain5: 142.64, boost4: 87.18, chain50: 62.85, chain100: 62.85 },
    { min: 301, max: 400, normal: 268.31, chain5: 129.77, boost4: 79.0, chain50: 56.87, chain100: 56.87 },
    { min: 401, max: 500, normal: 248.37, chain5: 119.03, boost4: 72.24, chain50: 51.93, chain100: 51.93 },
    { min: 501, max: 600, normal: 231.2, chain5: 109.94, boost4: 66.55, chain50: 47.79, chain100: 47.79 },
    { min: 601, max: 700, normal: 216.25, chain5: 102.14, boost4: 61.69, chain50: 44.27, chain100: 44.27 },
    { min: 701, max: 800, normal: 203.12, chain5: 95.38, boost4: 57.5, chain50: 41.24, chain100: 41.24 },
    { min: 801, max: 900, normal: 191.49, chain5: 89.47, boost4: 53.85, chain50: 38.6, chain100: 38.6 },
    { min: 901, max: 999, normal: 181.12, chain5: 84.24, boost4: 50.63, chain50: 36.28, chain100: 36.28 },
  ],
};

const BOOST_TABLE = [
  { min: 0, max: 4, hiddenAbility: 0, eggMove: 20, item50: 40, item5: 10, iv1: 0, iv2: 0, iv3: 0 },
  { min: 5, max: 9, hiddenAbility: 0, eggMove: 50, item50: 40, item5: 10, iv1: 10, iv2: 0, iv3: 0 },
  { min: 10, max: 24, hiddenAbility: 5, eggMove: 55, item50: 45, item5: 15, iv1: 15, iv2: 10, iv3: 0 },
  { min: 25, max: 49, hiddenAbility: 15, eggMove: 60, item50: 50, item5: 20, iv1: 20, iv2: 15, iv3: 5 },
  { min: 50, max: 99, hiddenAbility: 20, eggMove: 65, item50: 50, item5: 20, iv1: 15, iv2: 20, iv3: 5 },
  { min: 100, max: 999, hiddenAbility: 25, eggMove: 80, item50: 50, item5: 30, iv1: 10, iv2: 25, iv3: 10 },
];

const METHOD_OPTIONS = [
  { value: "random", label: "Random / Soft Reset" },
  { value: "dexnav", label: "DexNav" },
];

const GEN_OPTIONS = [{ value: "6", label: "Gen 6 (ORAS / XY era)" }];

const STARTERS = [
  "ralts",
  "poochyena",
  "zigzagoon",
  "skitty",
  "pikachu",
  "shuppet",
  "absol",
  "zubat",
  "oddish",
  "seedot",
  "pelipper",
  "bagon",
];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function titleCasePokemonName(name: string) {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatPercent(probability: number) {
  return `${(probability * 100).toFixed(probability >= 0.1 ? 1 : 2)}%`;
}

function formatOdds(denominator: number) {
  return `1/${denominator.toFixed(2).replace(/\.00$/, "")}`;
}

function getDexNavBracket(level: number, shinyCharm: boolean) {
  const safeLevel = clamp(level, 0, 999);
  const rows = shinyCharm ? DEXNAV_TABLE.charm : DEXNAV_TABLE.noCharm;
  return rows.find((row) => safeLevel >= row.min && safeLevel <= row.max) ?? rows[0];
}

function getDexNavBoosts(level: number) {
  const safeLevel = clamp(level, 0, 999);
  return BOOST_TABLE.find((row) => safeLevel >= row.min && safeLevel <= row.max) ?? BOOST_TABLE[0];
}

function getDexNavOdds({
  searchLevel,
  chain,
  shinyCharm,
  randomBoost,
}: {
  searchLevel: number;
  chain: number;
  shinyCharm: boolean;
  randomBoost: boolean;
}) {
  const row = getDexNavBracket(searchLevel, shinyCharm);

  if (chain === 100) return row.chain100;
  if (chain === 50) return row.chain50;
  if (chain > 0 && chain % 5 === 0) return randomBoost ? row.boost4 : row.chain5;
  return randomBoost ? row.boost4 : row.normal;
}

function getBaseOdds(method: string, shinyCharm: boolean) {
  if (method === "dexnav") {
    return shinyCharm ? 1365.67 : 4096;
  }
  return shinyCharm ? 1365.67 : 4096;
}

function getSpriteUrl(name: string) {
  if (!name) return "";
  const normalized = name.trim().toLowerCase();
  return `https://play.pokemonshowdown.com/sprites/ani/${normalized}.gif`;
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border-4 border-slate-900 bg-slate-100 p-3 sm:p-4 shadow-[5px_5px_0_0_rgba(15,23,42,1)]">
      <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-xl font-black text-slate-900 sm:text-3xl break-words">{value}</div>
      {sub ? <div className="mt-1 text-xs text-slate-600">{sub}</div> : null}
    </div>
  );
}

function Stepper({
  label,
  value,
  onChange,
  min = 0,
  max = 999999,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="rounded-2xl border-4 border-slate-900 bg-white p-3 shadow-[5px_5px_0_0_rgba(15,23,42,1)]">
      <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{label}</div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(clamp(value - 1, min, max))}
          className="shrink-0 rounded-xl border-4 border-slate-900 bg-slate-200 p-2 transition hover:-translate-y-0.5"
        >
          <Minus className="h-4 w-4" />
        </button>

        <input
          value={value}
          onChange={(e) => onChange(clamp(Number(e.target.value || 0), min, max))}
          className="min-w-0 flex-1 rounded-xl border-4 border-slate-900 bg-yellow-100 px-2 sm:px-3 py-2 text-center text-base sm:text-lg font-black outline-none"
          type="number"
          min={min}
          max={max}
        />

        <button
          onClick={() => onChange(clamp(value + 1, min, max))}
          className="shrink-0 rounded-xl border-4 border-slate-900 bg-slate-200 p-2 transition hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block rounded-2xl border-4 border-slate-900 bg-white p-3 shadow-[5px_5px_0_0_rgba(15,23,42,1)]">
      <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{label}</div>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border-4 border-slate-900 bg-sky-100 px-3 py-2 pr-10 text-sm font-bold outline-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
      </div>
    </label>
  );
}

export default function App() {
  const [method, setMethod] = useState("dexnav");
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

  const oddsDenominator = useMemo(() => {
    if (method === "dexnav") {
      return getDexNavOdds({ searchLevel, chain, shinyCharm, randomBoost });
    }
    return getBaseOdds(method, shinyCharm);
  }, [method, searchLevel, chain, shinyCharm, randomBoost]);

  const singleProbability = useMemo(() => 1 / oddsDenominator, [oddsDenominator]);

  const cumulativeProbability = useMemo(() => {
    if (progress <= 0) return 0;
    return 1 - Math.pow(1 - singleProbability, progress);
  }, [progress, singleProbability]);

  const boosts = useMemo(() => getDexNavBoosts(searchLevel), [searchLevel]);
  const spriteUrl = useMemo(() => getSpriteUrl(targetPokemon), [targetPokemon]);

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
                <Select label="Method" value={method} onChange={setMethod} options={METHOD_OPTIONS} />

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

                <div className="rounded-2xl border-4 border-slate-900 bg-white p-3 shadow-[5px_5px_0_0_rgba(15,23,42,1)]">
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Target Pokémon</div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="relative flex-1">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        value={pokemonQuery}
                        onChange={(e) => setPokemonQuery(e.target.value.toLowerCase())}
                        placeholder="ralts"
                        className="w-full rounded-xl border-4 border-slate-900 bg-sky-100 py-2 pl-9 pr-3 text-sm font-bold outline-none"
                      />
                    </div>

                    <button
                      onClick={() => setTargetPokemon(pokemonQuery.trim().toLowerCase() || "ralts")}
                      className="rounded-xl border-4 border-slate-900 bg-slate-900 px-4 py-2 text-sm font-black text-white transition hover:-translate-y-0.5"
                    >
                      Set
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {STARTERS.map((name) => (
                      <button
                        key={name}
                        onClick={() => {
                          setPokemonQuery(name);
                          setTargetPokemon(name);
                        }}
                        className="rounded-full border-4 border-slate-900 bg-yellow-100 px-3 py-1 text-[11px] sm:text-xs font-black uppercase tracking-[0.12em] transition hover:-translate-y-0.5"
                      >
                        {titleCasePokemonName(name)}
                      </button>
                    ))}
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
              <section className="rounded-[24px] sm:rounded-[28px] border-4 border-slate-900 bg-slate-900 p-4 sm:p-5 text-white shadow-[6px_6px_0_0_rgba(15,23,42,1)] sm:shadow-[8px_8px_0_0_rgba(15,23,42,1)]">
                <div className="grid gap-4 md:grid-cols-[260px,1fr] md:items-center lg:grid-cols-[280px,1fr]">
                  <div className="rounded-[22px] sm:rounded-[24px] border-4 border-white/20 bg-[linear-gradient(180deg,#0f172a_0%,#1e293b_100%)] p-3 sm:p-4">
                    <div className="flex aspect-square min-h-[230px] sm:min-h-[300px] md:min-h-[340px] items-center justify-center overflow-hidden rounded-[18px] sm:rounded-[20px] border-4 border-dashed border-white/20 bg-slate-800">
                      {spriteUrl && spriteOk ? (
                        <img
                          src={spriteUrl}
                          alt={targetPokemon}
                          onError={() => setSpriteOk(false)}
                          className="max-h-[220px] scale-[2.1] sm:max-h-[360px] sm:scale-[3] md:max-h-[420px] md:scale-[3.5] origin-center image-rendering-pixelated [image-rendering:pixelated]"
                        />
                      ) : (
                        <div className="px-3 text-center">
                          <div className="text-base sm:text-lg font-black">No sprite found</div>
                          <div className="mt-1 text-xs sm:text-sm text-slate-300">
                            Try a standard Pokémon name like ralts or poochyena.
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 sm:mt-4 text-center text-lg sm:text-xl font-black">
                      {titleCasePokemonName(targetPokemon)}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-sky-300">
                      Live hunt panel
                    </div>
                    <div className="mt-2 sm:mt-3 text-5xl sm:text-6xl md:text-7xl font-black leading-none">
                      {progress.toLocaleString()}
                    </div>
                    <div className="mt-2 text-xs sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.22em] text-slate-300">
                      encounters
                    </div>

                    <div className="mt-4 sm:mt-5 grid gap-3 sm:grid-cols-2">
                      <StatCard label="Current odds" value={formatOdds(oddsDenominator)} sub="Per encounter" />
                      <StatCard
                        label="Hit chance"
                        value={formatPercent(cumulativeProbability)}
                        sub={`At least one shiny in ${progress.toLocaleString()} encounters`}
                      />
                    </div>

                    <div className="mt-4 sm:mt-5 grid gap-3 sm:grid-cols-3">
                      <button
                        onClick={() => setProgress((v) => v + 1)}
                        className="w-full rounded-2xl border-4 border-slate-900 bg-emerald-300 px-4 py-3 text-sm font-black text-slate-900 shadow-[5px_5px_0_0_rgba(255,255,255,0.2)] transition hover:-translate-y-0.5"
                      >
                        +1 Encounter
                      </button>
                      <button
                        onClick={() => setProgress((v) => v + 10)}
                        className="w-full rounded-2xl border-4 border-slate-900 bg-yellow-300 px-4 py-3 text-sm font-black text-slate-900 shadow-[5px_5px_0_0_rgba(255,255,255,0.2)] transition hover:-translate-y-0.5"
                      >
                        +10 Encounters
                      </button>
                      <button
                        onClick={() => setProgress(0)}
                        className="w-full rounded-2xl border-4 border-slate-900 bg-rose-300 px-4 py-3 text-sm font-black text-slate-900 shadow-[5px_5px_0_0_rgba(255,255,255,0.2)] transition hover:-translate-y-0.5"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <RotateCcw className="h-4 w-4" /> Reset
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

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
                    <StatCard label="Base shiny rate" value={formatOdds(getBaseOdds(method, shinyCharm))} sub="Gen 6 standard odds" />
                  )}
                </div>
              </section>
            </div>

            {method === "dexnav" ? (
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