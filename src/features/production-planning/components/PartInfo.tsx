interface PartInfoProps {
  part: string;
  description: string;
  cavity: number;
  cycleTime: number;
  equipment: string;
  mould: string;
}

export const PartInfo = ({ 
  part, 
  description, 
  cavity, 
  cycleTime, 
  equipment, 
  mould 
}: PartInfoProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 text-[12px]">
      <div>
        <div className="text-[#6B7280]">Part</div>
        <div className="font-medium text-[#1F2937]">{part}</div>
        <div className="text-[#6B7280] text-[11px]">{description}</div>
      </div>
      <div>
        <div className="text-[#6B7280]">Cavity / Cycle</div>
        <div className="font-medium text-[#1F2937]">{cavity} / {cycleTime}s</div>
      </div>
      <div>
        <div className="text-[#6B7280]">Equipment / Mould</div>
        <div className="font-medium text-[#1F2937]">{equipment} / {mould}</div>
      </div>
    </div>
  );
};
