// src/features/dashboard/pages/Dashboard.tsx

import { useMemo } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { DashboardHeader } from '../components/DashboardHeader';
import { ShiftOEE } from '../components/ShiftOEE';
import { ShiftProduction } from '../components/ShiftProduction';
import { ShiftDowntime } from '../components/ShiftDowntime';

const Dashboard = () => {
  const {
    shifts,
    selectedShiftId,
    setSelectedShiftId,
    data,
    error,
    refresh,
    refreshRow,
  } = useDashboard();

  const selectedShiftLabel = useMemo(
    () =>
      shifts.find((shift) => shift.id === selectedShiftId)?.label ||
      data?.shift?.label ||
      'Shift',
    [shifts, selectedShiftId, data?.shift?.label]
  );

  if (error) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center bg-white">
        <div className="mb-4 text-red-500">{error}</div>
        <button onClick={refresh} className="rounded px-4 py-2 bg-[#2F6BFF] text-white">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full w-full bg-white">
      <DashboardHeader
        shifts={shifts}
        selectedShiftId={selectedShiftId}
        onShiftChange={setSelectedShiftId}
        onRefresh={refresh}
      />

      {/* The dashboard itself does not scroll. DashboardLayout owns the one page scrollbar. */}
      <div className="w-full">
        <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
          <ShiftOEE shift={selectedShiftLabel} data={data} />

          <div className="flex min-w-0 flex-col gap-2">
            <ShiftProduction
              groups={data?.productionGroups || []}
              onRefreshRow={refreshRow}
            />
            <ShiftDowntime shift={selectedShiftLabel} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
