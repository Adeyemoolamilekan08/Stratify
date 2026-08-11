import { useState } from 'react';
import { cn } from '@utils/cn';

interface ConfigPanelProps {
  onThemeChange?: (theme: 'light' | 'dark') => void;
  onViewChange?: (view: 'shift-wise' | 'hourly') => void;
}

export const ConfigPanel = ({ onThemeChange, onViewChange }: ConfigPanelProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [view, setView] = useState<'shift-wise' | 'hourly'>('shift-wise');

  const handleThemeChange = (value: 'light' | 'dark') => {
    setTheme(value);
    onThemeChange?.(value);
  };

  const handleViewChange = (value: 'shift-wise' | 'hourly') => {
    setView(value);
    onViewChange?.(value);
  };

  return (
    <div className="bg-white rounded-[10px] border border-[#E5E7EB] p-4 shadow-sm">
      <h3 className="text-[12px] font-medium text-[#1F2937] mb-3">Configure</h3>
      
      {/* THEME */}
      <div className="mb-3">
        <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1.5">Theme</p>
        <div className="flex gap-2">
          {(['light', 'dark'] as const).map((option) => (
            <button
              key={option}
              onClick={() => handleThemeChange(option)}
              className={cn(
                "px-4 py-1.5 text-[11px] font-medium rounded-[6px] transition-colors",
                theme === option
                  ? 'bg-[#F97316] text-white' // Orange active
                  : 'bg-[#F6F8FB] text-[#6B7280] hover:bg-[#E5E7EB]'
              )}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW */}
      <div className="mb-3">
        <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1.5">View</p>
        <div className="flex gap-2">
          {(['shift-wise', 'hourly'] as const).map((option) => (
            <button
              key={option}
              onClick={() => handleViewChange(option)}
              className={cn(
                "px-4 py-1.5 text-[11px] font-medium rounded-[6px] transition-colors",
                view === option
                  ? 'bg-[#F97316] text-white' // Orange active
                  : 'bg-[#F6F8FB] text-[#6B7280] hover:bg-[#E5E7EB]'
              )}
            >
              {option === 'shift-wise' ? 'Shift-wise' : 'Hourly'}
            </button>
          ))}
        </div>
      </div>

      {/* AVAILABILITY */}
      <div className="mb-3">
        <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1.5">Availability</p>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-8 h-8 bg-[#F6F8FB] rounded-[6px] flex items-center justify-center text-[#6B7280]">
              📍
            </div>
          ))}
        </div>
      </div>

      {/* PERFORMANCE */}
      <div>
        <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1.5">Performance</p>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-8 h-8 bg-[#F6F8FB] rounded-[6px] flex items-center justify-center text-[#6B7280]">
              📍
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};