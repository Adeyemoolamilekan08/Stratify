import { useState } from 'react';

interface EquipmentFilterProps {
  onFilterChange: (value: string) => void;
  machines: string[];
}

export const EquipmentFilter = ({ onFilterChange, machines }: EquipmentFilterProps) => {
  const [selected, setSelected] = useState('All Machines');

  const handleChange = (value: string) => {
    setSelected(value);
    onFilterChange(value);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <select
        value={selected}
        onChange={(e) => handleChange(e.target.value)}
        className="px-3 py-1 border border-[#E5E7EB] rounded-[8px] text-[11px] bg-white focus:outline-none focus:ring-1 focus:ring-[#2F6BFF]"
      >
        <option>All Machines</option>
        {machines.map((machine) => (
          <option key={machine}>{machine}</option>
        ))}
      </select>
      <span className="text-[#6B7280]">—</span>
      <input
        type="date"
        className="px-3 py-1 border border-[#E5E7EB] rounded-[8px] text-[11px] bg-white focus:outline-none focus:ring-1 focus:ring-[#2F6BFF]"
        defaultValue="2026-07-11"
      />
    </div>
  );
};
