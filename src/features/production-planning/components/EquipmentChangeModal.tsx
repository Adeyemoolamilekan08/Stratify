import { useMemo, useState } from 'react';
import { Modal } from '@components/ui/Modal/Modal';
import { ProductionPlan } from '../types/productionPlanning';

interface EquipmentChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  plans: ProductionPlan[];
}

const equipmentOptions = [
  'HT-28-HT-270',
  'HT-29-HT-270',
  'HT-30-HT-270',
  'HT-31-HT-270',
  'HT-32-HT-270',
];

export const EquipmentChangeModal = ({ isOpen, onClose, plans }: EquipmentChangeModalProps) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(plans[0]?.id || null);
  const [selectedEquipment, setSelectedEquipment] = useState<string>(equipmentOptions[0]);

  const selectedPlan = useMemo(
    () => plans.find((plan) => plan.id === selectedPlanId) || plans[0] || null,
    [plans, selectedPlanId]
  );

  const handleSubmit = () => {
    // Placeholder: update plan equipment in the future
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Equipment change" size="lg">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-[11px] font-semibold text-[#7C8798] uppercase tracking-[0.2em] mb-2">Select plan</label>
            <select
              value={selectedPlanId ?? ''}
              onChange={(e) => setSelectedPlanId(e.target.value)}
              className="w-full px-3 py-2 border border-[#D8DDE6] rounded-md text-[13px] focus:outline-none focus:border-[#3B82C4]"
            >
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.planNumber} · {plan.part.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[#7C8798] uppercase tracking-[0.2em] mb-2">New equipment</label>
            <select
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value)}
              className="w-full px-3 py-2 border border-[#D8DDE6] rounded-md text-[13px] focus:outline-none focus:border-[#3B82C4]"
            >
              {equipmentOptions.map((equipment) => (
                <option key={equipment} value={equipment}>
                  {equipment}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedPlan ? (
          <div className="rounded-[10px] border border-[#E5E7EB] bg-[#F8FAFC] p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-[11px] text-[#7C8798] uppercase tracking-[0.16em] mb-1">Current plan</p>
                <p className="text-[13px] font-semibold text-[#1A1F36]">{selectedPlan.planNumber}</p>
                <p className="text-[12px] text-[#6B7280]">{selectedPlan.part.name}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#7C8798] uppercase tracking-[0.16em] mb-1">Current machine</p>
                <p className="text-[13px] font-semibold text-[#1A1F36]">{selectedPlan.equipment.name}</p>
                <p className="text-[12px] text-[#6B7280]">{selectedPlan.equipment.department}</p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-[13px] font-semibold text-[#3B82C4] border border-[#3B82C4] rounded-md hover:bg-[#EBF4FF] transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 text-[13px] font-semibold text-white bg-[#10B981] rounded-md hover:bg-[#059669] transition"
          >
            Apply change
          </button>
        </div>
      </div>
    </Modal>
  );
};
