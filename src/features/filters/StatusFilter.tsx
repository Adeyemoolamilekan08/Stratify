interface StatusFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const StatusFilter = ({ value, onChange }: StatusFilterProps) => {
  return (
    <div>
      <label className="block text-[11px] font-medium text-[#6B7280] mb-1">Status</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-[12px] bg-white focus:outline-none focus:ring-1 focus:ring-[#3048A8]"
      >
        <option value="all">All Status</option>
        <option value="running">Running</option>
        <option value="stopped">Stopped</option>
        <option value="idle">Idle</option>
        <option value="maintenance">Maintenance</option>
        <option value="setup">Setup</option>
      </select>
    </div>
  );
};
