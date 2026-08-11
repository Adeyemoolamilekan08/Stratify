import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  EyeIcon,
  EyeSlashIcon,
  FunnelIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  Squares2X2Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Tooltip } from '../../../shared/components/Tooltip';

type ReportKind = 'production' | 'downtime';
type ProductionView = 'machine-production' | 'production-loss';
type DowntimeView = 'machine-downtime';
type Interval = 'Hourly' | 'Daily' | 'Shift wise';

type Row = Record<string, string | number>;

type Column = {
  key: string;
  label: string;
  width?: string;
};

const productionColumns: Column[] = [
  { key: 'date', label: 'Date' },
  { key: 'hour', label: 'Hour' },
  { key: 'machine', label: 'Machine' },
  { key: 'department', label: 'Department' },
  { key: 'part', label: 'Part' },
  { key: 'plan', label: 'Plan' },
  { key: 'produced', label: 'Produced' },
  { key: 'accepted', label: 'Accepted' },
  { key: 'rejected', label: 'Rejected' },
];

const downtimeColumns: Column[] = [
  { key: 'date', label: 'Date' },
  { key: 'hour', label: 'Hour' },
  { key: 'machine', label: 'Machine' },
  { key: 'department', label: 'Department' },
  { key: 'category', label: 'Category' },
  { key: 'reasonCode', label: 'Downtime reason code' },
  { key: 'reason', label: 'Downtime reason' },
  { key: 'duration', label: 'Total downtime (hh:mm:ss)' },
  { key: 'minutes', label: 'Total downtime (mins)' },
];

const productionRows: Row[] = Array.from({ length: 18 }, (_, i) => ({
  date: '10-8-2026',
  hour: `${String(7 + (i % 10)).padStart(2, '0')}:00 - ${String(8 + (i % 10)).padStart(2, '0')}:00`,
  machine: ['HT-27-HT-270', 'HT-28-HT-270', 'HT-29-HT-270', 'HT-30-HT-270', 'HT-31-HT-270', 'HT-32-FERO-275'][i % 6],
  department: i % 3 === 0 ? 'Production' : i % 5 === 0 ? 'Maintenance' : '-',
  part: ['SFG - Crystal/Deep Bucket', 'SFG - 50cc Cap', 'Measuring Cup', 'Darvinks Visita Flip Cap'][i % 4],
  plan: 100 + i,
  produced: 100 + i * 17,
  accepted: 96 + i * 16,
  rejected: i % 4,
}));

const productionLossRows: Row[] = productionRows.map((row, i) => ({
  ...row,
  category: i % 3 === 0 ? 'Production Loss' : i % 3 === 1 ? 'Shortfall' : 'Reject',
  loss: i * 3 + 2,
}));

const downtimeRows: Row[] = Array.from({ length: 24 }, (_, i) => ({
  date: '10-8-2026',
  hour: '07:00 - 08:00',
  machine: ['HT-27-HT-270', 'HT-28-HT-270', 'HT-29-HT-270', 'HT-30-HT-270', 'HT-31-HT-270', 'HT-32-FERO-275', 'HT-34-FERO-200'][i % 7],
  department: i % 4 === 0 ? 'Maintenance' : i % 2 === 0 ? 'Production' : '-',
  category: i % 4 === 0 ? 'MNT' : i % 3 === 0 ? 'PRD' : '-',
  reasonCode: i % 3 === 0 ? '14' : i % 4 === 0 ? '8' : '-',
  reason: ['Machine Start Up', 'No reason', 'Process Fault', 'Machine Breakdown', 'PPM', 'Mould Change'][i % 6],
  duration: ['0:59:59', '0:03:27', '0:27:30', '0:18:41', '0:11:34', '0:00:28'][i % 6],
  minutes: [60, 3.46, 27.5, 18.69, 11.58, 0.47][i % 6],
}));

function TooltipButton({ label, onClick, children }: { label: string; onClick?: () => void; children: ReactNode }) {
  return (
    <Tooltip content={label}>
      <button
        onClick={onClick}
        aria-label={label}
        className="h-8 w-8 rounded border border-[#D7DCE5] bg-white text-[#5F6673] flex items-center justify-center hover:bg-[#F5F7FA] hover:text-[#253B8F] transition-colors"
      >
        {children}
      </button>
    </Tooltip>
  );
}

