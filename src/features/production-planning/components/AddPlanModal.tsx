import { useState } from 'react';
import { Modal } from '@components/ui/Modal/Modal';

interface AddPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

const machineOptions = [
  'HT-28-HT-270',
  'HT-29-HT-270',
  'HT-30-HT-270',
  'HT-31-HT-270',
];

const equipmentOptions = [
  '15ML MEASURING CUP',
  'SFG - Diamond Jug',
  'Darvinks NeoSkin Flip Cap',
  'PP 750 RECT. CONTAINER BOTTOM',
];

const partOptions = [
  '100-7248',
  '100-7262',
  '100-7249',
  '100-7254',
];

export const AddPlanModal = ({ isOpen, onClose, onSave }: AddPlanModalProps) => {
  const [part, setPart] = useState(partOptions[0]);
  const [machine, setMachine] = useState(machineOptions[0]);
  const [equipment, setEquipment] = useState(equipmentOptions[0]);
  const [cycleTime, setCycleTime] = useState('');
  const [delayTime, setDelayTime] = useState('');
  const [activeCavity, setActiveCavity] = useState('');
  const [quantity, setQuantity] = useState('');
  const [startAt, setStartAt] = useState('2026-08-03T15:30');
  const [markStar, setMarkStar] = useState(false);
  const [markTrial, setMarkTrial] = useState(false);

  const handleSave = (clearAfter = false) => {
    onSave({ part, machine, equipment, cycleTime, delayTime, activeCavity, quantity, startAt, markStar, markTrial });
    if (!clearAfter) {
      onClose();
    } else {
      setQuantity('');
      setStartAt('2026-08-03T15:30');
      setMarkStar(false);
      setMarkTrial(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add new plan" size="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="block text-[11px] font-semibold text-[#7C8798] uppercase tracking-[0.2em] mb-2">Part</label>
            <select
              value={part}
              onChange={(e) => setPart(e.target.value)}
              className="w-full px-3 py-2 border border-[#D8DDE6] rounded-md text-[13px] focus:outline-none focus:border-[#3B82C4]"
            >
              {partOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[#7C8798] uppercase tracking-[0.2em] mb-2">Machine</label>
            <select
              value={machine}
              onChange={(e) => setMachine(e.target.value)}
              className="w-full px-3 py-2 border border-[#D8DDE6] rounded-md text-[13px] focus:outline-none focus:border-[#3B82C4] bg-[#F7F8FA]"
            >
              {machineOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[#7C8798] uppercase tracking-[0.2em] mb-2">Equipment</label>
            <select
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
              className="w-full px-3 py-2 border border-[#D8DDE6] rounded-md text-[13px] focus:outline-none focus:border-[#3B82C4] bg-[#F7F8FA]"
            >
              {equipmentOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-md border border-[#D8DDE6] bg-[#F7F8FA] p-4">
            <label className="block text-[11px] font-semibold text-[#7C8798] uppercase tracking-[0.2em] mb-3">Cycle time</label>
            <div className="text-[14px] text-[#1A1F36]">{cycleTime || 'secs'}</div>
          </div>
          <div className="rounded-md border border-[#D8DDE6] bg-[#F7F8FA] p-4">
            <label className="block text-[11px] font-semibold text-[#7C8798] uppercase tracking-[0.2em] mb-3">Delay time</label>
            <div className="text-[14px] text-[#1A1F36]">{delayTime || 'secs'}</div>
          </div>
          <div className="rounded-md border border-[#D8DDE6] bg-[#F7F8FA] p-4">
            <label className="block text-[11px] font-semibold text-[#7C8798] uppercase tracking-[0.2em] mb-3">Active cavity</label>
            <div className="text-[14px] text-[#1A1F36]">{activeCavity || '-'}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <label className="block text-[11px] font-semibold text-[#7C8798] uppercase tracking-[0.2em] mb-2">Quantity</label>
            <div className="flex items-center gap-3">
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 border border-[#D8DDE6] rounded-md text-[13px] focus:outline-none focus:border-[#3B82C4]"
              />
              <span className="text-[12px] text-[#7C8798]">pcs</span>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[#7C8798] uppercase tracking-[0.2em] mb-2">Scheduled start time</label>
            <input
              type="datetime-local"
              value={startAt}
              onChange={(e) => setStartAt(e.target.value)}
              className="w-full px-3 py-2 border border-[#D8DDE6] rounded-md text-[13px] focus:outline-none focus:border-[#3B82C4]"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <label className="inline-flex items-center gap-2 text-[13px] text-[#1A1F36]">
            <input type="checkbox" checked={markStar} onChange={() => setMarkStar(!markStar)} className="rounded border-[#D8DDE6] text-[#3B82C4] focus:ring-[#3B82C4]" />
            Mark as star
          </label>
          <label className="inline-flex items-center gap-2 text-[13px] text-[#1A1F36]">
            <input type="checkbox" checked={markTrial} onChange={() => setMarkTrial(!markTrial)} className="rounded border-[#D8DDE6] text-[#3B82C4] focus:ring-[#3B82C4]" />
            Mark as trial
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-[13px] font-semibold text-[#3B82C4] border border-[#3B82C4] rounded-md hover:bg-[#EBF4FF] transition"
          >
            Exit
          </button>
          <button
            type="button"
            onClick={() => handleSave(false)}
            className="px-4 py-2 text-[13px] font-semibold text-white bg-[#3B82C4] rounded-md hover:bg-[#2563EB] transition"
          >
            Save & Exit
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)}
            className="px-4 py-2 text-[13px] font-semibold text-white bg-[#1D4ED8] rounded-md hover:bg-[#1E40AF] transition"
          >
            Save & Add new
          </button>
        </div>
      </div>
    </Modal>
  );
};
