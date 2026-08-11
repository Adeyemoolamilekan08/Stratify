// src/features/dashboard/components/AvailabilityChart.tsx

import React, { useEffect, useState } from 'react';
import { AvailabilityComparison } from '../types/dashboard';

interface AvailabilityChartProps {
  data: AvailabilityComparison[];
  loading?: boolean;
}

export const AvailabilityChart: React.FC<AvailabilityChartProps> = ({ data, loading }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (loading) {
    return <Skeleton height={320} />;
  }

  if (!data || data.length === 0) {
    return <EmptyState message="No data for this shift yet." />;
  }

  const maxValue = 125;
  const chartHeight = isMobile ? 200 : 320;
  const barWidth = isMobile ? 6 : 14;
  const labelSize = isMobile ? '7px' : '10px';
  const displayData = isMobile ? data.slice(0, 10) : data;

  return (
    <div className="w-full overflow-x-auto">
      <div className="w-full min-w-[320px]" style={{ height: chartHeight }}>
        <div className="relative w-full h-full">
          {/* Y-Axis Labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-1 sm:py-3">
            {[0, 25, 50, 75, 100, 125].map((val) => (
              <span key={val} className="text-[#64748B] -translate-y-1/2" style={{ fontSize: labelSize }}>
                {val}
              </span>
            ))}
          </div>

          <div className="ml-7 sm:ml-9 h-full relative">
            {/* Gridlines */}
            <div className="absolute inset-0 flex flex-col justify-between py-1 sm:py-3">
              {[0, 25, 50, 75, 100, 125].map((val) => (
                <div key={val} className="w-full border-t border-[#F1F5F9]" style={{ height: '20%' }} />
              ))}
            </div>

            {/* Bars */}
            <div className="absolute inset-0 flex items-end justify-around px-1 pb-4 sm:pb-6">
              {displayData.map((item, index) => (
                <div key={index} className="flex items-end gap-[4px] h-full">
                  <div
                    className="bg-[#B8BCC8] rounded-t-[2px] transition-all duration-700"
                    style={{
                      height: `${(item.shift1 / maxValue) * 85}%`,
                      width: `${barWidth}px`,
                    }}
                  />
                  <div
                    className="bg-[#2C3E9E] rounded-t-[2px] transition-all duration-700"
                    style={{
                      height: `${(item.shift2 / maxValue) * 85}%`,
                      width: `${barWidth}px`,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* X-Axis Labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-around">
              {displayData.map((item, index) => (
                <span
                  key={index}
                  className="text-[#64748B] origin-top-left"
                  style={{
                    fontSize: labelSize,
                    transform: 'rotate(-45deg)',
                    whiteSpace: 'nowrap',
                    maxWidth: isMobile ? '28px' : 'auto',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  title={item.machine}
                >
                  {isMobile ? item.machine.substring(0, 5) : item.machine}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-3 text-[12px] text-[#64748B]">
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-3 bg-[#B8BCC8] rounded-[2px]"></span>
          Shift1
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-3 bg-[#2C3E9E] rounded-[2px]"></span>
          Shift2
        </div>
      </div>
    </div>
  );
};

// Placeholder components
const Skeleton = ({ height }: { height: number }) => (
  <div className="animate-pulse bg-gray-200 rounded" style={{ height }} />
);

const EmptyState = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center h-[320px] bg-[#F8FAFC] rounded border border-[#F1F5F9]">
    <span className="text-[#64748B]">{message}</span>
  </div>
);