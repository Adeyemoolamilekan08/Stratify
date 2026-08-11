// src/features/dashboard/components/ParetoChart.tsx

import React, { useEffect, useState } from 'react';
import { ParetoDatum } from '../types/dashboard';

interface ParetoChartProps {
  data: ParetoDatum[];
  loading?: boolean;
  title?: string;
}

export const ParetoChart: React.FC<ParetoChartProps> = ({ data, loading }) => {
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

  // Sort by value descending and calculate cumulative
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const total = sortedData.reduce((sum, d) => sum + d.value, 0);
  const withCumulative = sortedData.map((item, index) => ({
    ...item,
    cumulative: sortedData.slice(0, index + 1).reduce((s, d) => s + d.value, 0) / total * 100
  }));

  const maxValue = Math.max(...withCumulative.map(d => d.value));
  const maxCumulative = 100;
  const chartHeight = isMobile ? 200 : 320;
  const labelSize = isMobile ? '7px' : '10px';
  const displayData = isMobile ? withCumulative.slice(0, 8) : withCumulative;

  return (
    <div className="w-full overflow-x-auto">
      <div className="w-full min-w-[320px]" style={{ height: chartHeight }}>
        <div className="relative w-full h-full">
          {/* Left Y-Axis */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-1 sm:py-3">
            {[0, maxValue * 0.25, maxValue * 0.5, maxValue * 0.75, maxValue].map((val, i) => (
              <span key={i} className="text-[#64748B] -translate-y-1/2" style={{ fontSize: labelSize }}>
                {i === 0 ? '0' : Math.round(val)}
              </span>
            ))}
          </div>

          {/* Right Y-Axis */}
          <div className="absolute right-0 top-0 h-full flex flex-col justify-between py-1 sm:py-3">
            {[0, 25, 50, 75, 100].map((val) => (
              <span key={val} className="text-[#64748B] -translate-y-1/2" style={{ fontSize: labelSize }}>
                {val}%
              </span>
            ))}
          </div>

          <div className="mx-7 sm:mx-10 h-full relative">
            {/* Gridlines */}
            <div className="absolute inset-0 flex flex-col justify-between py-1 sm:py-3">
              {[0, 25, 50, 75, 100].map((val) => (
                <div key={val} className="w-full border-t border-[#F1F5F9]" style={{ height: '25%' }} />
              ))}
            </div>

            {/* Bars */}
            <div className="absolute inset-0 flex items-end justify-between px-1 pb-4 sm:pb-6">
              {displayData.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#3F4451] rounded-t-[2px] transition-all duration-700"
                  style={{
                    height: `${(item.value / maxValue) * 85}%`,
                    width: `${Math.max(8, 60 / displayData.length)}px`,
                  }}
                />
              ))}
            </div>

            {/* Pareto Line */}
            <div className="absolute inset-0 pb-4 sm:pb-6">
              <svg className="w-full h-full">
                <polyline
                  points={displayData
                    .map((item, index) => {
                      const x = (index / (displayData.length - 1 || 1)) * 100;
                      const y = 100 - (item.cumulative / maxCumulative) * 85;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#60A5FA"
                  strokeWidth="2.5"
                />
                {displayData.map((item, index) => {
                  const x = (index / (displayData.length - 1 || 1)) * 100;
                  const y = 100 - (item.cumulative / maxCumulative) * 85;
                  return (
                    <circle key={index} cx={x} cy={y} r="4.5" fill="#60A5FA" stroke="#FFFFFF" strokeWidth="1.5" />
                  );
                })}
              </svg>
            </div>

            {/* X-Axis Labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between">
              {displayData.map((item, index) => (
                <span
                  key={index}
                  className="text-[#64748B] origin-top-left"
                  style={{
                    fontSize: labelSize,
                    transform: 'rotate(-45deg)',
                    whiteSpace: 'nowrap',
                    maxWidth: isMobile ? '24px' : 'auto',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  title={item.name}
                >
                  {isMobile && item.name.length > 6 ? item.name.substring(0, 4) + '…' : item.name}
                </span>
              ))}
            </div>
          </div>
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