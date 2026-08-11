// src/features/master-data/components/MasterToolbar.tsx

import React from 'react';
import { cn } from '@utils/cn';

interface MasterToolbarProps {
  onAdd?: () => void;
  onRefresh?: () => void;
  onExport?: () => void;
  onDownloadCSV?: () => void;
  onImport?: () => void;
  onDelete?: () => void;
  selectedCount?: number;
  canDelete?: boolean;
  canCreate?: boolean;
  canExport?: boolean;
  canImport?: boolean;
  className?: string;
}

export const MasterToolbar: React.FC<MasterToolbarProps> = ({
  onAdd,
  onRefresh,
  onExport,
  onDownloadCSV,
  onImport,
  onDelete,
  selectedCount = 0,
  canDelete = true,
  canCreate = true,
  canExport = true,
  canImport = true,
  className,
}) => {
  const buttonClass = "h-8 px-3 text-[12px] font-medium rounded-[6px] border border-[#E5E7EB] flex items-center gap-1.5 transition-all duration-150";

  return (
    <div className={cn("flex items-center gap-2 mb-4 flex-wrap", className)}>
      {/* Add New */}
      {canCreate && onAdd && (
        <button
          onClick={onAdd}
          className="h-8 px-3 text-[12px] font-medium rounded-[6px] bg-[#33479A] text-white hover:bg-[#2A3D82] transition-colors flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New
        </button>
      )}
      
      {/* Delete */}
      {canDelete && onDelete && selectedCount > 0 && (
        <button
          onClick={onDelete}
          className="h-8 px-3 text-[12px] font-medium rounded-[6px] border border-red-300 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete ({selectedCount})
        </button>
      )}
      
      {/* Separator */}
      {(onAdd || (canDelete && onDelete && selectedCount > 0)) && (
        <div className="w-px h-6 bg-[#E5E7EB] mx-1" />
      )}
      
      {/* Refresh */}
      <button
        onClick={onRefresh}
        className={cn(buttonClass, "text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F3F4F6]")}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Refresh
      </button>
      
      {/* Export */}
      {canExport && onExport && (
        <button
          onClick={onExport}
          className={cn(buttonClass, "text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F3F4F6]")}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export
        </button>
      )}
      
      {/* Download Sample CSV */}
      {canExport && onDownloadCSV && (
        <button
          onClick={onDownloadCSV}
          className={cn(buttonClass, "text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F3F4F6]")}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Sample CSV
        </button>
      )}
      
      {/* Import */}
      {canImport && onImport && (
        <button
          onClick={onImport}
          className={cn(buttonClass, "text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F3F4F6]")}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Import
        </button>
      )}
    </div>
  );
};