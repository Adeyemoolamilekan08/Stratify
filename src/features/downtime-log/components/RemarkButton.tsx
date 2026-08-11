import { useState } from 'react';

interface RemarkButtonProps {
  initialRemark?: string;
  onSave?: (remark: string) => void;
}

export const RemarkButton = ({ initialRemark = '', onSave }: RemarkButtonProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [remark, setRemark] = useState(initialRemark);

  const handleSave = () => {
    if (onSave) {
      onSave(remark);
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-1">
        <input
          type="text"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className="border border-[#E5E7EB] rounded px-1 py-0.5 text-[11px]"
          autoFocus
        />
        <button onClick={handleSave} className="text-[#31B86A]">✓</button>
        <button onClick={() => setIsEditing(false)} className="text-[#EF5350]">✕</button>
      </div>
    );
  }

  return (
    <div 
      className="flex items-center gap-1 text-[#6B7280] hover:text-[#1F2937] cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      <span>Remark</span>
      <span className="text-[10px]">✏️</span>
    </div>
  );
};
