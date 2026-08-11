import { useMemo, useRef, useState } from 'react';
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  InformationCircleIcon,
  PlusIcon,
  ArrowPathIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Tooltip } from '@components/ui/Tooltip/Tooltip';

const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
];

const machines = ['All', 'HT-28-HT-270', 'HT-29-HT-270', 'HT-30-HT-270'];
const parts = ['All', 'SFG - Crystal/Deep Bucket', 'SFG - 50cc Cap', 'Crystal Spoon'];
const colors = ['All', 'Natural', 'Blue', 'Green', 'Red'];

interface MonthlyPlan {
  id: string;
  machine: string;
  part: string;
  month: string;
  color: string;
  quantity: number;
}

export default function MonthlyPlanning() {
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 7, 1));
  const [monthPickerOpen, setMonthPickerOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [filters, setFilters] = useState({ machine: 'All', part: 'All', month: 'All', color: 'All' });
  const [plans, setPlans] = useState<MonthlyPlan[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const selectedMonth = selectedDate.getMonth();
  const selectedYear = selectedDate.getFullYear();

  const visiblePlans = useMemo(() => plans.filter((plan) => {
    return (filters.machine === 'All' || plan.machine === filters.machine)
      && (filters.part === 'All' || plan.part === filters.part)
      && (filters.month === 'All' || plan.month === filters.month)
      && (filters.color === 'All' || plan.color === filters.color);
  }), [plans, filters]);

  const setMonth = (month: number, year = selectedYear) => {
    setSelectedDate(new Date(year, month, 1));
    setMonthPickerOpen(false);
  };

  const shiftYear = (delta: number) => {
    setSelectedDate(new Date(selectedYear + delta, selectedMonth, 1));
  };

  const downloadCsv = (filename: string, rows: string[][]) => {
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadTemplate = () => {
    downloadCsv('monthly-plan-template.csv', [['Machine', 'Part', 'Month', 'Color', 'Quantity'], ['', '', '', '', '']]);
  };

  const downloadPlans = () => {
    downloadCsv('monthly-plans.csv', [
      ['Machine', 'Part', 'Month', 'Color', 'Quantity'],
      ...visiblePlans.map((plan) => [plan.machine, plan.part, plan.month, plan.color, String(plan.quantity)]),
    ]);
  };

  const handleUpload = (file?: File) => {
    if (!file) return;
    setUploadMessage(`${file.name} selected`);
    window.setTimeout(() => setUploadMessage(''), 3000);
  };

  const resetFilters = () => setFilters({ machine: 'All', part: 'All', month: 'All', color: 'All' });

  const addPlan = (plan: Omit<MonthlyPlan, 'id'>) => {
    setPlans((current) => [...current, { ...plan, id: `${Date.now()}` }]);
    setAddOpen(false);
  };

  return (
    <section className="relative min-h-full bg-white">
      <div className="flex min-h-[58px] items-center justify-between border-b border-[#E5E7EB] pl-14 pr-4 sm:pl-14 sm:pr-6 lg:px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-[18px] font-medium text-[#1A1A2E]">Monthly Plan</h1>
          <Tooltip content="Monthly planning overview" side="bottom">
            <InformationCircleIcon className="h-4 w-4 text-[#6B7280]" />
          </Tooltip>
          <Tooltip content="Refresh monthly plans" side="bottom">
            <button className="rounded-full p-1.5 text-[#6B7280] hover:bg-[#F3F4F6]" aria-label="Refresh monthly plans">
              <ArrowPathIcon className="h-4 w-4" />
            </button>
          </Tooltip>
        </div>
        <div className="hidden min-[700px]:flex items-center gap-4">
          <input
            aria-label="Search reports and insights"
            placeholder="Search reports & insights"
            className="h-10 w-[280px] rounded-full border border-[#D1D5DB] px-4 text-[12px] outline-none focus:border-[#F97316] focus:ring-2 focus:ring-orange-100"
          />
          <Tooltip content="Sync data" side="bottom"><button className="rounded-full p-2 text-[#6B7280] hover:bg-[#F3F4F6]"><ArrowPathIcon className="h-5 w-5" /></button></Tooltip>
          <Tooltip content="Help & documentation" side="bottom"><button className="rounded-full p-2 text-[#6B7280] hover:bg-[#F3F4F6]"><InformationCircleIcon className="h-5 w-5" /></button></Tooltip>
          <Tooltip content="User profile" side="bottom"><button className="h-9 w-9 rounded-full bg-[#3450D8] text-[17px] text-white">😊</button></Tooltip>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 border-b border-[#E5E7EB] px-4 py-2 sm:px-6">
        <div className="relative">
          <Tooltip content="Choose planning month" side="bottom">
            <button onClick={() => setMonthPickerOpen((open) => !open)} className="inline-flex h-8 items-center gap-1.5 rounded-[4px] border border-[#D1D5DB] bg-white px-3 text-[11px] font-medium text-[#334155] hover:border-[#F97316]">
              <CalendarDaysIcon className="h-3.5 w-3.5 text-[#33479A]" />
              {MONTHS[selectedMonth].charAt(0) + MONTHS[selectedMonth].slice(1).toLowerCase()} {selectedYear}
            </button>
          </Tooltip>
          {monthPickerOpen && (
            <div className="absolute left-0 top-10 z-50 w-[272px] overflow-hidden rounded-md border border-[#D7DCE5] bg-white shadow-xl">
              <div className="bg-gradient-to-r from-[#33479A] to-[#3F55B8] px-4 py-3 text-white">
                <div className="text-[10px] opacity-80">{selectedYear}</div>
                <div className="text-[22px] font-medium">{MONTHS[selectedMonth].charAt(0) + MONTHS[selectedMonth].slice(1).toLowerCase()}</div>
              </div>
              <div className="flex items-center justify-between px-4 py-3 text-[12px] font-semibold text-[#334155]">
                <button onClick={() => shiftYear(-1)} className="rounded p-1 hover:bg-[#F3F4F6]"><ChevronLeftIcon className="h-4 w-4" /></button>
                <span>{selectedYear}</span>
                <button onClick={() => shiftYear(1)} className="rounded p-1 hover:bg-[#F3F4F6]"><ChevronRightIcon className="h-4 w-4" /></button>
              </div>
              <div className="grid grid-cols-3 gap-2 px-4 pb-4">
                {MONTHS.map((month, index) => (
                  <button key={month} onClick={() => setMonth(index)} className={`rounded-md py-2 text-[11px] font-medium transition-colors ${index === selectedMonth ? 'bg-[#42C5E5] text-white' : 'text-[#334155] hover:bg-[#EEF2FF]'}`}>
                    {month}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <Tooltip content="Download a blank CSV template for monthly plans" side="bottom">
          <button onClick={downloadTemplate} className="inline-flex h-8 items-center gap-1.5 rounded-[4px] border border-[#D1D5DB] px-3 text-[11px] font-medium text-[#334155] hover:border-[#F97316]">
            <ArrowDownTrayIcon className="h-3.5 w-3.5" /> Download CSV template
          </button>
        </Tooltip>

        <Tooltip content="Upload a monthly plan CSV" side="bottom">
          <button onClick={() => fileRef.current?.click()} className="inline-flex h-8 items-center gap-1.5 rounded-[4px] border border-[#D1D5DB] px-3 text-[11px] font-medium text-[#334155] hover:border-[#F97316]">
            <ArrowUpTrayIcon className="h-3.5 w-3.5" /> Upload CSV
          </button>
        </Tooltip>
        <input ref={fileRef} type="file" accept=".csv,text/csv" className="hidden" onChange={(e) => handleUpload(e.target.files?.[0])} />

        <Tooltip content="Create a monthly production plan" side="bottom">
          <button onClick={() => setAddOpen(true)} className="inline-flex h-8 items-center gap-1.5 rounded-[4px] border border-[#D1D5DB] px-3 text-[11px] font-medium text-[#334155] hover:border-[#F97316]">
            <PlusIcon className="h-3.5 w-3.5" /> Add Monthly Plan
          </button>
        </Tooltip>

        <Tooltip content="Download the currently visible monthly plans" side="bottom">
          <button onClick={downloadPlans} className="inline-flex h-8 items-center gap-1.5 rounded-[4px] border border-[#D1D5DB] px-3 text-[11px] font-medium text-[#334155] hover:border-[#F97316]">
            <ArrowDownTrayIcon className="h-3.5 w-3.5" /> Download
          </button>
        </Tooltip>

        <Tooltip content={filterOpen ? 'Close filters' : 'Open filters'} side="bottom">
          <button onClick={() => setFilterOpen((open) => !open)} className={`inline-flex h-8 items-center gap-1.5 rounded-[4px] border px-3 text-[11px] font-medium ${filterOpen ? 'border-[#F97316] bg-orange-50 text-[#C2410C]' : 'border-[#D1D5DB] text-[#334155] hover:border-[#F97316]'}`}>
            <FunnelIcon className="h-3.5 w-3.5" /> Filters
          </button>
        </Tooltip>
      </div>

      <div className="flex min-h-[calc(100vh-124px)]">
        <div className="min-w-0 flex-1 p-3 sm:p-4">
          {uploadMessage && <div className="mb-2 rounded border border-[#BBF7D0] bg-[#F0FDF4] px-3 py-2 text-[11px] text-[#166534]">{uploadMessage}</div>}
          {visiblePlans.length === 0 ? (
            <div className="flex min-h-[132px] items-center justify-center rounded-[4px] border border-[#E5E7EB] bg-white">
              <div className="text-center text-[#9CA3AF]">
                <CalendarDaysIcon className="mx-auto mb-2 h-10 w-10 text-[#BFC3C9]" />
                <div className="text-[12px]">No monthly plans found</div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-[4px] border border-[#E5E7EB]">
              <table className="min-w-full text-left text-[11px]">
                <thead className="bg-[#F8FAFC] text-[10px] uppercase text-[#64748B]"><tr><th className="px-3 py-2">Machine</th><th className="px-3 py-2">Part</th><th className="px-3 py-2">Month</th><th className="px-3 py-2">Color</th><th className="px-3 py-2">Quantity</th></tr></thead>
                <tbody>{visiblePlans.map((plan) => <tr key={plan.id} className="border-t border-[#E5E7EB]"><td className="px-3 py-2">{plan.machine}</td><td className="px-3 py-2">{plan.part}</td><td className="px-3 py-2">{plan.month}</td><td className="px-3 py-2">{plan.color}</td><td className="px-3 py-2">{plan.quantity}</td></tr>)}</tbody>
              </table>
            </div>
          )}
        </div>

        {filterOpen && (
          <aside className="w-[290px] shrink-0 border-l border-[#E5E7EB] bg-white p-4 shadow-[-4px_0_12px_rgba(15,23,42,0.04)]">
            <div className="mb-4 flex items-center justify-between"><h2 className="text-[14px] font-medium text-[#1F2937]">Filters</h2><Tooltip content="Close filters" side="left"><button onClick={() => setFilterOpen(false)}><XMarkIcon className="h-4 w-4 text-[#6B7280]" /></button></Tooltip></div>
            <FilterSelect label="Machine" value={filters.machine} options={machines} onChange={(value) => setFilters((f) => ({ ...f, machine: value }))} />
            <FilterSelect label="Part" value={filters.part} options={parts} onChange={(value) => setFilters((f) => ({ ...f, part: value }))} />
            <FilterSelect label="Month" value={filters.month} options={['All', ...MONTHS.map((m) => m.charAt(0) + m.slice(1).toLowerCase())]} onChange={(value) => setFilters((f) => ({ ...f, month: value }))} />
            <FilterSelect label="Color" value={filters.color} options={colors} onChange={(value) => setFilters((f) => ({ ...f, color: value }))} />
            <button onClick={resetFilters} className="mt-3 flex h-8 w-full items-center justify-center gap-1 rounded border border-[#CBD5E1] text-[11px] text-[#334155] hover:border-[#F97316] hover:text-[#C2410C]"><ArrowPathIcon className="h-3.5 w-3.5" /> Reset Filters</button>
          </aside>
        )}
      </div>

      {addOpen && <AddPlanModal defaultMonth={MONTHS[selectedMonth].charAt(0) + MONTHS[selectedMonth].slice(1).toLowerCase()} onClose={() => setAddOpen(false)} onAdd={addPlan} />}
    </section>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="mb-3 block"><span className="mb-1 block text-[10px] text-[#6B7280]">{label}</span><select value={value} onChange={(e) => onChange(e.target.value)} className="h-9 w-full rounded-[4px] border border-[#D1D5DB] bg-white px-2 text-[11px] text-[#334155] outline-none focus:border-[#F97316]">{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}

function AddPlanModal({ defaultMonth, onClose, onAdd }: { defaultMonth: string; onClose: () => void; onAdd: (plan: Omit<MonthlyPlan, 'id'>) => void }) {
  const [machine, setMachine] = useState(machines[1]);
  const [part, setPart] = useState(parts[1]);
  const [month, setMonth] = useState(defaultMonth);
  const [color, setColor] = useState(colors[1]);
  const [quantity, setQuantity] = useState('0');

  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <div className="w-full max-w-[470px] rounded-lg bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4"><div><h2 className="text-[16px] font-medium text-[#1F2937]">Add Monthly Plan</h2><p className="mt-0.5 text-[10px] text-[#64748B]">Create a plan for the selected month.</p></div><Tooltip content="Close"><button onClick={onClose}><XMarkIcon className="h-5 w-5 text-[#6B7280]" /></button></Tooltip></div>
      <div className="grid grid-cols-1 gap-3 px-5 py-4 sm:grid-cols-2">
        <ModalSelect label="Machine" value={machine} options={machines.slice(1)} onChange={setMachine} />
        <ModalSelect label="Part" value={part} options={parts.slice(1)} onChange={setPart} />
        <ModalSelect label="Month" value={month} options={MONTHS.map((m) => m.charAt(0) + m.slice(1).toLowerCase())} onChange={setMonth} />
        <ModalSelect label="Color" value={color} options={colors.slice(1)} onChange={setColor} />
        <label className="sm:col-span-2"><span className="mb-1 block text-[10px] text-[#6B7280]">Quantity</span><input type="number" min="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="h-9 w-full rounded border border-[#D1D5DB] px-2 text-[11px] outline-none focus:border-[#F97316]" /></label>
      </div>
      <div className="flex justify-end gap-2 border-t border-[#E5E7EB] px-5 py-3"><button onClick={onClose} className="h-8 rounded border border-[#D1D5DB] px-3 text-[11px]">Cancel</button><button onClick={() => onAdd({ machine, part, month, color, quantity: Number(quantity) || 0 })} className="h-8 rounded bg-[#F97316] px-4 text-[11px] font-medium text-white hover:bg-[#EA580C]">Add Plan</button></div>
    </div>
  </div>;
}

function ModalSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label><span className="mb-1 block text-[10px] text-[#6B7280]">{label}</span><select value={value} onChange={(e) => onChange(e.target.value)} className="h-9 w-full rounded border border-[#D1D5DB] bg-white px-2 text-[11px] outline-none focus:border-[#F97316]">{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}
