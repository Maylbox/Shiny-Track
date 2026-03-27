import { ChevronDown } from "lucide-react";

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
};

export default function Select({ label, value, onChange, options }: SelectProps) {
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