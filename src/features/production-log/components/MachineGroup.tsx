import React, { useMemo, useState } from 'react';
import { ChevronDown, CircleHelp, History, RotateCcw } from 'lucide-react';
import { Tooltip } from '@components/ui/Tooltip/Tooltip';
import ProductionActionModal from './ProductionActionModal';

interface ProductionLog {
  id: string;
  plan: string;
  part: string;
  productionStart: string;
  productionEnd: string;
  produced: number;
  accepted: number;
  rejected: number;
  rework: number;
  scrap: number;
}

interface MachineGroupProps {
  machineName: string;
  logs: ProductionLog[];
  operator: string;
  onOperatorChange: (operator: string) => void;
  visibleColumns: Record<string, boolean>;
}

const mockOperators = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams'];

export const MachineGroup: React.FC<MachineGroupProps> = ({
  machineName,
  logs,
  operator,
  onOperatorChange,
  visibleColumns,
}) => {
  const [action, setAction] = useState<'Rejected' | 'Rework' | 'Scrap' | null>(null);
  const [activeRow, setActiveRow] = useState<ProductionLog | null>(null);
  const [localLogs, setLocalLogs] = useState(logs);

  const rows = useMemo(() => localLogs, [localLogs]);

  const refreshRow = (id: string) => {
    setLocalLogs((prev) => prev.map((row) => row.id === id ? { ...row } : row));
  };

  const handleActionSave = (quantity: number, reason: string) => {
    if (!activeRow || !action) return;
    setLocalLogs((prev) => prev.map((row) => {
      if (row.id !== activeRow.id) return row;
      if (action === 'Rejected') return { ...row, rejected: row.rejected + quantity, accepted: Math.max(0, row.accepted - quantity) };
      if (action === 'Rework') return { ...row, rework: row.rework + quantity };
      return { ...row, scrap: row.scrap + quantity };
    }));
    setAction(null);
    setActiveRow(null);
    void reason;
  };

  const actionLabel = action ? `Record ${action.toLowerCase()}` : '';

  return (
    <section className="mb-5">
      <h2 className="text-[14px] font-medium text-[#33479A] mb-1.5">{machineName}</h2>

      <div className="relative w-[170px] mb-2">
        <select
          value={operator}
          onChange={(e) => onOperatorChange(e.target.value)}
          className="appearance-none w-full h-[31px] rounded-[2px] border-0 bg-[#F0F1F3] pl-8 pr-7 text-[10px] text-[#5B6068] outline-none hover:bg-[#E9EAED]"
          aria-label={`Operator for ${machineName}`}
        >
          <option value="">Select operator</option>
          {mockOperators.map((item) => <option key={item}>{item}</option>)}
        </select>
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#73777D]">♟</span>
        <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#73777D] pointer-events-none" />
      </div>

      <div className="overflow-x-auto border-b border-[#DDE1E7] scrollbar-thin">
        <table className="min-w-[790px] w-full border-collapse table-fixed">
          <thead>
            <tr className="border-b border-[#E6E8EC]">
              {visibleColumns.Plan !== false && <th className="w-[72px] text-left px-2 py-2 text-[9px] font-normal text-[#6B7280]">Plan</th>}
              {visibleColumns.Part !== false && <th className="w-[175px] text-left px-2 py-2 text-[9px] font-normal text-[#6B7280]">Part</th>}
              {visibleColumns['Production start'] !== false && <th className="w-[90px] text-left px-2 py-2 text-[9px] font-normal text-[#6B7280] leading-tight">Production<br/>start</th>}
              {visibleColumns['Production end'] !== false && <th className="w-[90px] text-left px-2 py-2 text-[9px] font-normal text-[#6B7280] leading-tight">Production<br/>end</th>}
              {visibleColumns.Produced !== false && <th className="w-[70px] text-right px-2 py-2 text-[9px] font-normal text-[#6B7280]">Produced</th>}
              {visibleColumns.Accepted !== false && <th className="w-[70px] text-right px-2 py-2 text-[9px] font-normal text-[#6B7280]">Accepted</th>}
              {visibleColumns.Rejected !== false && <th className="w-[75px] text-right px-2 py-2 text-[9px] font-normal text-[#6B7280]">Rejected</th>}
              {visibleColumns.Rework !== false && <th className="w-[70px] text-right px-2 py-2 text-[9px] font-normal text-[#6B7280]">Rework</th>}
              {visibleColumns['Scrap (in Kg)'] !== false && <th className="w-[85px] text-right px-2 py-2 text-[9px] font-normal text-[#6B7280] leading-tight">Scrap (in<br/>Kg)</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-[#EEF0F2] hover:bg-[#FBFCFE] transition-colors">
                {visibleColumns.Plan !== false && <td className="px-2 py-2 text-[10px] text-[#4B5563] align-top">{row.plan}</td>}
                {visibleColumns.Part !== false && <td className="px-2 py-2 text-[10px] text-[#4B5563] leading-tight align-top">{row.part}</td>}
                {visibleColumns['Production start'] !== false && <td className="px-2 py-2 text-[10px] text-[#4B5563] align-top">{row.productionStart}</td>}
                {visibleColumns['Production end'] !== false && <td className="px-2 py-2 text-[10px] text-[#4B5563] align-top">{row.productionEnd}</td>}
                {visibleColumns.Produced !== false && <td className="px-2 py-2 text-[10px] text-[#6B7280] text-right align-top">{row.produced.toLocaleString()}</td>}
                {visibleColumns.Accepted !== false && <td className="px-2 py-2 text-[10px] text-[#68A778] text-right align-top">{row.accepted.toLocaleString()}</td>}
                {visibleColumns.Rejected !== false && <td className="px-2 py-2 text-right align-top"><div className="flex items-center justify-end gap-1.5"><span className="text-[10px] text-[#D98B92]">{row.rejected}</span><Tooltip content="Record rejection"><button type="button" onClick={() => { setActiveRow(row); setAction('Rejected'); }} className="text-[#33479A] hover:text-[#263777]"><RotateCcw size={12} /></button></Tooltip></div></td>}
                {visibleColumns.Rework !== false && <td className="px-2 py-2 text-right align-top"><div className="flex items-center justify-end gap-1.5"><span className="text-[10px] text-[#D5A84D]">{row.rework}</span><Tooltip content="Record rework"><button type="button" onClick={() => { setActiveRow(row); setAction('Rework'); }} className="text-[#33479A] hover:text-[#263777]"><History size={12} /></button></Tooltip></div></td>}
                {visibleColumns['Scrap (in Kg)'] !== false && <td className="px-2 py-2 text-right align-top"><div className="flex items-center justify-end gap-1.5"><span className="text-[10px] text-[#D5A84D]">{row.scrap.toFixed(1)}</span><Tooltip content="Record scrap"><button type="button" onClick={() => { setActiveRow(row); setAction('Scrap'); }} className="text-[#33479A] hover:text-[#263777]"><CircleHelp size={12} /></button></Tooltip></div></td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activeRow && action && (
        <ProductionActionModal
          open={Boolean(activeRow && action)}
          action={action}
          plan={activeRow.plan}
          part={activeRow.part}
          onClose={() => { setAction(null); setActiveRow(null); }}
          onSave={handleActionSave}
        />
      )}

      <Tooltip content={`Refresh ${machineName} records`} side="top">
        <button type="button" onClick={() => rows[0] && refreshRow(rows[0].id)} className="sr-only" aria-label={`Refresh ${machineName}`} />
      </Tooltip>
      <span className="sr-only">{actionLabel}</span>
    </section>
  );
};

export default MachineGroup;
