import React from 'react';

interface FiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  selectedShift: string;
  onShiftChange: (shift: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedMachine: string | null;
  onMachineChange: (machine: string | null) => void;
}

const FiltersDrawer: React.FC<FiltersDrawerProps> = ({
  isOpen,
  onClose,
  selectedDate,
  onDateChange,
  selectedShift,
  onShiftChange,
  selectedStatus,
  onStatusChange,
  selectedMachine,
  onMachineChange,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-[320px] bg-white border-l border-[#D8DDE6] z-50 shadow-lg">
        <div className="flex items-center justify-between p-4 border-b border-[#D8DDE6]">
          <h3 className="text-[14px] font-medium text-[#1A1F36]">Filters</h3>
          <button 
            onClick={onClose}
            className="p-1 text-[#7C8798] hover:text-[#1A1F36] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-[11px] font-medium text-[#7C8798] uppercase tracking-[0.04em] mb-1">Date</label>
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => onDateChange(new Date(e.target.value))}
              className="w-full px-3 py-1.5 text-[13px] border border-[#D8DDE6] rounded-[2px] focus:outline-none focus:border-[#3B82C4] bg-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#7C8798] uppercase tracking-[0.04em] mb-1">Shift</label>
            <select
              value={selectedShift}
              onChange={(e) => onShiftChange(e.target.value)}
              className="w-full px-3 py-1.5 text-[13px] border border-[#D8DDE6] rounded-[2px] focus:outline-none focus:border-[#3B82C4] bg-white"
            >
              <option value="all">All Shifts</option>
              <option value="Shift1">Shift 1</option>
              <option value="Shift2">Shift 2</option>
              <option value="Shift3">Shift 3</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#7C8798] uppercase tracking-[0.04em] mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full px-3 py-1.5 text-[13px] border border-[#D8DDE6] rounded-[2px] focus:outline-none focus:border-[#3B82C4] bg-white"
            >
              <option value="all">All Status</option>
              <option value="planned">Planned</option>
              <option value="running">Running</option>
              <option value="stopped">Stopped</option>
              <option value="idle">Idle</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#7C8798] uppercase tracking-[0.04em] mb-1">Machine</label>
            <select
              value={selectedMachine || ''}
              onChange={(e) => onMachineChange(e.target.value || null)}
              className="w-full px-3 py-1.5 text-[13px] border border-[#D8DDE6] rounded-[2px] focus:outline-none focus:border-[#3B82C4] bg-white"
            >
              <option value="">All Machines</option>
              <option value="HT-29-HT-270">HT-29-HT-270</option>
              <option value="HT-30-HT-270">HT-30-HT-270</option>
              <option value="HT-31-HT-270">HT-31-HT-270</option>
            </select>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-2 mt-4 text-[13px] font-medium text-white bg-[#3B82C4] hover:bg-[#2F6FA3] rounded-[2px] transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FiltersDrawer;
