import { ReactNode } from 'react';
import { cn } from '@utils/cn';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  headerRight?: ReactNode;
}

export const ChartCard = ({ title, subtitle, children, className, headerRight }: ChartCardProps) => {
  return (
    <div className={cn("bg-white rounded-xl shadow-card border border-gray-200 p-6", className)}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        {headerRight}
      </div>
      {children}
    </div>
  );
};