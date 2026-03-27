type StatCardProps = {
  label: string;
  value: string;
  sub?: string;
};

export default function StatCard({ label, value, sub }: StatCardProps) {
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