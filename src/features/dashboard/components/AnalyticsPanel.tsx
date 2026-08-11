import { useEffect, useState } from 'react';
import { OEEDonut } from './OEEDonut';
import { MetricCarousel } from './MetricCarousel';
import { AvailabilityChart } from './AvailabilityChart';
import { ParetoChart } from './ParetoChart';
import { Metric, AvailabilityComparison, ParetoDatum } from '../types/dashboard';

interface AnalyticsPanelProps {
  metrics: Metric[];
  oeeMetrics?: {
    oee: number;
    trend: number;
    availability: number;
    availabilityTrend: number;
    performance: number;
    performanceTrend: number;
    quality: number;
    qualityTrend: number;
  };
  availabilityComparison?: AvailabilityComparison[];
  downtimeByMachine?: ParetoDatum[];
  downtimeByReason?: ParetoDatum[];
  loading?: boolean;
}

export function AnalyticsPanel({
  metrics,
  oeeMetrics,
  availabilityComparison = [],
  downtimeByMachine = [],
  downtimeByReason = [],
  loading = false,
}: AnalyticsPanelProps) {
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setViewport('mobile');
      } else if (width < 1024) {
        setViewport('tablet');
      } else {
        setViewport('desktop');
      }
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const size = viewport === 'mobile' ? 180 : 220;

  return (
    <div className="bg-white rounded-[12px] border border-[#F1F5F9] shadow-sm p-4">
      <div className="space-y-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] font-semibold text-[#1E293B]">Shift OEE</h2>
            <span className="text-[12px] text-[#64748B]">Updated live</span>
          </div>

          <div className="flex flex-col items-center">
            <OEEDonut
              value={oeeMetrics?.oee ?? 0}
              trend={oeeMetrics?.trend ?? 0}
              label="OEE"
              size={size}
            />
            <div className="mt-4 w-full">
              <MetricCarousel metrics={metrics} />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-[14px] font-semibold text-[#1E293B] mb-3">Availability comparison</h3>
          <AvailabilityChart data={availabilityComparison} loading={loading} />
        </div>

        <div>
          <h3 className="text-[14px] font-semibold text-[#1E293B] mb-3">Downtime by machine</h3>
          <ParetoChart data={downtimeByMachine} />
        </div>

        <div>
          <h3 className="text-[14px] font-semibold text-[#1E293B] mb-3">Downtime by reason</h3>
          <ParetoChart data={downtimeByReason} />
        </div>
      </div>
    </div>
  );
};
