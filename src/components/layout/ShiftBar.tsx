interface ShiftBarProps {
  shift: string;
  date: string;
}

export const ShiftBar = ({ shift, date }: ShiftBarProps) => {
  return (
    <div className="sticky bottom-16 bg-white rounded-t-xl shadow-lg border-t border-[#E5E7EB] p-3 flex items-center justify-between z-10">
      <button className="text-[#1F2937]">☰</button>
      <div className="flex items-center gap-2">
        <span className="font-medium text-[#1F2937]">Shift summary</span>
      </div>
      <button className="px-4 py-1.5 border border-[#2F6BFF] rounded-[8px] text-[11px] text-[#2F6BFF]">
        {shift}, {date}
      </button>
    </div>
  );
};