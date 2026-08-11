import React, { useState } from 'react';
import ProductionLogHeader from '../components/ProductionLogHeader';

const columns = ['Plan', 'Part', 'Production start', 'Production end', 'Produced', 'Accepted', 'Rejected', 'Rework', 'Scrap (in Kg)'];

export default function ProductionLogSettings() {
  const [visible, setVisible] = useState<Record<string, boolean>>(() => Object.fromEntries(columns.map((c) => [c, true])));
  const [hourlyShiftwise, setHourlyShiftwise] = useState(true);

  const updateColumn = (column: string) => {
    setVisible((prev) => {
      const next = { ...prev, [column]: !prev[column] };
      window.localStorage.setItem('stratify-production-log-columns', JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="min-h-full bg-white">
      <ProductionLogHeader title="Settings" showBack />
      <div className="px-4 sm:px-6 py-5 max-w-[920px]">
        <div className="text-[11px] uppercase tracking-[0.06em] text-[#8A8F98] mb-2">General</div>
        <div className="grid grid-cols-[150px_1fr] border-t border-[#ECEEF2]">
          <aside className="border-r border-[#ECEEF2] pt-2">
            <button className="w-full text-left px-3 py-2 text-[11px] font-medium text-[#33479A] bg-[#EEF1FF]">Column configuration</button>
            <button className="w-full text-left px-3 py-2 text-[11px] text-[#6B7280] hover:bg-[#F7F8FA]">Data configuration</button>
          </aside>
          <section className="pl-6 pt-2">
            <h2 className="text-[13px] font-medium text-[#374151] mb-3">Column configuration</h2>
            <div className="grid grid-cols-[1fr_120px] text-[10px] text-[#9CA3AF] border-b border-[#ECEEF2] pb-2">
              <span>Column Name</span><span className="text-center">Show/Hide</span>
            </div>
            {columns.map((column) => (
              <div key={column} className="grid grid-cols-[1fr_120px] items-center py-2 border-b border-[#F1F2F4]">
                <span className="text-[11px] text-[#4B5563]">{column}</span>
                <div className="flex justify-center">
                  <button type="button" onClick={() => updateColumn(column)} className={`relative w-9 h-5 rounded-full transition-colors ${visible[column] ? 'bg-[#33479A]' : 'bg-[#D1D5DB]'}`} aria-label={`${visible[column] ? 'Hide' : 'Show'} ${column}`}>
                    <span className={`absolute top-[2px] h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${visible[column] ? 'translate-x-4' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-7">
              <h2 className="text-[13px] font-medium text-[#374151] mb-3">Data configuration</h2>
              <div className="grid grid-cols-[1fr_180px] items-center border-t border-[#ECEEF2] py-3">
                <span className="text-[11px] text-[#4B5563]">Rejection Type</span>
                <select className="h-8 border border-[#D8DDE6] rounded-[2px] text-[10px] px-2 bg-white" defaultValue="HourlyShiftWise">
                  <option value="HourlyShiftWise">Hourly/ShiftWise</option>
                  <option value="ShiftWise">ShiftWise</option>
                </select>
              </div>
              <div className="grid grid-cols-[1fr_180px] items-center border-t border-[#ECEEF2] py-3">
                <span className="text-[11px] text-[#4B5563]">Hourly / ShiftWise</span>
                <div className="flex justify-end">
                  <button type="button" onClick={() => setHourlyShiftwise((v) => !v)} className={`relative w-9 h-5 rounded-full ${hourlyShiftwise ? 'bg-[#33479A]' : 'bg-[#D1D5DB]'}`}>
                    <span className={`absolute top-[2px] h-4 w-4 rounded-full bg-white shadow-sm ${hourlyShiftwise ? 'translate-x-4' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
