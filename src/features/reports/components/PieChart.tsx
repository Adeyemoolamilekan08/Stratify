import { cn } from '@utils/cn';

interface PieChartProps {
  data: {
    label: string;
    value: number;
    color?: string;
  }[];
  size?: number;
  className?: string;
}

export const PieChart = ({ data, size = 200, className }: PieChartProps) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const colors = data.map(d => d.color || `hsl(${Math.random() * 360}, 70%, 50%)`);
  
  let currentAngle = 0;
  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (startAngle + angle - 90) * (Math.PI / 180);
    
    const x1 = 50 + 40 * Math.cos(startRad);
    const y1 = 50 + 40 * Math.sin(startRad);
    const x2 = 50 + 40 * Math.cos(endRad);
    const y2 = 50 + 40 * Math.sin(endRad);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    const path = `
      M 50 50
      L ${x1} ${y1}
      A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}
      Z
    `;
    
    return { path, color: colors[index], percentage, label: item.label };
  });

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        {segments.map((segment, index) => (
          <path
            key={index}
            d={segment.path}
            fill={segment.color}
            stroke="white"
            strokeWidth="2"
          />
        ))}
      </svg>
      <div className="ml-6 space-y-1">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center text-sm">
            <span 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-gray-600">{segment.label}</span>
            <span className="ml-2 font-medium text-gray-900">
              {Math.round(segment.percentage)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};