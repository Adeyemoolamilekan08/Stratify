import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Tooltip } from '@components/ui/Tooltip/Tooltip';

export interface ProductionLogFilterState {
  date: string;
  shift: string;
  machine: string;
  order: 'newest' | 'oldest';
}

interface ProductionLogFiltersProps {
  open: boolean;
  value: ProductionLogFilterState;
  machines: string[];
  onChange: (value: ProductionLogFilterState) => void;
  onClose: () => void;
}

const shifts = ['All Shifts', 'Shift1', 'Shift2'];

export const ProductionLogFilters: React.FC<ProductionLogFiltersProps> = ({
  open,
  value,
  machines,
  onChange,
  onClose,
}) => {
  const [calendarMonth, setCalendarMonth] = useState(dayjs(value.date).startOf('month'));
  const [machineQuery, setMachineQuery] = useState('');

  const filteredMachines = useMemo(
    () => machines.filter((machine) => machine.toLowerCase().includes(machineQuery.toLowerCase())),
    [machines, machineQuery],
  );

  const days = useMemo(() => {
    const start = calendarMonth.startOf('week');
    return Array.from({ length: 42 }, (_, index) => start.add(index, 'day'));
  }, [calendarMonth]);

  if (!open) return null;

  return (
    <div className="absolute right-0 top-[46px] z-40 w-[286px] rounded-[3px] border border-[#D8DDE6] bg-white shadow-[0_10px_30px_rgba(31,41,55,0.14)]">
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#ECEEF2]">
        <span className="text-[11px] font-medium text-[#374151]">Filter production log</span>
        <Tooltip content="Close filters" side="left">
          <button type="button" onClick={onClose} className="h-6 w-6 rounded hover:bg-[#F3F4F6] text-[#6B7280] flex items-center justify-center">
            <X size={13} />
          </button>
        </Tooltip>
      </div>

      <div className="p-3 space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] uppercase tracking-[0.05em] text-[#8A8F98]">Date</span>
            <div className="flex items-center gap-1">
              <Tooltip content="Previous month">
                <button type="button" onClick={() => setCalendarMonth((m) => m.subtract(1, 'month'))} className="h-6 w-6 flex items-center justify-center rounded hover:bg-[#F3F4F6] text-[#6B7280]"><ChevronLeft size={13} /></button>
              </Tooltip>
              <span className="text-[10px] font-semibold text-[#4B5563] w-[80px] text-center">{calendarMonth.format('MMMM YYYY')}</span>
              <Tooltip content="Next month">
                <button type="button" onClick={() => setCalendarMonth((m) => m.add(1, 'month'))} className="h-6 w-6 flex items-center justify-center rounded hover:bg-[#F3F4F6] text-[#6B7280]"><ChevronRight size={13} /></button>
              </Tooltip>
            </div>
          </div>
          <div className="grid grid-cols-7 text-center mb-1">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => <span key={`${day}-${index}`} className="text-[9px] text-[#9CA3AF]">{day}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-y-1">
            {days.map((day) => {
              const selected = day.format('YYYY-MM-DD') === value.date;
              const currentMonth = day.month() === calendarMonth.month();
              return (
                <button
                  key={day.format('YYYY-MM-DD')}
                  type="button"
                  onClick={() => onChange({ ...value, date: day.format('YYYY-MM-DD') })}
                  className={`mx-auto h-7 w-7 rounded-full text-[9px] transition-colors ${
                    selected ? 'bg-[#33479A] text-white' : currentMonth ? 'text-[#4B5563] hover:bg-[#EEF1FF]' : 'text-[#D1D5DB]'
                  }`}
                >
                  {day.date()}
                </button>
              );
            })}
          </div>
        </div>

        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.05em] text-[#8A8F98]">Shift</span>
          <div className="relative mt-1">
            <select value={value.shift} onChange={(e) => onChange({ ...value, shift: e.target.value })} className="appearance-none w-full h-8 rounded-[2px] border border-[#D8DDE6] bg-white px-2.5 pr-7 text-[10px] text-[#4B5563] outline-none focus:border-[#33479A]">
              {shifts.map((shift) => <option key={shift}>{shift}</option>)}
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#9CA3AF]" />
          </div>
        </label>

        <div>
          <span className="text-[10px] uppercase tracking-[0.05em] text-[#8A8F98]">Machine</span>
          <div className="mt-1 border border-[#D8DDE6] rounded-[2px] overflow-hidden">
            <input value={machineQuery} onChange={(e) => setMachineQuery(e.target.value)} placeholder="All Machines" className="w-full h-8 px-2.5 text-[10px] border-b border-[#ECEEF2] outline-none" />
            <div className="max-h-[130px] overflow-y-auto">
              <button type="button" onClick={() => onChange({ ...value, machine: 'All Machines' })} className={`w-full text-left px-2.5 py-1.5 text-[10px] ${value.machine === 'All Machines' ? 'bg-[#EEF1FF] text-[#33479A] font-medium' : 'text-[#4B5563] hover:bg-[#F7F8FA]'}`}>All Machines</button>
              {filteredMachines.map((machine) => (
                <button key={machine} type="button" onClick={() => onChange({ ...value, machine })} className={`w-full text-left px-2.5 py-1.5 text-[10px] ${value.machine === machine ? 'bg-[#EEF1FF] text-[#33479A] font-medium' : 'text-[#4B5563] hover:bg-[#F7F8FA]'}`}>
                  {machine}
                </button>
              ))}
            </div>
          </div>
        </div>

        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.05em] text-[#8A8F98]">Order by</span>
          <div className="relative mt-1">
            <select value={value.order} onChange={(e) => onChange({ ...value, order: e.target.value as 'newest' | 'oldest' })} className="appearance-none w-full h-8 rounded-[2px] border border-[#D8DDE6] bg-white px-2.5 pr-7 text-[10px] text-[#4B5563] outline-none focus:border-[#33479A]">
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#9CA3AF]" />
          </div>
        </label>
      </div>
    </div>
  );
};

export default ProductionLogFilters;
