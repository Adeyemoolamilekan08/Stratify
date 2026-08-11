import { format, addDays } from 'date-fns';
import { ProductionPlan } from '../types/productionPlanning';

interface TimelineViewProps {
  plans: ProductionPlan[];
  selectedDate: Date;
  onMachineSelect?: (machine: string | null) => void;
}

const colorMap: Record<string, string> = {
  running: 'bg-[#33A162]',
  planned: 'bg-[#16A34A]',
  'in-progress': 'bg-[#059669]',
  delayed: 'bg-[#D97706]',
  paused: 'bg-[#F59E0B]',
  cancelled: 'bg-[#EF4444]',
};

export const TimelineView = ({ plans, selectedDate, onMachineSelect }: TimelineViewProps) => {
  const days = Array.from({ length: 7 }, (_, idx) => addDays(selectedDate, idx));

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[1fr_auto] gap-4">
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <button className="px-3 py-2 text-[12px] text-[#3B82C4] border border-[#D8DDE6] rounded-md hover:bg-[#EFF6FF]">‹</button>
            <div className="text-[14px] font-semibold text-[#1A1F36]">{format(selectedDate, 'MMMM yyyy')}</div>
            <button className="px-3 py-2 text-[12px] text-[#3B82C4] border border-[#D8DDE6] rounded-md hover:bg-[#EFF6FF]">›</button>
          </div>

          <div className="mt-4 overflow-auto">
            <div className="grid grid-cols-[180px_repeat(7,minmax(80px,1fr))] gap-2 text-[11px] text-[#7C8798] uppercase tracking-[0.12em]">
              <div className="pl-3">Machine / Plan</div>
              {days.map((day) => (
                <div key={day.toISOString()} className="text-center">{format(day, 'EEE')}</div>
              ))}
            </div>

            <div className="mt-3 space-y-2">
              {plans.slice(0, 10).map((plan) => (
                <div key={plan.id} className="grid grid-cols-[180px_repeat(7,minmax(80px,1fr))] gap-2 items-center rounded-lg border border-[#EEF2F7] bg-[#F8FAFC] p-3">
                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => onMachineSelect?.(plan.equipment.name)}
                      className="text-left text-[12px] font-semibold text-[#1A1F36] hover:underline"
                    >
                      {plan.equipment.name}
                    </button>
                    <div className="text-[11px] text-[#6B7280] truncate">{plan.planNumber} · {plan.part.name}</div>
                  </div>
                  {days.map((day) => (
                    <div key={`${plan.id}-${day.toISOString()}`} className="flex items-center justify-center">
                      <span className={`inline-block h-8 w-full rounded-md ${colorMap[plan.status] || 'bg-[#3B82C4]'}`}>
                        &nbsp;
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm h-fit">
          <div className="text-[13px] font-semibold text-[#1A1F36] mb-3">Filters</div>
          <div className="space-y-4 text-[12px] text-[#4B5563]">
            <div>
              <label className="block mb-1 font-medium text-[#7C8798] uppercase tracking-[0.16em]">Machine</label>
              <select className="w-full px-3 py-2 border border-[#D8DDE6] rounded-md bg-white text-[13px] focus:outline-none focus:border-[#3B82C4]">
                <option>All Machines</option>
                {Array.from(new Set(plans.map((plan) => plan.equipment.name))).map((machine) => (
                  <option key={machine} value={machine}>{machine}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium text-[#7C8798] uppercase tracking-[0.16em]">Part</label>
              <select className="w-full px-3 py-2 border border-[#D8DDE6] rounded-md bg-white text-[13px] focus:outline-none focus:border-[#3B82C4]">
                <option>All Parts</option>
                {Array.from(new Set(plans.map((plan) => plan.part.name))).map((partName) => (
                  <option key={partName} value={partName}>{partName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium text-[#7C8798] uppercase tracking-[0.16em]">Status</label>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-[#ECFDF3] px-3 py-1 text-[11px] font-semibold text-[#166534]">Operational</span>
                <span className="inline-flex items-center rounded-full bg-[#E0F2FE] px-3 py-1 text-[11px] font-semibold text-[#0369A1]">New</span>
                <span className="inline-flex items-center rounded-full bg-[#F8FAFC] px-3 py-1 text-[11px] font-semibold text-[#0F172A]">Complete</span>
                <span className="inline-flex items-center rounded-full bg-[#FEF2F2] px-3 py-1 text-[11px] font-semibold text-[#B91C1C]">Aborted</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[12px] text-[#6B7280]">
            <input type="checkbox" id="starred" className="h-4 w-4 rounded border-[#D1D5DB] text-[#3B82C4] focus:ring-[#3B82C4]" />
            <label htmlFor="starred">Starred plans</label>
          </div>
        </div>
      </div>
    </div>
  );
};
