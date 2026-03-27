import { RotateCcw } from "lucide-react";
import StatCard from "./StatCard";
import { formatOdds, formatPercent } from "../utils/format";

type HuntPanelProps = {
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  oddsDenominator: number;
  cumulativeProbability: number;
};

export default function HuntPanel({
  progress,
  setProgress,
  oddsDenominator,
  cumulativeProbability,
}: HuntPanelProps) {
  return (
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
          sub={`Of at least one shiny in ${progress.toLocaleString()} encounters`}
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
  );
}