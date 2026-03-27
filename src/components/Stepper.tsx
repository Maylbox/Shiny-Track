import { Minus, Plus } from "lucide-react";
import { clamp } from "../utils/math";

type StepperProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

export default function Stepper({
  label,
  value,
  onChange,
  min = 0,
  max = 999999,
}: StepperProps) {
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