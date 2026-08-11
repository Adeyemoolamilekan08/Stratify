import { ReactNode } from 'react';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@utils/cn';

interface ToolbarProps {
  onSearch?: (value: string) => void;
  onRefresh?: () => void;
  onExport?: () => void;
  onAdd?: () => void;
  onFilter?: () => void;
  searchPlaceholder?: string;
  children?: ReactNode;
  className?: string;
  showSearch?: boolean;
  showRefresh?: boolean;
  showExport?: boolean;
  showAdd?: boolean;
  showFilter?: boolean;
}

export const Toolbar = ({
  onSearch,
  onRefresh,
  onExport,
  onAdd,
  onFilter,
  searchPlaceholder = 'Search...',
  children,
  className,
  showSearch = true,
  showRefresh = true,
  showExport = true,
  showAdd = true,
  showFilter = true,
}: ToolbarProps) => {
  return (
    <div className={cn(
      "flex flex-wrap items-center gap-2 py-2",
      className
    )}>
      {/* Search */}
      {showSearch && onSearch && (
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-[#E5E7EB] rounded focus:outline-none focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316]"
          />
          <MagnifyingGlassIcon className="absolute left-2.5 top-2 w-3.5 h-3.5 text-gray-400" />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1.5 ml-auto">
        {showFilter && onFilter && (
          <button
            onClick={onFilter}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors"
            title="Filter"
          >
            <FunnelIcon className="w-4 h-4" />
          </button>
        )}
        
        {showRefresh && onRefresh && (
          <button
            onClick={onRefresh}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors"
            title="Refresh"
          >
            <ArrowPathIcon className="w-4 h-4" />
          </button>
        )}
        
        {showExport && onExport && (
          <button
            onClick={onExport}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors"
            title="Export"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
          </button>
        )}
        
        {showAdd && onAdd && (
          <button
            onClick={onAdd}
            className="px-3 py-1.5 text-sm font-medium text-white bg-[#F97316] rounded hover:bg-[#EA580C] transition-colors flex items-center gap-1"
          >
            <PlusIcon className="w-4 h-4" />
            Add New
          </button>
        )}
        
        {children}
      </div>
    </div>
  );
};