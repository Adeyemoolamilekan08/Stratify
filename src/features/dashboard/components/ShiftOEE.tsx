// ==================== SHIFT OEE - UPDATED WITH SCREENSHOT HEADER ====================
// src/features/dashboard/components/ShiftOEE.tsx

import { useState, useEffect } from 'react';
import type { DashboardData } from '../types/dashboard';
import { motion } from 'framer-motion';

// ==================== TYPES ====================
interface ShiftOEEProps {
  shift?: string;
  data?: DashboardData | null;
}

interface OEEData {
  oee: number;
  trend: number;
  availability: number;
  availabilityTrend: number;
  performance: number;
  performanceTrend: number;
  quality: number;
  qualityTrend: number;
}

// ==================== MOCK DATA ====================
const mockAvailabilityData = [
  { name: 'HT-27-HT-270', availability: 99.2, previous: 97.5 },
  { name: 'HT-39-HT-270', availability: 98.7, previous: 96.8 },
  { name: 'LI-43-HT-1000', availability: 99.8, previous: 98.9 },
  { name: 'MI-04-FU-110', availability: 20.4, previous: 85.6 },
  { name: 'MI-10-HT-120', availability: 97.3, previous: 95.1 },
  { name: 'MI-17-HT-200', availability: 98.1, previous: 97.8 },
  { name: 'MI-23-HT-300', availability: 96.5, previous: 94.2 },
  { name: 'LI-42-HT-700', availability: 55.0, previous: 88.3 },
  { name: 'HT-53-HT-200', availability: 85.0, previous: 82.4 },
  { name: 'MI-10-HT-160', availability: 60.0, previous: 90.1 },
  { name: 'MI-15-HT-200', availability: 97.8, previous: 96.5 },
  { name: 'HT-37-HT-260', availability: 98.3, previous: 97.2 },
];

const mockDowntimeMachineData = [
  { name: 'MI-26-OC', value: 550, cumulative: 18.2 },
  { name: 'LI-41-HXM', value: 548, cumulative: 36.3 },
  { name: 'LI-44-HXM', value: 430, cumulative: 50.6 },
  { name: 'MI-15-HT-200', value: 230, cumulative: 58.2 },
  { name: 'HT-37-HT-260', value: 170, cumulative: 63.8 },
  { name: 'MI-24-OM', value: 155, cumulative: 68.9 },
  { name: 'MI-19-HT-250', value: 140, cumulative: 73.5 },
  { name: 'HT-35-FERO', value: 120, cumulative: 77.5 },
  { name: 'HT-29-HXH', value: 105, cumulative: 80.9 },
  { name: 'MI-16-FU-110', value: 90, cumulative: 83.9 },
  { name: 'MI-04-FU-110', value: 70, cumulative: 86.2 },
  { name: 'MI-20-FU-280', value: 55, cumulative: 88.0 },
];

const mockDowntimeReasonData = [
  { name: 'No Plan', value: 3450 },
  { name: 'Nozzle blockage', value: 165 },
  { name: 'Process Fault', value: 50 },
  { name: 'Mould Breakdown', value: 22 },
  { name: 'Machine Breakdown', value: 15 },
  { name: 'Machine Start Up', value: 5 },
];

// ==================== OEE GAUGE COMPONENT ====================
const OEEGauge = ({ value, trend }: { value: number; trend: number }) => {
  const size = 150;
  const radius = size / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;
  const strokeWidth = 9;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            fill="none"
            stroke="#E6E6E6"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            fill="none"
            stroke="#33479A"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center -translate-y-1">
          <span className="font-semibold text-[#33479A] leading-none text-[25px]">
            {value.toFixed(2)}%
          </span>
          <span className="text-[#49B94A] flex items-center gap-1 text-[10px] mt-1">
            {trend.toFixed(2)}%
          </span>
        </div>
      </div>
      <span className="text-[10px] text-[#666666] mt-2 font-medium">OEE</span>
    </div>
  );
};

