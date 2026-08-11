// src/features/dashboard/components/DashboardHeader.tsx

import { useEffect, useRef, useState } from 'react';
import { MagnifyingGlassIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { RefreshIcon, SyncIcon } from '@design-system/icons';
import { Tooltip } from '@components/ui/Tooltip/Tooltip';
import { Shift } from '../types/dashboard';

interface DashboardHeaderProps {
  shifts: Shift[];
  selectedShiftId: string | null;
  onShiftChange: (shiftId: string) => void;
  onRefresh?: () => void;
}

export const DashboardHeader = ({
  shifts,
  selectedShiftId,
  onShiftChange,
  onRefresh,
}: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [helpOpen, setHelpOpen] = useState(false);
  const helpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (helpRef.current && !helpRef.current.contains(event.target as Node)) {
        setHelpOpen(false);
      }
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
    <header className="sticky top-0 z-30 flex h-[48px] w-full items-center border-b border-[#E5E7EB] bg-white px-2 sm:px-3">
      <div className="flex min-w-0 w-full items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <h1 className="whitespace-nowrap text-[15px] font-medium text-[#222]">Shift summary</h1>
          <select
            value={selectedShiftId || ''}
            onChange={(e) => onShiftChange(e.target.value)}
            aria-label="Select shift"
            className="h-7 max-w-[155px] rounded-[3px] border border-[#AAB4C5] bg-white px-2 text-[10px] text-[#344A83] outline-none focus:border-[#33479A]"
          >
            {shifts.map((shift) => (
              <option key={shift.id} value={shift.id}>{shift.label}</option>
            ))}
          </select>
          <Tooltip content="Refresh shift data" side="bottom">
            <button
              onClick={onRefresh}
              className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-[#F4F5F7]"
              aria-label="Refresh shift data"
            >
              <RefreshIcon size={14} className="text-[#666]" />
            </button>
          </Tooltip>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <form onSubmit={submitSearch} className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search reports & insights"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-7 w-[220px] rounded-full border border-[#C8CDD6] bg-white pl-8 pr-3 text-[10px] text-[#333] outline-none focus:border-[#33479A]"
              aria-label="Search reports and insights"
            />
            <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#777]" />
          </form>

          <Tooltip content="Sync data" side="bottom">
            <button
              onClick={onRefresh}
              className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-[#F4F5F7]"
              aria-label="Sync data"
            >
              <SyncIcon size={15} className="text-[#666]" />
            </button>
          </Tooltip>

          <div className="relative" ref={helpRef}>
            <Tooltip content="Help" side="bottom">
              <button
                onClick={() => setHelpOpen((open) => !open)}
                className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-[#F4F5F7]"
                aria-label="Help"
                aria-expanded={helpOpen}
              >
                <QuestionMarkCircleIcon className="h-4 w-4 text-[#666]" />
              </button>
            </Tooltip>
            {helpOpen && (
              <div className="absolute right-0 top-9 z-50 w-[150px] overflow-hidden rounded-[2px] border border-[#D9DDE5] bg-white shadow-lg">
                <div className="px-3 py-2 text-[9px] font-semibold uppercase tracking-wide text-[#777]">Help</div>
                <button onClick={() => navigate('/support')} className="block w-full px-3 py-2 text-left text-[10px] text-[#333] hover:bg-[#F5F6F8]">Support</button>
                <button onClick={() => navigate('/support?tab=submit')} className="block w-full px-3 py-2 text-left text-[10px] text-[#333] hover:bg-[#F5F6F8]">Submit Ticket</button>
                <div className="border-t border-[#ECEEF2] px-3 py-2 text-[9px] font-semibold uppercase tracking-wide text-[#777]">Legal</div>
                <button onClick={() => navigate('/terms')} className="block w-full px-3 py-2 text-left text-[10px] text-[#333] hover:bg-[#F5F6F8]">Terms of service</button>
                <div className="border-t border-[#ECEEF2] px-3 py-2 text-[9px] font-semibold uppercase tracking-wide text-[#777]">Version</div>
                <div className="px-3 pb-2 text-[10px] text-[#555]">v4.17.1</div>
              </div>
            )}
          </div>

          <Tooltip content="Profile" side="bottom">
            <button
              onClick={() => navigate('/profile')}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#33479A] text-[11px] text-white"
              aria-label="Open profile settings"
            >
              <span>☺</span>
            </button>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};
