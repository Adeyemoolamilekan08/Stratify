import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Tooltip } from '@components/ui/Tooltip/Tooltip';

type ActionType = 'Rejected' | 'Rework' | 'Scrap';

interface ProductionActionModalProps {
  open: boolean;
  action: ActionType | null;
  plan: string;
  part: string;
  onClose: () => void;
  onSave: (quantity: number, reason: string) => void;
}

const reasons: Record<ActionType, string[]> = {
  Rejected: ['Visual defect', 'Dimension issue', 'Process failure', 'Other'],
  Rework: ['Repair required', 'Machine issue', 'Quality adjustment', 'Other'],
  Scrap: ['Material damage', 'Trim waste', 'Contamination', 'Other'],
};

export default function ProductionActionModal({ open, action, plan, part, onClose, onSave }: ProductionActionModalProps) {
  const [quantity, setQuantity] = useState('1');
  const [reason, setReason] = useState('');

  if (!open || !action) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/30 flex items-center justify-center p-4">
      <div className="w-full max-w-[380px] bg-white rounded-[4px] shadow-[0_18px_45px_rgba(0,0,0,.18)] border border-[#D8DDE6]">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#ECEEF2]">
          <div>
            <h2 className="text-[13px] font-medium text-[#1F2937]">Record {action}</h2>
            <p className="text-[10px] text-[#8A8F98] mt-0.5">Plan {plan} · {part}</p>
          </div>
          <Tooltip content="Close">
            <button type="button" onClick={onClose} className="h-7 w-7 rounded hover:bg-[#F3F4F6] flex items-center justify-center text-[#6B7280]"><X size={15} /></button>
          </Tooltip>
        </div>
        <div className="p-4 space-y-3">
          <label className="block">
            <span className="block text-[10px] text-[#6B7280] mb-1">Quantity</span>
            <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full h-9 rounded-[2px] border border-[#D8DDE6] px-2.5 text-[11px] outline-none focus:border-[#33479A]" />
          </label>
          <label className="block">
            <span className="block text-[10px] text-[#6B7280] mb-1">Reason</span>
            <select value={reason} onChange={(e) => setReason(e.target.value)} className="w-full h-9 rounded-[2px] border border-[#D8DDE6] px-2.5 text-[11px] bg-white outline-none focus:border-[#33479A]">
              <option value="">Select reason</option>
              {reasons[action].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <div className="flex justify-end gap-2 px-4 py-3 border-t border-[#ECEEF2]">
          <button type="button" onClick={onClose} className="h-8 px-3 rounded-[2px] border border-[#D8DDE6] text-[10px] text-[#4B5563] hover:bg-[#F7F8FA]">Cancel</button>
          <button type="button" onClick={() => { onSave(Math.max(1, Number(quantity) || 1), reason || 'Other'); setQuantity('1'); setReason(''); }} className="h-8 px-3 rounded-[2px] bg-[#33479A] text-white text-[10px] hover:bg-[#2A3C86]">Save</button>
        </div>
      </div>
    </div>
  );
}
