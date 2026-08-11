import React, { useEffect, useMemo, useState } from 'react';
import { Filter, RotateCw } from 'lucide-react';
import { Tooltip } from '@components/ui/Tooltip/Tooltip';
import ProductionLogHeader from '../components/ProductionLogHeader';
import ProductionLogFilters, { ProductionLogFilterState } from '../components/ProductionLogFilters';
import { MachineGroup } from '../components/MachineGroup';
import { ProductionSkeleton } from '../components/ProductionSkeleton';
import { useProductionLog } from '../hooks/useProductionLog';

const initialFilters: ProductionLogFilterState = {
  date: '2026-08-03',
  shift: 'All Shifts',
  machine: 'All Machines',
  order: 'newest',
};

const columns = ['Plan', 'Part', 'Production start', 'Production end', 'Produced', 'Accepted', 'Rejected', 'Rework', 'Scrap (in Kg)'];

const ProductionLogPage = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [filterOpen, setFilterOpen] = useState(false);
  const [operators, setOperators] = useState<Record<string, string>>({});
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(() => Object.fromEntries(columns.map((c) => [c, true])));
  const { groupedData, data, loading, refresh, machines } = useProductionLog(filters);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('stratify-production-log-columns');
      if (stored) setVisibleColumns(JSON.parse(stored));
    } catch {
      // Keep defaults when saved settings are unavailable.
    }
  }, []);

  const summaryLabel = useMemo(() => {
    const shift = filters.shift;
    const machine = filters.machine;
    const date = new Date(`${filters.date}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    return `${data.length} of 97 records | ${machine} | ${shift} - ${date}`;
  }, [data.length, filters]);

  if (loading) return <ProductionSkeleton />;

  return (
    <div className="min-h-full bg-white">
      <ProductionLogHeader onRefresh={refresh} />

      <div className="px-3 sm:px-5 pt-3 pb-10">
        <div className="relative flex items-center justify-between mb-2">
          <div className="text-[14px] font-medium text-[#33479A]">{filters.shift === 'All Shifts' ? 'Shift2' : filters.shift}</div>

          <div className="flex items-center gap-1 text-[10px] text-[#6B7280]">
            <span>{summaryLabel}</span>
            <Tooltip content={filterOpen ? 'Close filters' : 'Open date, shift and machine filters'} side="bottom">
              <button
                type="button"
                onClick={() => setFilterOpen((open) => !open)}
                className={`h-7 w-7 ml-1 inline-flex items-center justify-center rounded-full border transition-colors ${filterOpen ? 'border-[#33479A] bg-[#EEF1FF] text-[#33479A]' : 'border-transparent hover:bg-[#F3F4F6] text-[#6B7280]'}`}
                aria-label="Open production log filters"
              >
                <Filter size={13} />
              </button>
            </Tooltip>
            <ProductionLogFilters
              open={filterOpen}
              value={filters}
              machines={machines}
              onChange={setFilters}
              onClose={() => setFilterOpen(false)}
            />
          </div>
        </div>

        {groupedData.length === 0 ? (
          <div className="min-h-[420px] flex flex-col items-center justify-center text-center text-[#8A8F98]">
            <div className="w-10 h-10 rounded-full bg-[#F4F5F7] flex items-center justify-center mb-3"><Filter size={16} /></div>
            <p className="text-[12px] text-[#6B7280]">No production records match these filters.</p>
            <button type="button" onClick={() => setFilters(initialFilters)} className="mt-3 text-[10px] text-[#33479A] hover:underline">Reset filters</button>
          </div>
        ) : (
          <div>
            {groupedData.map((group) => (
              <MachineGroup
                key={group.machine}
                machineName={group.machine}
                logs={group.logs}
                operator={operators[group.machine] || ''}
                onOperatorChange={(operator) => setOperators((prev) => ({ ...prev, [group.machine]: operator }))}
                visibleColumns={visibleColumns}
              />
            ))}
          </div>
        )}

        <div className="fixed bottom-4 right-4 z-20">
          <Tooltip content="Refresh production log" side="left">
            <button type="button" onClick={refresh} className="h-9 w-9 rounded-full bg-[#33479A] text-white shadow-lg flex items-center justify-center hover:bg-[#2A3C86] transition-colors">
              <RotateCw size={15} />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ProductionLogPage;
