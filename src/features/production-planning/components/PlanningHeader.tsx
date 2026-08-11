// src/features/production-planning/components/PlanningHeader.tsx

import React from 'react';
import { SearchInput } from '@components/ui/SearchInput/SearchInput';
import { IconButton } from '@components/ui/IconButton/IconButton';
import { AvatarIcon } from '@design-system/icons';
import { RefreshIcon, SyncIcon, HelpIcon } from '@design-system/icons';
import { format } from 'date-fns';

interface PlanningHeaderProps {
  date: Date;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onRefresh: () => void;
}

export const PlanningHeader: React.FC<PlanningHeaderProps> = ({
  date,
  searchQuery,
  onSearchChange,
  onRefresh,
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-11 px-4 bg-white border-b border-[#E2E6EB]">
      <div className="flex items-center gap-4">
        <h1 className="text-[15px] font-semibold text-[#1A1F36]">Production Planning</h1>
        <span className="text-[12px] text-[#8896AB]">
          {format(date, 'dd MMM, yyyy')}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search plans..."
          className="w-[280px]"
        />
        <IconButton icon={<RefreshIcon size={14} />} tooltip="Refresh" onClick={onRefresh} />
        <IconButton icon={<SyncIcon size={14} />} tooltip="Sync" />
        <IconButton icon={<HelpIcon size={14} />} tooltip="Help" />
        <AvatarIcon initials="JD" />
      </div>
    </header>
  );
};