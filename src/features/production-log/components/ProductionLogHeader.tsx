import React from 'react';
import { ArrowLeft, CircleHelp, RefreshCw, Settings, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@components/ui/Tooltip/Tooltip';

interface ProductionLogHeaderProps {
  title?: string;
  showBack?: boolean;
  onRefresh?: () => void;
}

export const ProductionLogHeader: React.FC<ProductionLogHeaderProps> = ({
  title = 'Production Log',
  showBack = false,
  onRefresh,
}) => {
  const navigate = useNavigate();

  return (
    <header className="h-[52px] shrink-0 border-b border-[#E5E7EB] bg-white px-3 sm:px-5 flex items-center justify-between">
      <div className="flex items-center gap-2 min-w-0">
        {showBack && (
          <Tooltip content="Back to Production Log" side="bottom">
            <button
              type="button"
              onClick={() => navigate('/production-log')}
              className="h-7 w-7 inline-flex items-center justify-center rounded hover:bg-[#F3F4F6] text-[#4B5563] transition-colors"
              aria-label="Back to Production Log"
            >
              <ArrowLeft size={16} />
            </button>
          </Tooltip>
        )}
        <h1 className="text-[14px] font-medium text-[#1F2937] truncate">{title}</h1>
        {!showBack && (
          <div className="flex items-center gap-1">
            <Tooltip content="Production Log settings" side="bottom">
              <button
                type="button"
                onClick={() => navigate('/production-log/settings')}
                className="h-7 w-7 inline-flex items-center justify-center rounded hover:bg-[#F3F4F6] text-[#6B7280] transition-colors"
                aria-label="Production Log settings"
              >
                <Settings size={15} />
              </button>
            </Tooltip>
            <Tooltip content="Refresh production records" side="bottom">
              <button
                type="button"
                onClick={onRefresh}
                className="h-7 w-7 inline-flex items-center justify-center rounded hover:bg-[#F3F4F6] text-[#6B7280] transition-colors"
                aria-label="Refresh production records"
              >
                <RefreshCw size={15} />
              </button>
            </Tooltip>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative hidden md:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            aria-label="Search reports and insights"
            placeholder="Search reports & insights"
            className="w-[250px] lg:w-[300px] h-[32px] rounded-full border border-[#D9DDE5] bg-white pl-9 pr-3 text-[11px] text-[#374151] outline-none focus:border-[#9CA3AF] focus:ring-1 focus:ring-[#E5E7EB]"
          />
        </div>
        <Tooltip content="Sync data" side="bottom">
          <button type="button" className="h-7 w-7 inline-flex items-center justify-center rounded hover:bg-[#F3F4F6] text-[#6B7280]">
            <RefreshCw size={14} />
          </button>
        </Tooltip>
        <Tooltip content="Help & documentation" side="bottom">
          <button type="button" className="h-7 w-7 inline-flex items-center justify-center rounded hover:bg-[#F3F4F6] text-[#6B7280]">
            <CircleHelp size={15} />
          </button>
        </Tooltip>
        <Tooltip content="User profile" side="bottom">
          <button type="button" className="h-7 w-7 rounded-full bg-[#33479A] text-white text-[11px] font-medium flex items-center justify-center">
            N
          </button>
        </Tooltip>
      </div>
    </header>
  );
};

export default ProductionLogHeader;
