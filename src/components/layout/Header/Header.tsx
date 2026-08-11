// src/components/layout/Header/Header.tsx

import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { SyncIcon } from '@design-system/icons';
import { useLocation } from 'react-router-dom';
import { useMobile } from '@context/MobileContext';
import { cn } from '@utils/cn';
import { Tooltip } from '@components/ui/Tooltip/Tooltip';

// Pages that render their own complete header (title + search + icons) and
// should not get the global header stacked on top of them.
const HIDDEN_HEADER_PAGES = ['/live-shopfloor', '/downtime-log', '/production-log', '/monthly-planning'];

// These routes render a full page-level header of their own — including
// their own search/sync/help/avatar row (DashboardHeader.tsx,
// PlanningHeader.tsx) — so the global header must be fully hidden here too,
// not just its title, or the icon row doubles up.
const PAGES_WITH_OWN_FULL_HEADER = ['/', '/home', '/dashboard'];
const hasOwnFullHeader = (pathname: string) =>
  PAGES_WITH_OWN_FULL_HEADER.includes(pathname) || pathname.includes('production-planning');

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isMobile } = useMobile();
  const location = useLocation();

  // Hide header entirely on pages that already render their own full header
  if (
    HIDDEN_HEADER_PAGES.some((page) => location.pathname.startsWith(page)) ||
    hasOwnFullHeader(location.pathname)
  ) {
    return null;
  }

  // Get page title based on route.
  // NOTE: Master Data already renders its own page title inline, so this
  // returns '' for that route to avoid a duplicate label (its search/sync/
  // help/avatar still comes from the global header, since Master Data
  // doesn't have its own — unlike Home/Dashboard/Production Planning above).
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('production-log')) return 'Production Log';
    if (path.includes('master-data')) return '';
    if (path.includes('reports/production')) return 'Production Report';
    if (path.includes('reports/downtime')) return 'Downtime Report';
    if (path.includes('reports/quality')) return 'Quality Report';
    if (path.includes('reports/performance')) return 'Performance Report';
    return '';
  };

  const pageTitle = getPageTitle();

  return (
    <header className="bg-white border-b border-[#E5E7EB] px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left: Page Title */}
        <div className="flex items-center">
          {pageTitle ? (
            <h1 className="text-[15px] font-semibold text-[#1F2937]">
              {pageTitle}
            </h1>
          ) : null}
        </div>

        {/* Right: Search + Icons */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Search Bar - Pill shaped. Hidden on very small screens to keep icons usable. */}
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search reports & insights"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[200px] sm:w-[300px] lg:w-[380px] h-10 pl-12 pr-4 bg-white border border-[#D1D5DB] rounded-full text-[14px] text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all duration-200"
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#9CA3AF]" />
          </div>

          {/* Sync Icon */}
          <Tooltip content="Sync data" side="bottom">
            <button className="p-2 rounded-full hover:bg-[#F3F4F6] transition-all duration-150">
              <SyncIcon size={18} className="text-[#6B7280]" />
            </button>
          </Tooltip>

          {/* Help Icon */}
          <Tooltip content="Help & Documentation" side="bottom">
            <button className="p-2 rounded-full hover:bg-[#F3F4F6] transition-all duration-150">
              <QuestionMarkCircleIcon className="w-[18px] h-[18px] text-[#6B7280]" />
            </button>
          </Tooltip>

          {/* Avatar - Blue circle with smiley emoji */}
          <Tooltip content="User profile" side="bottom">
            <button className="w-10 h-10 rounded-full bg-[#3450D8] flex items-center justify-center hover:brightness-95 transition-all duration-150 text-[20px]">
              😊
            </button>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};