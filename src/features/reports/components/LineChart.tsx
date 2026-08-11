import { cn } from '@utils/cn';

interface LineChartProps {
  data: {
    label: string;
    value: number;
  }[];
  maxValue?: number;
  height?: number;
  className?: string;
  color?: string;
}

export const LineChart = ({ data, maxValue, height = 200, className, color = 'stroke-primary-500' }: LineChartProps) => {
  const max = maxValue || Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;
  const padding = 20;
  const chartHeight = height - padding * 2;
  const chartWidth = 100;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * chartWidth;
    const y = chartHeight - ((d.value - min) / range) * chartHeight + padding;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className={cn("relative", className)} style={{ height }}>
      <svg className="w-full h-full" viewBox={`0 0 ${chartWidth} ${height}`} preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          className={cn("stroke-2", color)}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};