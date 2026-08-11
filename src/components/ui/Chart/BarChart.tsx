import { cn } from '@utils/cn';

interface BarChartProps {
  data: Array<{
    label: string;
    value: number;
    color?: string;
  }>;
  height?: number;
  className?: string;
}

export const BarChart = ({ data, height = 300, className }: BarChartProps) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);

  return (
    <div className={cn("border border-[#E5E7EB] rounded p-4 bg-white", className)}>
      <div className="flex items-end justify-between gap-2" style={{ height }}>
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          const barColor = item.color || '#3B82F6';
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full rounded-t transition-all duration-500"
                style={{ 
                  height: `${percentage}%`, 
                  backgroundColor: barColor,
                  minHeight: '4px',
                }}
              />
              <span className="text-xs text-gray-500 mt-2 truncate max-w-full">
                {item.label}
              </span>
              <span className="text-xs font-medium text-gray-700 mt-0.5">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};