// src/features/downtime-log/components/SplitDowntimeModal.tsx
//
// This modal did not exist before — the "Split" button in DowntimeLog.tsx
// had no handler wired to it. Built to match the reference screenshot:
// Machine/Shift/Duration readout, one or more Reason + Start/End time rows
// (add/remove with + / − buttons), Reset and Split actions.

import { useState } from 'react';

export interface DowntimeSegment {
  id: string;
  reason: string;
  startTime: string;
  endTime: string;
}

interface SplitDowntimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  machine: string;
  shift: string;
  duration: string;
  startTime: string;
  endTime: string;
  reasonOptions: string[];
  onSplit: (segments: DowntimeSegment[]) => void;
}

let segmentIdCounter = 0;
const nextSegmentId = () => `segment-${++segmentIdCounter}`;

function PlusCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" strokeLinecap="round" />
    </svg>
  );
}

function MinusCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8" strokeLinecap="round" />
    </svg>
  );
}

export function SplitDowntimeModal({
  isOpen,
  onClose,
  machine,
  shift,
  duration,
  startTime,
  endTime,
  reasonOptions,
  onSplit,
}: SplitDowntimeModalProps) {
  const [segments, setSegments] = useState<DowntimeSegment[]>([
    { id: nextSegmentId(), reason: '', startTime, endTime: '' },
    { id: nextSegmentId(), reason: '', startTime: '', endTime },
  ]);

  if (!isOpen) return null;

  const updateSegment = (id: string, field: keyof DowntimeSegment, value: string) => {
    setSegments((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const addSegment = () => {
    setSegments((prev) => [...prev, { id: nextSegmentId(), reason: '', startTime: '', endTime: '' }]);
  };

  const removeSegment = (id: string) => {
    setSegments((prev) => (prev.length > 1 ? prev.filter((s) => s.id !== id) : prev));
  };

  const handleReset = () => {
    setSegments([
      { id: nextSegmentId(), reason: '', startTime, endTime: '' },
      { id: nextSegmentId(), reason: '', startTime: '', endTime },
    ]);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleSplit = () => {
    onSplit(segments);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-[520px] max-h-[90vh] overflow-y-auto rounded-[10px] bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB]">
          <h2 className="text-[18px] font-medium text-[#1F2937]">Split downtime</h2>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="p-1 rounded-full text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#1F2937] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Machine / Shift / Duration readout */}
        <div className="grid grid-cols-3 gap-4 px-5 py-4">
          <div>
            <div className="text-[11px] font-medium text-[#6B7280] mb-1">Machine</div>
            <div className="text-[14px] font-medium text-[#1F2937]">{machine}</div>
          </div>
          <div>
            <div className="text-[11px] font-medium text-[#6B7280] mb-1">Shift</div>
            <div className="text-[14px] font-medium text-[#1F2937]">{shift}</div>
          </div>
          <div>
            <div className="text-[11px] font-medium text-[#6B7280] mb-1">Duration</div>
            <div className="text-[14px] font-medium text-[#1F2937]">{duration}</div>
          </div>
        </div>

        {/* Segment rows */}
        <div className="px-5 pb-4 space-y-4">
          {segments.map((segment) => (
            <div key={segment.id} className="flex items-start gap-3">
              <div className="flex-1 space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#6B7280] mb-1">Reason</label>
                  <select
                    value={segment.reason}
                    onChange={(e) => updateSegment(segment.id, 'reason', e.target.value)}
                    className="w-full h-10 px-3 border border-[#D1D5DB] rounded-[6px] text-[13px] text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]/20 focus:border-[#2F6BFF]"
                  >
                    <option value="">Reason</option>
                    {reasonOptions.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#6B7280] mb-1">Start time</label>
                    <input
                      type="text"
                      placeholder="--:--:-- --"
                      value={segment.startTime}
                      onChange={(e) => updateSegment(segment.id, 'startTime', e.target.value)}
                      className="w-full h-10 px-3 border border-[#D1D5DB] rounded-[6px] text-[13px] text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]/20 focus:border-[#2F6BFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#6B7280] mb-1">End time</label>
                    <input
                      type="text"
                      placeholder="--:--:-- --"
                      value={segment.endTime}
                      onChange={(e) => updateSegment(segment.id, 'endTime', e.target.value)}
                      className="w-full h-10 px-3 border border-[#D1D5DB] rounded-[6px] text-[13px] text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]/20 focus:border-[#2F6BFF]"
                    />
                  </div>
                </div>
              </div>

              {/* Add / remove buttons */}
              <div className="flex flex-col gap-2 pt-6">
                <button
                  onClick={addSegment}
                  title="Add another reason"
                  className="text-[#6B7280] hover:text-[#2F6BFF] transition-colors"
                >
                  <PlusCircleIcon />
                </button>
                <button
                  onClick={() => removeSegment(segment.id)}
                  title="Remove this reason"
                  disabled={segments.length === 1}
                  className="text-[#6B7280] hover:text-[#EF4444] transition-colors disabled:opacity-30 disabled:hover:text-[#6B7280]"
                >
                  <MinusCircleIcon />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-[#E5E7EB]">
          <button
            onClick={handleReset}
            className="text-[13px] font-medium text-[#2F6BFF] hover:underline"
          >
            Reset
          </button>
          <button
            onClick={handleSplit}
            className="px-5 py-2 rounded-[6px] bg-[#E5E7EB] text-[#9CA3AF] text-[13px] font-medium enabled:bg-[#2F6BFF] enabled:text-white enabled:hover:bg-[#2558D6] transition-colors"
            disabled={segments.some((s) => !s.reason)}
          >
            Split
          </button>
        </div>
      </div>
    </div>
  );
}