// ==================== KPI ROW COMPONENT ====================
const KPIRow = ({ kpis, selected, onSelect }: any) => {
  return (
    <div className="flex w-full mt-2 border-t border-[#E6E6E6] pt-2 gap-2">
      {kpis.map((kpi: any) => (
        <button
          key={kpi.key}
          onClick={() => onSelect(kpi.key)}
          className="flex-1 text-center relative group"
        >
          <div className="text-[10px] text-[#666666] font-normal">{kpi.label}</div>
          <div className="text-[13px] font-semibold text-[#222222] mt-1">
            {kpi.value.toFixed(2)}%
          </div>
          <div className="text-[9px] text-[#49B94A] flex items-center justify-center gap-1 mt-0.5">
            {kpi.trend.toFixed(2)}%
          </div>
          <div
            className={`h-[2px] bg-[#33479A] transition-all duration-300 mx-auto mt-2 ${
              selected === kpi.key ? 'w-[56px] opacity-100' : 'w-0 opacity-0'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

// ==================== AVAILABILITY CHART ====================
const AvailabilityChart = ({ data }: any) => {
  const [isMobile, setIsMobile] = useState(false);
  const maxValue = 125;
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const chartHeight = isMobile ? 180 : 280;
  const barWidth = isMobile ? 5 : 8;
  const labelSize = isMobile ? '7px' : '9px';
  const displayData = isMobile ? data.slice(0, 8) : data;

  return (
    <div className="w-full overflow-x-auto">
      <div className="w-full min-w-[280px]" style={{ height: chartHeight }}>
        <div className="relative w-full h-full">
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-1 sm:py-3">
            {[0, 25, 50, 75, 100, 125].map((val) => (
              <span key={val} className="text-[#999999] -translate-y-1/2" style={{ fontSize: labelSize }}>
                {val}
              </span>
            ))}
          </div>

          <div className="ml-7 sm:ml-9 h-full relative">
            <div className="absolute inset-0 flex flex-col justify-between py-1 sm:py-3">
              {[0, 25, 50, 75, 100, 125].map((val) => (
                <div key={val} className="w-full border-t border-[#F0F0F0]" style={{ height: '20%' }} />
              ))}
            </div>

            <div className="absolute inset-0 flex items-end justify-around px-1 pb-4 sm:pb-6">
              {displayData.map((item: any, index: number) => (
                <div key={index} className="flex items-end gap-[2px] h-full">
                  <div
                    className="bg-[#33479A] rounded-t-[2px] transition-all duration-700"
                    style={{
                      height: `${(item.availability / maxValue) * 85}%`,
                      width: `${barWidth}px`,
                    }}
                  />
                  <div
                    className="bg-[#D0D0D0] rounded-t-[2px] transition-all duration-700"
                    style={{
                      height: `${(item.previous / maxValue) * 85}%`,
                      width: `${barWidth}px`,
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-around">
              {displayData.map((item: any, index: number) => (
                <span
                  key={index}
                  className="text-[#999999] origin-top-left"
                  style={{
                    fontSize: labelSize,
                    transform: 'rotate(-45deg)',
                    whiteSpace: 'nowrap',
                    maxWidth: isMobile ? '28px' : 'auto',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {isMobile ? item.name.substring(0, 5) : item.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== PARETO CHART ====================
const ParetoChart = ({ data }: any) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const maxValue = Math.max(...data.map((d: any) => d.value));
  const maxCumulative = 100;
  const chartHeight = isMobile ? 200 : 280;
  const labelSize = isMobile ? '7px' : '9px';
  const displayData = isMobile ? data.slice(0, 8) : data;

  const dataWithCumulative = displayData.map((item: any, index: number) => ({
    ...item,
    cumulative: displayData.slice(0, index + 1).reduce((sum: number, d: any) => sum + d.value, 0) / displayData.reduce((sum: number, d: any) => sum + d.value, 0) * 100
  }));

  return (
    <div className="w-full overflow-x-auto">
      <div className="w-full min-w-[280px]" style={{ height: chartHeight }}>
        <div className="relative w-full h-full">
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-1 sm:py-3">
            {[0, maxValue * 0.25, maxValue * 0.5, maxValue * 0.75, maxValue].map((val, i) => (
              <span key={i} className="text-[#999999] -translate-y-1/2" style={{ fontSize: labelSize }}>
                {i === 0 ? '0' : Math.round(val)}
              </span>
            ))}
          </div>

          <div className="absolute right-0 top-0 h-full flex flex-col justify-between py-1 sm:py-3">
            {[0, 25, 50, 75, 100].map((val) => (
              <span key={val} className="text-[#999999] -translate-y-1/2" style={{ fontSize: labelSize }}>
                {val}%
              </span>
            ))}
          </div>

          <div className="mx-7 sm:mx-10 h-full relative">
            <div className="absolute inset-0 flex flex-col justify-between py-1 sm:py-3">
              {[0, 25, 50, 75, 100].map((val) => (
                <div key={val} className="w-full border-t border-[#F0F0F0]" style={{ height: '25%' }} />
              ))}
            </div>

            <div className="absolute inset-0 flex items-end justify-between px-1 pb-4 sm:pb-6">
              {dataWithCumulative.map((item: any, index: number) => (
                <div
                  key={index}
                  className="bg-[#4A4A50] rounded-t-[2px] transition-all duration-700"
                  style={{
                    height: `${(item.value / maxValue) * 85}%`,
                    width: `${Math.max(4, 50 / dataWithCumulative.length)}px`,
                  }}
                />
              ))}
            </div>

            <div className="absolute inset-0 pb-4 sm:pb-6">
              <svg className="w-full h-full">
                <polyline
                  points={dataWithCumulative
                    .map((item: any, index: number) => {
                      const x = (index / (dataWithCumulative.length - 1)) * 100;
                      const y = 100 - (item.cumulative / maxCumulative) * 85;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#76AEEB"
                  strokeWidth="1.5"
                />
                {dataWithCumulative.map((item: any, index: number) => {
                  const x = (index / (dataWithCumulative.length - 1)) * 100;
                  const y = 100 - (item.cumulative / maxCumulative) * 85;
                  return (
                    <circle key={index} cx={x} cy={y} r="2.5" fill="#76AEEB" />
                  );
                })}
              </svg>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-between">
              {dataWithCumulative.map((item: any, index: number) => (
                <span
                  key={index}
                  className="text-[#999999] origin-top-left"
                  style={{
                    fontSize: labelSize,
                    transform: 'rotate(-45deg)',
                    whiteSpace: 'nowrap',
                    maxWidth: isMobile ? '24px' : 'auto',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
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

// ==================== MAIN COMPONENT ====================
export function ShiftOEE({ shift: _shift = 'Shift2, 2026-07-20', data }: ShiftOEEProps) {
  const [loading, setLoading] = useState(false);
  const [fallbackOeeData] = useState<OEEData>({
    oee: 59.64, trend: 7.48, availability: 77.69, availabilityTrend: 3.19,
    performance: 77.02, performanceTrend: 5.55, quality: 99.0, qualityTrend: 0.63,
  });
  const oeeData = data?.oeeMetrics ?? fallbackOeeData;
  const [selectedKPI, setSelectedKPI] = useState('availability');

  const kpis = [
    {
      key: 'availability',
      value: oeeData.availability,
      label: 'Availability',
      trend: oeeData.availabilityTrend,
    },
    {
      key: 'performance',
      value: oeeData.performance,
      label: 'Performance',
      trend: oeeData.performanceTrend,
    },
    {
      key: 'quality',
      value: oeeData.quality,
      label: 'Quality',
      trend: oeeData.qualityTrend,
    },
  ];

  if (loading) {
    return (
      <div className="border border-[#E5E7EB] bg-white p-3">
        <div className="flex items-center justify-center h-48 text-[#999999]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-w-0 border border-[#E5E7EB] bg-white p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* REMOVED: Header with Shift summary and Shift2, 2026-07-20 and sync icon */}
        {/* Now just the Shift OEE label */}
        <div className="mb-1">
          <span className="text-[14px] font-normal text-[#222]">Shift OEE</span>
        </div>

        {/* OEE Gauge */}
        <div className="flex justify-center mb-1">
          <OEEGauge value={oeeData.oee} trend={oeeData.trend} />
        </div>

        {/* KPI Row */}
        <KPIRow kpis={kpis} selected={selectedKPI} onSelect={setSelectedKPI} />

        {/* Availability Chart */}
        <div className="mt-3">
          <h3 className="text-[12px] font-medium text-[#1F2937] text-center mb-3">
            Availability comparison
          </h3>
          <AvailabilityChart data={mockAvailabilityData} />
        </div>

        {/* Downtime Charts */}
        <div className="mt-4">
          <h3 className="text-[12px] font-medium text-[#1F2937] text-center mb-3">
            Downtime by machine
          </h3>
          <ParetoChart data={mockDowntimeMachineData} />
        </div>

        <div className="mt-4">
          <h3 className="text-[12px] font-medium text-[#1F2937] text-center mb-3">
            Downtime by reason
          </h3>
          <ParetoChart data={mockDowntimeReasonData} />
        </div>
      </motion.div>
    </div>
  );
}