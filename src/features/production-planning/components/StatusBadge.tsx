export function StatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase();
  const cls = key.includes('complete') ? 'bg-emerald-50 text-emerald-700' : key.includes('delay') ? 'bg-red-50 text-red-700' : key.includes('progress') ? 'bg-orange-50 text-orange-700' : 'bg-slate-100 text-slate-600';
  return <span className={`rounded-full px-2 py-1 text-xs font-semibold ${cls}`}>{status}</span>;
}
