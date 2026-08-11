interface ShiftFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const ShiftFilter = ({ value, onChange }: ShiftFilterProps) => {
  return (
    <div>
      <label className="block text-[11px] font-medium text-[#6B7280] mb-1">Shift</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[12px] bg-white focus:outline-none focus:ring-1 focus:ring-[#3048A8]"
      >
        <option value="all">All Shifts</option>
        <option value="A">Shift A</option>
        <option value="B">Shift B</option>
        <option value="C">Shift C</option>
      </select>
    </div>
  );
};
