// src/features/dashboard/components/ShiftDowntime.tsx

import { useState } from 'react';

interface ShiftDowntimeProps { shift?: string; }
interface DowntimeRow { machine: string; startTime: string; endTime: string; reason: string; isPlanned: string; }

const downtimeData: DowntimeRow[] = Array.from({ length: 24 }, (_, index) => ({
  machine: 'HT-34-FERO-200',
  startTime: ['15:52:05', '15:51:15', '15:50:25', '15:49:35', '15:48:45', '15:47:55'][index % 6],
  endTime: ['15:52:06', '15:51:41', '15:50:36', '15:50:01', '15:49:12', '15:48:12'][index % 6],
  reason: '',
  isPlanned: '-',
}));

const reasons = ['Trial Production', 'Nozzle blockage', 'Power failure', 'Mould Change', 'Machine Breakdown', 'Material shortage', 'Process Fault', 'No reason'];

export function ShiftDowntime({ shift: _shift }: ShiftDowntimeProps) {
  const [selectedReasons, setSelectedReasons] = useState<Record<number, string>>({});

  return (
    <section className="min-w-0 border border-[#E4E7EC] bg-white px-3 pb-3 pt-2 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <h2 className="mb-2 text-[14px] font-medium text-[#222]">Shift downtime</h2>
      <h3 className="mb-1 text-[16px] font-normal leading-5 text-[#344A83]">HT-34-FERO-200</h3>

      <div className="grid grid-cols-[68px_68px_68px_minmax(80px,1fr)_42px] border-b border-[#DADDE2] pb-1 text-[9px] text-[#555]">
        <span>Machine</span><span>Downtime start</span><span>Downtime end</span><span>Reason</span><span className="text-center">Is planned</span>
      </div>

      <div>
        {downtimeData.map((row, index) => (
          <div key={index} className="grid min-h-[42px] grid-cols-[68px_68px_68px_minmax(80px,1fr)_42px] items-center border-b border-[#E5E7EB] text-[10px] text-[#555]">
            <span className="pr-1 leading-4">{row.machine}</span>
            <span>{row.startTime}</span>
            <span>{row.endTime}</span>
            <div className="pr-1">
              <select
                value={selectedReasons[index] ?? ''}
                onChange={(event) => setSelectedReasons((current) => ({ ...current, [index]: event.target.value }))}
                className="h-8 w-full appearance-none rounded-[2px] bg-[#F0F0F0] px-2 text-[9px] text-[#666] outline-none focus:ring-1 focus:ring-[#33479A]"
                aria-label={`Downtime reason ${index + 1}`}
              >
                <option value=""> </option>
                {reasons.map((reason) => <option key={reason}>{reason}</option>)}
              </select>
            </div>
            <span className="text-center">{row.isPlanned}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
