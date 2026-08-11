import { cn } from '@utils/cn';
import { formatNumber } from '@utils/format';

interface QuantityMetricsProps {
  planned: number;
  actual: number;
  efficiency: number;
}

export const QuantityMetrics = ({ planned, actual, efficiency }: QuantityMetricsProps) => {
  return (
    <div className="flex items-center gap-4 text-[12px]">
      <div>
        <div className="text-[#6B7280]">Planned</div>
        <div className="font-medium text-[#1F2937]">{formatNumber(planned)}</div>
      </div>
      <div>
        <div className="text-[#6B7280]">Produced</div>
        <div className="font-medium text-[#1F2937]">{formatNumber(actual)}</div>
      </div>
      <div>
        <div className="text-[#6B7280]">Efficiency</div>
        <div className={cn(
          "font-medium",
          efficiency >= 90 ? "text-[#3CB44A]" :
          efficiency >= 75 ? "text-[#F5A623]" :
          "text-[#E53935]"
        )}>
          {efficiency}%
        </div>
      </div>
    </div>
  );
};