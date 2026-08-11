// src/features/dashboard/components/ShiftProduction.tsx

import { useState } from 'react';
import { ArrowPathIcon, UserIcon } from '@heroicons/react/24/outline';
import { MachineGroup } from '../types/dashboard';

interface ShiftProductionProps {
  groups: MachineGroup[];
  onRefreshRow?: (machine: string, plan: string) => Promise<void>;
  onRefreshAll?: () => void;
}

const operators = ['Operator', 'Isaac Ayomide', 'Production Planner', 'Admin'];

export function ShiftProduction({ groups, onRefreshRow }: ShiftProductionProps) {
  const [selectedOperators, setSelectedOperators] = useState<Record<string, string>>({});

  return (
    <section className="min-w-0 border border-[#E4E7EC] bg-white px-3 pb-2 pt-2 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <h2 className="mb-2 text-[14px] font-medium text-[#222]">Shift production</h2>

      <div className="space-y-1">
        {groups.map((group) => (
          <article key={group.machine} className="border-b border-[#E5E7EB] pb-2 last:border-b-0">
            <h3 className="mb-1 text-[16px] font-normal leading-5 text-[#344A83]">{group.machine}</h3>

            <div className="mb-1 flex h-8 max-w-[210px] items-center rounded-[2px] bg-[#F0F0F0] px-2">
              <UserIcon className="mr-1.5 h-3.5 w-3.5 text-[#666]" />
              <select
                value={selectedOperators[group.machine] ?? operators[0]}
                onChange={(event) => setSelectedOperators((current) => ({ ...current, [group.machine]: event.target.value }))}
                className="h-full min-w-0 flex-1 appearance-none bg-transparent pr-4 text-[10px] text-[#666] outline-none"
                aria-label={`Operator for ${group.machine}`}
              >
                {operators.map((operator) => <option key={operator}>{operator}</option>)}
              </select>
              <span className="pointer-events-none -ml-3 text-[9px] text-[#777]">▼</span>
            </div>

            <div className="grid grid-cols-[54px_minmax(0,1fr)_64px_64px_54px_20px] items-center border-b border-[#E7E7E7] pb-1 text-[9px] text-[#666]">
              <span>Plan</span>
              <span>Part</span>
              <span>Produced</span>
              <span>Accepted</span>
              <span>Rejected</span>
              <span />
            </div>

            {group.rows.map((row) => (
              <div key={row.plan} className="grid grid-cols-[54px_minmax(0,1fr)_64px_64px_54px_20px] items-center border-b border-[#E9EAED] py-2 text-[10px] last:border-b-0">
                <span className="leading-4 text-[#555]">{row.plan}</span>
                <span className="pr-2 leading-4 text-[#444]">{row.part}</span>
                <span className="text-[#666]">{row.produced.toLocaleString()}</span>
                <span className="text-[#6BA47A]">{row.accepted.toLocaleString()}</span>
                <span className="text-[#D66B6B]">{row.rejected.toLocaleString()}</span>
                <button
                  onClick={() => onRefreshRow?.(group.machine, row.plan)}
                  className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-[#F2F3F5]"
                  title="Refresh production row"
                  aria-label={`Refresh ${group.machine} ${row.plan}`}
                >
                  <ArrowPathIcon className="h-3.5 w-3.5 text-[#344A83]" />
                </button>
              </div>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
