interface MachineFilterProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export const MachineFilter = ({ value, onChange }: MachineFilterProps) => {
  const machines = ['HT-28-HT-270', 'HT-29-HT-270', 'HT-30-HT-270', 'HT-32-FERO-275', 'HT-34-FERO-200'];

  return (
    <div>
      <label className="block text-[11px] font-medium text-[#6B7280] mb-1">Machine</label>
      <select
        value={value || 'all'}
        onChange={(e) => onChange(e.target.value === 'all' ? null : e.target.value)}
        className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[12px] bg-white focus:outline-none focus:ring-1 focus:ring-[#3048A8]"
      >
        <option value="all">All Machines</option>
        {machines.map((machine) => (
          <option key={machine} value={machine}>{machine}</option>
        ))}
      </select>
    </div>
  );
};
