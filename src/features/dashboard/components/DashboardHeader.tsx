import { useEffect, useRef, useState } from 'react';
import { MagnifyingGlassIcon, QuestionMarkCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { RefreshIcon, SyncIcon } from '@design-system/icons';
import { Tooltip } from '@components/ui/Tooltip/Tooltip';
import { Shift } from '../types/dashboard';

interface DashboardHeaderProps { shifts: Shift[]; selectedShiftId: string | null; onShiftChange: (shiftId: string) => void; onRefresh?: () => void; }

export const DashboardHeader = ({ shifts, selectedShiftId, onShiftChange, onRefresh }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [helpOpen, setHelpOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const helpRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      const target = event.target as Node;
      if (helpRef.current && !helpRef.current.contains(target)) setHelpOpen(false);
      if (accountRef.current && !accountRef.current.contains(target)) setAccountOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (query) navigate(`/reports/production?search=${encodeURIComponent(query)}`);
  };

  return (
    <header className="sticky top-0 z-30 flex min-h-[64px] w-full items-center border-b border-slate-200 bg-white px-4 sm:px-6">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div><h1 className="text-lg font-bold text-slate-900">Dashboard</h1><p className="hidden text-xs text-slate-500 sm:block">Shift summary & production control</p></div>
          <select value={selectedShiftId || ''} onChange={(e) => onShiftChange(e.target.value)} aria-label="Select shift" className="h-9 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 outline-none focus:border-orange-400">
            {shifts.map((shift) => <option key={shift.id} value={shift.id}>{shift.label}</option>)}
          </select>
          <Tooltip content="Refresh shift data" side="bottom"><button onClick={onRefresh} className="rounded-lg p-2 hover:bg-slate-100" aria-label="Refresh shift data"><RefreshIcon size={18} className="text-slate-600" /></button></Tooltip>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <form onSubmit={submitSearch} className="relative hidden md:block"><input type="text" placeholder="Search reports & insights" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-10 w-[240px] rounded-full border border-slate-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-orange-400 lg:w-[320px]" aria-label="Search reports and insights" /><MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /></form>
          <Tooltip content="Sync data" side="bottom"><button onClick={onRefresh} className="rounded-lg p-2.5 hover:bg-slate-100" aria-label="Sync data"><SyncIcon size={20} className="text-slate-600" /></button></Tooltip>
          <div className="relative" ref={helpRef}><Tooltip content="Help & Documentation" side="bottom"><button onClick={() => setHelpOpen(v => !v)} className="rounded-lg p-2.5 hover:bg-slate-100" aria-label="Help"><QuestionMarkCircleIcon className="h-5 w-5 text-slate-600" /></button></Tooltip>{helpOpen && <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl"><button onClick={() => navigate('/reports/performance')} className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50">Performance reports</button><button onClick={() => navigate('/live-shopfloor')} className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50">Live shopfloor</button></div>}</div>
          <div className="relative" ref={accountRef}><Tooltip content="Account & user settings" side="bottom"><button onClick={() => setAccountOpen(v => !v)} className="flex h-10 items-center gap-1 rounded-full bg-[#33479A] px-2.5 text-sm font-bold text-white shadow-sm" aria-label="Open account"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">NY</span><ChevronDownIcon className="h-4 w-4" /></button></Tooltip>{accountOpen && <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-slate-200 bg-white p-3 shadow-xl"><p className="font-semibold text-slate-900">Nurudeen Yusuf</p><p className="text-xs text-slate-500">Production Planner</p><div className="my-2 border-t border-slate-100" /><button onClick={() => navigate('/profile')} className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50">Account settings</button><button onClick={() => navigate('/profile/password')} className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50">Security</button></div>}</div>
        </div>
      </div>
    </header>
  );
};