function ChartView({ kind, fullscreen = false }: { kind: ReportKind; fullscreen?: boolean }) {
  const values = kind === 'production' ? [48, 72, 58, 86, 64, 92, 75, 54, 83, 69] : [42, 74, 61, 90, 56, 82, 70, 49, 78, 63];
  return (
    <div className={`relative ${fullscreen ? 'h-full' : 'h-[260px]'} bg-white border-b border-[#D9DDE5] p-5`}>
      <div className="absolute inset-x-8 bottom-12 top-6 flex items-end gap-3">
        {values.map((v, i) => (
          <div key={i} className="flex-1 h-full flex items-end">
            <div
              className="w-full rounded-t-[2px] bg-[#3E4BAA] hover:bg-[#31408F] transition-colors"
              style={{ height: `${v}%` }}
              title={`${v} units`}
            />
          </div>
        ))}
      </div>
      <div className="absolute left-8 right-8 bottom-4 border-t border-dashed border-[#D8DDE6]" />
      <div className="absolute right-8 top-5 text-[12px] text-[#5E6570]">{kind === 'production' ? 'Produced' : 'Total downtime (mins)'}</div>
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[11px] text-[#6B7280]">10-8-2026</div>
    </div>
  );
}

function ChartFullscreen({ kind, onClose }: { kind: ReportKind; onClose: () => void }) {
  const [tab, setTab] = useState<'Settings' | 'Data' | 'Format'>('Settings');
  const chartTypes = ['Pie', 'Donut', 'Line', 'Scatter', 'Bubble', 'Area', 'Histogram'];
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col">
      <div className="h-14 bg-[#3E4BAA] text-white flex items-center justify-between px-6 shrink-0">
        <span className="text-[18px] font-medium">Chart - Full Screen</span>
        <TooltipButton label="Close chart full screen" onClick={onClose}>
          <XMarkIcon className="w-5 h-5" />
        </TooltipButton>
      </div>
      <div className="flex-1 flex min-h-0">
        <div className="flex-1 min-w-0">
          <ChartView kind={kind} fullscreen />
        </div>
        <aside className="w-[220px] border-l border-[#D9DDE5] bg-white overflow-y-auto">
          <div className="flex border-b border-[#D9DDE5] sticky top-0 bg-white">
            {(['Settings', 'Data', 'Format'] as const).map((name) => (
              <button key={name} onClick={() => setTab(name)} className={`flex-1 py-3 text-[12px] ${tab === name ? 'font-semibold text-[#3E4BAA] border-b-2 border-[#3E4BAA]' : 'text-[#555]'}`}>{name}</button>
            ))}
          </div>
          {tab === 'Settings' && (
            <div className="p-3 space-y-4">
              {chartTypes.map((type) => (
                <div key={type}>
                  <div className="text-[11px] uppercase tracking-wide text-[#7A818C] mb-2">{type}</div>
                  <button className="w-12 h-12 border border-[#D8DDE6] rounded bg-[#F8F9FB] hover:border-[#3E4BAA]" title={`Use ${type} chart`}>
                    <div className="mx-auto w-7 h-7 border-2 border-[#3E4BAA] rounded-sm" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {tab === 'Data' && (
            <div className="p-4 space-y-3 text-[12px] text-[#555]">
              <label className="block">Category<input className="mt-1 w-full border rounded px-2 py-1.5" defaultValue="Date" /></label>
              <label className="block">Series<input className="mt-1 w-full border rounded px-2 py-1.5" defaultValue={kind === 'production' ? 'Produced' : 'Total downtime'} /></label>
              <button className="w-full border rounded py-2 hover:bg-[#F7F8FA]">Apply data mapping</button>
            </div>
          )}
          {tab === 'Format' && (
            <div className="p-4 space-y-4 text-[12px] text-[#555]">
              {['Top padding', 'Right padding', 'Bottom padding', 'Left padding'].map((label) => <label key={label} className="block">{label}<input type="range" className="w-full" defaultValue="20" /></label>)}
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Legend enabled</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> Labels enabled</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> Shadow enabled</label>
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Tooltips enabled</label>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function SaveReportModal({ onSave, onCancel, kind }: { onSave: () => void; onCancel: () => void; kind: ReportKind }) {
  const [name, setName] = useState('');
  const save = () => {
    if (!name.trim()) return;
    const key = 'stratify.savedReports';
    const existing = JSON.parse(localStorage.getItem(key) || '[]') as string[];
    localStorage.setItem(key, JSON.stringify([...existing, `${kind}:${name.trim()}`]));
    onSave();
  };
  return (
    <div className="fixed inset-0 z-[90] bg-black/25 flex items-start justify-center pt-28 px-4">
      <div className="w-full max-w-[380px] bg-white rounded-md shadow-2xl border border-[#D8DDE6]">
        <div className="px-4 py-3 border-b flex items-center justify-between"><strong className="text-[15px]">Save report as</strong><button onClick={onCancel}><XMarkIcon className="w-5 h-5" /></button></div>
        <div className="p-4"><label className="text-[12px] text-[#5F6673]">Report name</label><input autoFocus value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && save()} className="mt-1 w-full border rounded px-3 py-2 text-[13px]" placeholder="Enter report name" /></div>
        <div className="px-4 py-3 border-t flex justify-end gap-2"><button onClick={onCancel} className="px-3 py-1.5 text-[13px]">Cancel</button><button onClick={save} className="px-4 py-1.5 rounded bg-[#3E4BAA] text-white text-[13px] disabled:opacity-50" disabled={!name.trim()}>Save</button></div>
      </div>
    </div>
  );
}

function RightRail({ open, setOpen, columns, visibleColumns, setVisibleColumns, pivotMode, setPivotMode, filters, setFilters }: {
  open: 'columns' | 'filters' | null;
  setOpen: (value: 'columns' | 'filters' | null) => void;
  columns: Column[];
  visibleColumns: string[];
  setVisibleColumns: (keys: string[]) => void;
  pivotMode: boolean;
  setPivotMode: (v: boolean) => void;
  filters: Record<string, string>;
  setFilters: (v: Record<string, string>) => void;
}) {
  const [search, setSearch] = useState('');
  const filtered = columns.filter((c) => c.label.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="flex h-full shrink-0">
      {open && <aside className="w-[220px] bg-white border-l border-[#D9DDE5] overflow-y-auto">
        <div className="p-3 border-b flex items-center justify-between"><strong className="text-[12px]">{open === 'columns' ? 'Columns' : 'Filters'}</strong><button onClick={() => setOpen(null)}><XMarkIcon className="w-4 h-4" /></button></div>
        {open === 'columns' ? <>
          <div className="p-3 border-b"><label className="relative block"><MagnifyingGlassIcon className="absolute left-2 top-2 w-4 h-4 text-[#9CA3AF]" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-full pl-8 pr-2 py-1.5 border rounded text-[12px]" /></label></div>
          <div className="p-3 space-y-2">{filtered.map((c) => <label key={c.key} className="flex items-center gap-2 text-[12px]"><input type="checkbox" checked={visibleColumns.includes(c.key)} onChange={() => setVisibleColumns(visibleColumns.includes(c.key) ? visibleColumns.filter((k) => k !== c.key) : [...visibleColumns, c.key])} />{c.label}</label>)}</div>
        </> : <div className="p-3 space-y-3"><label className="block text-[11px] text-[#666]">Machine<input value={filters.machine} onChange={(e) => setFilters({ ...filters, machine: e.target.value })} className="mt-1 w-full border rounded px-2 py-1.5 text-[12px]" placeholder="All machines" /></label><label className="block text-[11px] text-[#666]">Department<input value={filters.department} onChange={(e) => setFilters({ ...filters, department: e.target.value })} className="mt-1 w-full border rounded px-2 py-1.5 text-[12px]" placeholder="All departments" /></label><label className="block text-[11px] text-[#666]">Category<input value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="mt-1 w-full border rounded px-2 py-1.5 text-[12px]" placeholder="All categories" /></label><button onClick={() => setFilters({ machine: '', department: '', category: '' })} className="w-full border rounded py-1.5 text-[12px] hover:bg-[#F7F8FA]">Clear filters</button></div>}
        {pivotMode && <div className="p-3 border-t space-y-3"><div><div className="text-[11px] font-semibold mb-1">Row Groups</div><div className="min-h-[54px] border border-dashed rounded text-[11px] text-[#9298A3] p-2">Drag here to set row groups</div></div><div><div className="text-[11px] font-semibold mb-1">Values</div><div className="min-h-[54px] border border-dashed rounded text-[11px] text-[#9298A3] p-2">Drag here to aggregate</div></div></div>}
      </aside>}
      <div className="w-8 border-l border-[#D9DDE5] bg-white flex flex-col">
        <button onClick={() => setOpen(open === 'columns' ? null : 'columns')} className={`flex-1 writing-mode-vertical [writing-mode:vertical-rl] text-[11px] ${open === 'columns' ? 'text-[#3E4BAA] bg-[#F1F3FF]' : 'text-[#5F6673]'} hover:bg-[#F6F7FA]`} title="Open Columns panel">Columns</button>
        <button onClick={() => setOpen(open === 'filters' ? null : 'filters')} className={`flex-1 writing-mode-vertical [writing-mode:vertical-rl] text-[11px] ${open === 'filters' ? 'text-[#3E4BAA] bg-[#F1F3FF]' : 'text-[#5F6673]'} hover:bg-[#F6F7FA]`} title="Open Filters panel">Filters</button>
        <button onClick={() => setPivotMode(!pivotMode)} className={`m-1 rounded p-1 ${pivotMode ? 'bg-[#3E4BAA] text-white' : 'text-[#68707C]'}`} title="Toggle pivot mode"><Squares2X2Icon className="w-4 h-4" /></button>
      </div>
    </div>
  );
}

function DateRange({ start, end, onStartChange, onEndChange }: { start: string; end: string; onStartChange: (v: string) => void; onEndChange: (v: string) => void }) {
  return <label className="flex items-center gap-2 border border-[#D7DCE5] rounded px-2.5 h-8 bg-white"><CalendarDaysIcon className="w-4 h-4 text-[#69717E]" /><input type="date" value={start} onChange={(e) => onStartChange(e.target.value)} className="text-[12px] bg-transparent outline-none" /><span className="text-[#858B95]">to</span><input type="date" value={end} min={start} onChange={(e) => onEndChange(e.target.value)} className="text-[12px] bg-transparent outline-none" /></label>;
}

export default function ReportWorkspace({ kind }: { kind: ReportKind }) {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const defaultView = kind === 'production' ? 'machine-production' : 'machine-downtime';
  const view = (params.get('view') || defaultView) as ProductionView | DowntimeView;
  const [showSave, setShowSave] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showChart, setShowChart] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [interval, setInterval] = useState<Interval>(kind === 'production' ? 'Hourly' : 'Hourly');
  const [startDate, setStartDate] = useState('2026-08-10');
  const [endDate, setEndDate] = useState('2026-08-10');
  const [refreshing, setRefreshing] = useState(false);
  const [rightPanel, setRightPanel] = useState<'columns' | 'filters' | null>(null);
  const [pivotMode, setPivotMode] = useState(false);
  const columns = kind === 'production' ? productionColumns : downtimeColumns;
  const [visibleColumns, setVisibleColumns] = useState(columns.map((c) => c.key));
  const [filters, setFilters] = useState({ machine: '', department: '', category: '' });
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [savedToast, setSavedToast] = useState(false);
  const reportsMenuRef = useRef<HTMLDivElement>(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (reportsMenuRef.current && !reportsMenuRef.current.contains(e.target as Node)) setShowReports(false);
      if (exportMenuRef.current && !exportMenuRef.current.contains(e.target as Node)) setShowExport(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  useEffect(() => {
    if (!savedToast) return;
    const id = window.setTimeout(() => setSavedToast(false), 1800);
    return () => window.clearTimeout(id);
  }, [savedToast]);

  const rows = kind === 'production' ? (view === 'production-loss' ? productionLossRows : productionRows) : downtimeRows;
  const filteredRows = useMemo(() => rows.filter((row) => {
    const machineMatch = !filters.machine || String(row.machine).toLowerCase().includes(filters.machine.toLowerCase());
    const deptMatch = !filters.department || String(row.department).toLowerCase().includes(filters.department.toLowerCase());
    const categoryMatch = !filters.category || String(row.category).toLowerCase().includes(filters.category.toLowerCase());
    const columnsMatch = Object.entries(columnFilters).every(([key, value]) => !value || String(row[key]).toLowerCase().includes(value.toLowerCase()));
    return machineMatch && deptMatch && categoryMatch && columnsMatch;
  }), [rows, filters, columnFilters]);

  const reportTitle = kind === 'production' ? 'Production reports' : 'Downtime reports';
  const subTitle = kind === 'production' ? (view === 'production-loss' ? 'Production Loss Report' : 'Machine Production') : 'Machine Downtime';

  const switchReport = (target: string) => {
    if (target === 'production') navigate('/reports/production');
    if (target === 'downtime') navigate('/reports/downtime');
    setShowReports(false);
  };

  const refresh = () => {
    setRefreshing(true);
    window.setTimeout(() => setRefreshing(false), 650);
  };

  const exportCsv = () => {
    const header = visibleColumns.map((key) => columns.find((c) => c.key === key)?.label || key);
    const body = filteredRows.map((row) => visibleColumns.map((key) => JSON.stringify(row[key] ?? '')).join(','));
    const blob = new Blob([[header.join(','), ...body].join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${kind}-report.csv`; a.click(); URL.revokeObjectURL(url);
    setShowExport(false);
  };

  const changeView = (next: string) => {
    const nextParams = new URLSearchParams(params);
    nextParams.set('view', next);
    setParams(nextParams);
    setShowReports(false);
  };

  return (
    <div className="h-full min-h-0 bg-white flex flex-col overflow-hidden">
      {fullscreen && <ChartFullscreen kind={kind} onClose={() => setFullscreen(false)} />}
      {showSave && <SaveReportModal kind={kind} onCancel={() => setShowSave(false)} onSave={() => { setShowSave(false); setSavedToast(true); }} />}
      {savedToast && <div className="fixed right-5 top-20 z-[110] bg-[#263A8F] text-white px-4 py-2 rounded shadow-lg text-[12px]">Report saved</div>}

      <header className="bg-white border-b border-[#D9DDE5] shrink-0">
        <div className="h-[66px] px-4 md:px-6 flex items-center justify-between gap-4">
          <h1 className="text-[24px] md:text-[28px] font-normal text-[#222]">{reportTitle}</h1>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:flex items-center w-[350px] max-w-[38vw] h-9 rounded-full border border-[#D5DAE3] px-4 gap-2 text-[#8A919C]">
              <MagnifyingGlassIcon className="w-4 h-4" /><input className="outline-none text-[12px] w-full" placeholder="Search reports & insights" />
            </div>
            <TooltipButton label="Sync data" onClick={refresh}><ArrowPathIcon className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} /></TooltipButton>
            <TooltipButton label="Report help"><span className="text-[13px] font-semibold">?</span></TooltipButton>
            <button className="h-8 w-8 rounded-full bg-[#3E4BAA] text-white text-[12px]" title="Account">☺</button>
          </div>
        </div>
      </header>

      <div className="px-4 md:px-6 pt-4 pb-2 flex flex-wrap items-center gap-2 bg-white shrink-0">
        <button onClick={() => setShowSave(true)} className="h-8 px-4 rounded bg-[#3E4BAA] text-white text-[12px] font-medium hover:bg-[#33408F] flex items-center gap-1.5"><PencilSquareIcon className="w-4 h-4" />Save as...</button>
        <div className="relative" ref={reportsMenuRef}>
          <button onClick={() => setShowReports(!showReports)} className="h-8 px-3 rounded border border-[#C8CED9] text-[12px] flex items-center gap-1.5 hover:bg-[#F6F7FA]"><span>Reports</span><ChevronDownIcon className="w-4 h-4" /></button>
          {showReports && <div className="absolute z-50 top-9 left-0 min-w-[220px] bg-white border border-[#D9DDE5] shadow-lg rounded py-1">
            {kind === 'production' ? <><button onClick={() => changeView('machine-production')} className="w-full text-left px-4 py-2 text-[12px] hover:bg-[#F4F6FA]">Machine Production</button><button onClick={() => changeView('production-loss')} className="w-full text-left px-4 py-2 text-[12px] hover:bg-[#F4F6FA]">Production Loss Report</button></> : <button onClick={() => changeView('machine-downtime')} className="w-full text-left px-4 py-2 text-[12px] hover:bg-[#F4F6FA]">Machine Downtime</button>}
          </div>}
        </div>
        <div className="relative" ref={exportMenuRef}>
          <button onClick={() => setShowExport(!showExport)} className="h-8 px-3 rounded border border-[#C8CED9] text-[12px] flex items-center gap-1.5 hover:bg-[#F6F7FA]"><ArrowDownTrayIcon className="w-4 h-4" />Export<ChevronDownIcon className="w-4 h-4" /></button>
          {showExport && <div className="absolute z-50 top-9 left-0 min-w-[160px] bg-white border border-[#D9DDE5] shadow-lg rounded py-1"><button onClick={exportCsv} className="w-full text-left px-4 py-2 text-[12px] hover:bg-[#F4F6FA]">CSV</button><button onClick={exportCsv} className="w-full text-left px-4 py-2 text-[12px] hover:bg-[#F4F6FA]">Excel</button><button onClick={exportCsv} className="w-full text-left px-4 py-2 text-[12px] hover:bg-[#F4F6FA]">PDF</button></div>}
        </div>
      </div>

      <div className="px-4 md:px-6 pb-2 flex items-center justify-between gap-3 bg-white shrink-0">
        <div className="flex items-center gap-2 min-w-0"><LockClosedIcon className="w-4 h-4 text-[#656D78] shrink-0" /><span className="text-[17px] md:text-[18px] text-[#2C2F34] truncate">{subTitle}</span><TooltipButton label="Refresh report" onClick={refresh}><ArrowPathIcon className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} /></TooltipButton></div>
        <div className="flex flex-wrap justify-end items-center gap-2">
          <DateRange start={startDate} end={endDate} onStartChange={setStartDate} onEndChange={setEndDate} />
          <select value={interval} onChange={(e) => setInterval(e.target.value as Interval)} className="h-8 border border-[#C8CED9] rounded px-3 text-[12px] bg-white outline-none"><option>Hourly</option><option>Daily</option><option>Shift wise</option></select>
          {showChart ? <button onClick={() => setShowChart(false)} className="h-8 px-3 border border-[#C8CED9] rounded text-[12px] flex items-center gap-1.5 hover:bg-[#F6F7FA]"><EyeSlashIcon className="w-4 h-4" />Hide chart</button> : <button onClick={() => setShowChart(true)} className="h-8 px-3 border border-[#C8CED9] rounded text-[12px] flex items-center gap-1.5 hover:bg-[#F6F7FA]"><EyeIcon className="w-4 h-4" />Show chart</button>}
          <button onClick={() => setFullscreen(true)} className="h-8 px-3 border border-[#C8CED9] rounded text-[12px] flex items-center gap-1.5 hover:bg-[#F6F7FA]"><Squares2X2Icon className="w-4 h-4" />Fullscreen</button>
        </div>
      </div>

      <main className="flex-1 min-h-0 flex overflow-hidden border-t border-[#D9DDE5]">
        <section className="flex-1 min-w-0 flex flex-col overflow-hidden">
          {showChart && <ChartView kind={kind} />}
          <div className="h-8 px-3 bg-[#FAFAFB] border-b border-[#D9DDE5] flex items-center text-[11px] text-[#8A919C] shrink-0">▣ &nbsp; Drag here to set row groups</div>
          {pivotMode && <div className="h-8 px-3 bg-[#FAFAFB] border-b border-[#D9DDE5] flex items-center text-[11px] text-[#8A919C]">▣ &nbsp; Drag here to set column labels</div>}
          <div className="flex-1 min-h-0 overflow-auto">
            <table className="w-full min-w-[1050px] border-collapse text-[11px]">
              <thead className="sticky top-0 z-10 bg-[#F8F9FB]">
                <tr>{columns.filter((c) => visibleColumns.includes(c.key)).map((c) => <th key={c.key} draggable onDragStart={(e) => e.dataTransfer.setData('text/plain', c.key)} className="h-9 px-2 text-left font-normal text-[#505761] border-b border-r border-[#D9DDE5] whitespace-nowrap">{c.label}</th>)}</tr>
                <tr>{columns.filter((c) => visibleColumns.includes(c.key)).map((c) => <th key={c.key} className="p-1 border-b border-r border-[#D9DDE5]"><div className="relative"><input value={columnFilters[c.key] || ''} onChange={(e) => setColumnFilters({ ...columnFilters, [c.key]: e.target.value })} className="w-full h-6 border border-[#D9DDE5] rounded px-1.5 text-[10px] outline-none" /><FunnelIcon className="absolute right-1 top-1 w-3 h-3 text-[#8A919C]" /></div></th>)}</tr>
              </thead>
              <tbody>{filteredRows.map((row, idx) => <tr key={idx} className="hover:bg-[#F7F9FC]">{columns.filter((c) => visibleColumns.includes(c.key)).map((c) => <td key={c.key} className={`h-9 px-2 border-b border-r border-[#E1E4E9] whitespace-nowrap ${c.key === 'date' ? 'bg-[#E7F8EF]' : ''}`}>{String(row[c.key] ?? '')}</td>)}</tr>)}
              {!filteredRows.length && <tr><td colSpan={visibleColumns.length} className="h-[280px] text-center text-[#777]">No Rows To Show</td></tr>}
            </tbody></table>
          </div>
        </section>
        <RightRail open={rightPanel} setOpen={setRightPanel} columns={columns} visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns} pivotMode={pivotMode} setPivotMode={setPivotMode} filters={filters} setFilters={setFilters} />
      </main>
    </div>
  );
}
