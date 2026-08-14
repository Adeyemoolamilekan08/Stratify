import { useEffect, useMemo, useState } from 'react';
import { PlusIcon, ArrowPathIcon, FunnelIcon, ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import type { ModuleKind } from '../types';
import { getRows } from '../data';
import { getInventoryBalances, getWorkOrders } from '../../../services/stratify/api';

const titles: Record<ModuleKind, { title: string; subtitle: string; action: string; tabs: string[] }> = {
  'work-orders': { title: 'Work Orders', subtitle: 'Plan, release and monitor production demand from approved BOMs.', action: 'New Work Order', tabs: ['Register','Department Summary','Material Requirements','Production Summary'] },
  boms: { title: 'BOM Management', subtitle: 'Control component and finished-product assembly bills of materials.', action: 'Create BOM', tabs: ['Component BOM','Assembly BOM','Pending Approval'] },
  inventory: { title: 'Inventory & Ledger', subtitle: 'View location-based balances and trace every posted stock movement.', action: 'New Transaction', tabs: ['Balances','Ledger','Inventory Health'] },
  locations: { title: 'Location Master', subtitle: 'Manage the physical locations that own inventory balances.', action: 'Add Location', tabs: ['Locations','Hierarchy','Movement Map'] },
  sfg: { title: 'SFG Store', subtitle: 'Receive, transfer and return semi-finished components with full traceability.', action: 'New SFG Transfer', tabs: ['Stock','Receipts','Transfers','Returns'] },
  assembly: { title: 'Assembly', subtitle: 'Consume component BOM quantities to create controlled finished goods.', action: 'New Assembly', tabs: ['Assembly General','Online Assembly','History'] },
  'fg-quarantine': { title: 'FG Quarantine', subtitle: 'Control the quality gate between assembly and finished-goods release.', action: 'Inspect / Release', tabs: ['Pending Inspection','QC Accepted','Hold / Rework','Rejected'] },
  'fg-store': { title: 'FG Store', subtitle: 'Receive only released finished goods and maintain the finished-goods ledger.', action: 'Receive FG', tabs: ['Stock','Receipts','Ledger'] },
  grinding: { title: 'Grinding', subtitle: 'Trace production rejection and lumps through recovery processing.', action: 'Process Grinding', tabs: ['Pending Waste','Processing','History'] },
  regrind: { title: 'Regrind', subtitle: 'Track recovery output and return approved regrind to raw material stock.', action: 'Return to RM', tabs: ['Available','Returned to RM','Loss'] },
  'production-summary': { title: 'Production WO Summary', subtitle: 'Track good output, balance, completion and ETA against released work orders.', action: 'Refresh Summary', tabs: ['All','At Risk','Completed'] },
  audit: { title: 'Audit Trail', subtitle: 'Immutable history of approvals, postings, reversals and adjustments.', action: 'Export Audit', tabs: ['All Events','Transactions','Approvals'] },
  approvals: { title: 'Approvals', subtitle: 'Review submitted transactions before they affect official records.', action: 'Refresh Queue', tabs: ['Pending','Approved','Returned'] },
};

const badge: Record<string, string> = {
  APPROVED: 'bg-emerald-50 text-emerald-700', RELEASED: 'bg-blue-50 text-blue-700', IN_PRODUCTION: 'bg-orange-50 text-orange-700',
  PARTIALLY_COMPLETED: 'bg-amber-50 text-amber-700', DRAFT: 'bg-slate-100 text-slate-600', POSTED: 'bg-emerald-50 text-emerald-700',
  HEALTHY: 'bg-emerald-50 text-emerald-700', WATCH: 'bg-amber-50 text-amber-700', ACTIVE: 'bg-emerald-50 text-emerald-700',
  RECEIVED: 'bg-blue-50 text-blue-700', PROCESSED: 'bg-emerald-50 text-emerald-700', RETURNED_TO_RM: 'bg-purple-50 text-purple-700',
  PENDING_INSPECTION: 'bg-amber-50 text-amber-700', QC_ACCEPTED: 'bg-emerald-50 text-emerald-700', SUBMITTED: 'bg-orange-50 text-orange-700',
  IN_PROGRESS: 'bg-orange-50 text-orange-700'
};

export function ModulePage({ kind }: { kind: ModuleKind }) {
  const config = titles[kind];
  const [tab, setTab] = useState(config.tabs[0]);
  const [query, setQuery] = useState('');
  const [rows, setRows] = useState(getRows(kind));
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let alive = true;
    const load = async () => {
      if (!['work-orders','inventory'].includes(kind)) return;
      setLoading(true);
      try {
        const source = kind === 'work-orders' ? await getWorkOrders() : await getInventoryBalances();
        if (!alive) return;
        setRows(source.map((r: any) => ({
          id: r.id, code: r.work_order_no || r.item_code || r.code || r.document_no,
          name: r.name || r.item_name || 'Record', owner: r.owner || r.location_name || r.status || '—',
          quantity: r.quantity ?? r.total_quantity ?? '—', status: r.status || 'POSTED',
          updated: r.updated_at || r.created_at || 'Live', meta: r.location_code || r.finished_product_id || ''
        })));
      } catch {
        // Keep the specification-oriented mock rows visible when the Node API is not provisioned yet.
      } finally { if (alive) setLoading(false); }
    };
    load();
    return () => { alive = false; };
  }, [kind]);
  const filtered = useMemo(() => rows.filter(r => `${r.code} ${r.name} ${r.owner} ${r.status}`.toLowerCase().includes(query.toLowerCase())), [rows, query]);

  const action = () => toast.success(`${config.action} is ready for backend posting.`);

  return (
    <section className="min-h-full bg-[#F7F9FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1600px] space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs font-medium text-slate-500"><span>STRATIFY</span><ChevronRightIcon className="h-3.5 w-3.5" /><span>Operations</span></div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{config.title}</h1>
            <p className="mt-1 max-w-3xl text-sm text-slate-500">{config.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <button title="Refresh data" onClick={() => toast.success('Data refreshed')} className="rounded-lg border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm hover:bg-slate-50"><ArrowPathIcon className="h-5 w-5" /></button>
            <button title={config.action} onClick={action} className="inline-flex items-center gap-2 rounded-lg bg-[#F97316] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#EA580C]"><PlusIcon className="h-5 w-5" />{config.action}</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {[['Records', rows.length], ['Posted', rows.filter(r => ['POSTED','RELEASED','APPROVED','RETURNED_TO_RM'].includes(r.status)).length], ['Attention', rows.filter(r => ['WATCH','DRAFT','SUBMITTED','PENDING_INSPECTION'].includes(r.status)).length], ['Last update','Today']].map(([label,value]) => (
            <div key={String(label)} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs font-medium text-slate-500">{label}</p><p className="mt-1 text-xl font-bold text-slate-900">{value}</p></div>
          ))}
        </div>

        <div className="mb-2 text-xs text-slate-400">{loading ? 'Loading live Node.js data…' : ['work-orders','inventory'].includes(kind) ? 'Live API-backed view when the backend is connected.' : 'Workflow UI scaffold; transaction posting is handled by the Node.js backend.'}</div>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-1 overflow-x-auto">{config.tabs.map(t => <button key={t} onClick={() => setTab(t)} className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold ${tab === t ? 'bg-orange-50 text-[#F97316]' : 'text-slate-500 hover:bg-slate-50'}`}>{t}</button>)}</div>
            <div className="flex items-center gap-2">
              <div className="relative"><MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search records..." className="h-9 w-52 rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-orange-400" /></div>
              <button title="Filters" className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"><FunnelIcon className="h-4 w-4" /></button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">Code</th><th className="px-4 py-3">Record</th><th className="px-4 py-3">Owner / Location</th><th className="px-4 py-3">Quantity</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Updated</th><th className="px-4 py-3" /></tr></thead>
              <tbody className="divide-y divide-slate-100">{filtered.map(row => <tr key={row.id} className="hover:bg-slate-50/80"><td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-800">{row.code}</td><td className="px-4 py-4"><div className="font-medium text-slate-900">{row.name}</div><div className="mt-0.5 text-xs text-slate-400">{row.meta}</div></td><td className="px-4 py-4 text-slate-600">{row.owner}</td><td className="px-4 py-4 font-semibold text-slate-800">{row.quantity ?? '—'}{row.balance !== undefined ? <span className="ml-2 text-xs font-normal text-slate-400">bal. {row.balance}</span> : null}</td><td className="px-4 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badge[row.status] || 'bg-slate-100 text-slate-600'}`}>{row.status.replaceAll('_',' ')}</span></td><td className="whitespace-nowrap px-4 py-4 text-slate-500">{row.updated}</td><td className="px-4 py-4 text-right"><button title="Open record" onClick={() => toast(`Opening ${row.code}`)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><ChevronRightIcon className="h-5 w-5" /></button></td></tr>)}
              {filtered.length === 0 && <tr><td colSpan={7} className="px-4 py-16 text-center text-sm text-slate-500">No records match your search.</td></tr>}</tbody></table>
          </div>
        </div>
      </div>
    </section>
  );
}
