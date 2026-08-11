import { ShiftCalendar } from './ShiftCalendar';
import { MachineFilter } from '@features/filters/MachineFilter';
import { ShiftFilter } from '@features/filters/ShiftFilter';
import { StatusFilter } from '@features/filters/StatusFilter';
import { StatusLegend } from '@features/filters/StatusLegend';

interface RightFilterPanelProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  selectedShift: string;
  onShiftChange: (shift: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedMachine: string | null;
  onMachineChange: (machine: string | null) => void;
}

export const RightFilterPanel = ({
  selectedDate,
  onDateChange,
  selectedShift,
  onShiftChange,
  selectedStatus,
  onStatusChange,
  selectedMachine,
  onMachineChange,
}: RightFilterPanelProps) => {
  return (
    <div className="w-[280px] bg-white border-l border-[#E5E7EB] p-4 flex flex-col h-screen overflow-y-auto">
      <div className="mb-6">
        <ShiftCalendar selectedDate={selectedDate} onDateChange={onDateChange} />
      </div>
      <div className="space-y-4">
        <ShiftFilter value={selectedShift} onChange={onShiftChange} />
        <MachineFilter value={selectedMachine} onChange={onMachineChange} />
        <StatusFilter value={selectedStatus} onChange={onStatusChange} />
      </div>
      <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
        <StatusLegend />
      </div>
    </div>
  );
};

// ✅ Add default export
export default RightFilterPanel;