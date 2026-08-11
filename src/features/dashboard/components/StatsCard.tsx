import { ReactNode } from 'react';
import { cn } from '@utils/cn';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: 'primary' | 'green' | 'yellow' | 'red' | 'blue';
  change?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatsCard = ({ 
  title, 
  value, 
  icon, 
  color = 'primary', 
  change 
}: StatsCardProps) => {
  const colorClasses = {
    primary: 'text-blue-600 bg-blue-50',
    green: 'text-green-600 bg-green-50',
    yellow: 'text-yellow-600 bg-yellow-50',
    red: 'text-red-600 bg-red-50',
    blue: 'text-blue-600 bg-blue-50',
  };

  return (
    <div className="bg-white border border-[#E5E7EB] rounded p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-medium text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={cn(
              "text-xs font-medium mt-1",
              change.isPositive ? "text-green-600" : "text-red-600"
            )}>
              {change.isPositive ? '↑' : '↓'} {Math.abs(change.value)}%
            </p>
          )}
        </div>
        {icon && (
          <div className={cn("p-2 rounded", colorClasses[color])}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};