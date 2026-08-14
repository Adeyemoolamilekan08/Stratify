import type { ReactNode } from 'react';
export function DataTable({ children }: { children: ReactNode }) { return <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">{children}</div>; }
export default DataTable;
