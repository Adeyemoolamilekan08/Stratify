// src/shared/components/ShiftSelector.tsx

interface ShiftSelectorProps {
  selected: 'A' | 'B' | 'C';
  onChange: (shift: 'A' | 'B' | 'C') => void;
  size?: 'sm' | 'md';
}

export const ShiftSelector = ({ selected, onChange, size = 'md' }: ShiftSelectorProps) => {
  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-[11px] px-3 py-1';
  
  return (
    <div className="flex gap-1">
      {(['A', 'B', 'C'] as const).map((shift) => (
        <button
          key={shift}
          onClick={() => onChange(shift)}
          className={`${sizeClasses} font-medium rounded-[4px] transition-all duration-150 ${
            selected === shift
              ? 'bg-[#33479A] text-white'
              : 'bg-[#F5F6FA] text-[#666666] hover:bg-[#E8E9ED]'
          }`}
        >
          {shift}
        </button>
      ))}
    </div>
  );
};