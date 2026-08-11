import { useEffect, useState } from 'react';
import { Modal } from '@components/ui/Modal/Modal';
import { ProductionPlan } from '../types/productionPlanning';

interface ReorderPlansModalProps {
  isOpen: boolean;
  onClose: () => void;
  plans: ProductionPlan[];
  onSave: (plans: ProductionPlan[]) => void;
}

export const ReorderPlansModal = ({ isOpen, onClose, plans, onSave }: ReorderPlansModalProps) => {
  const [items, setItems] = useState<ProductionPlan[]>(plans);

  useEffect(() => {
    setItems(plans);
  }, [plans]);

  const move = (index: number, direction: 'up' | 'down') => {
    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= items.length) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[nextIndex];
    newItems[nextIndex] = temp;
    setItems(newItems);
  };

  const handleSave = () => {
    onSave(items);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Re-order plans" size="lg">
      <div className="space-y-4">
        <div className="text-[13px] text-[#6B7280]">Drag or reorder plans to update the execution sequence for the selected machine.</div>
        <div className="space-y-2">
          {items.map((plan, index) => (
            <div key={plan.id} className="flex items-center justify-between gap-3 rounded-md border border-[#E5E7EB] p-3 bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded bg-white border border-[#D8DDE6] text-[12px] font-semibold text-[#3B82C4]">
                  {index + 1}
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-[#1A1F36]">{plan.planNumber}</div>
                  <div className="text-[12px] text-[#6B7280]">{plan.part.name} · {plan.equipment.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => move(index, 'up')}
                  disabled={index === 0}
                  className="inline-flex h-8 w-8 items-center justify-center rounded border border-[#D8DDE6] bg-white text-[#4B5563] hover:bg-[#F3F4F6] disabled:opacity-50"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 'down')}
                  disabled={index === items.length - 1}
                  className="inline-flex h-8 w-8 items-center justify-center rounded border border-[#D8DDE6] bg-white text-[#4B5563] hover:bg-[#F3F4F6] disabled:opacity-50"
                >
                  ▼
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-[#E5E7EB]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-[13px] font-semibold text-[#3B82C4] border border-[#3B82C4] rounded-md hover:bg-[#EBF4FF] transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 text-[13px] font-semibold text-white bg-[#3B82C4] rounded-md hover:bg-[#2563EB] transition"
          >
            Save order
          </button>
        </div>
      </div>
    </Modal>
  );
};
