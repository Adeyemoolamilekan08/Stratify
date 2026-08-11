import { cn } from '@utils/cn';

interface BarChartProps {
  data: {
    label: string;
    value: number;
    color?: string;
  }[];
  maxValue?: number;
  height?: number;
  className?: string;
}

export const BarChart = ({ data, maxValue, height = 200, className }: BarChartProps) => {
  const max = maxValue || Math.max(...data.map(d => d.value));

  return (
    <div className={cn("flex items-end justify-between gap-2", className)} style={{ height }}>
      {data.map((item, index) => {
        const percentage = (item.value / max) * 100;
        const barColor = item.color || 'bg-primary-500';
        
        return (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className={cn("w-full rounded-t transition-all duration-500", barColor)}
              style={{ height: `${percentage}%`, minHeight: '4px' }}
            />
            <span className="text-xs text-gray-600 mt-1 truncate max-w-full">
              {item.label}
            </span>
            <span className="text-xs font-medium text-gray-900">
              {item.value}
            </span>
          </div>
        );
      })}
    </div>
  );
};