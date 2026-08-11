// src/components/layout/DashboardLayout.tsx

import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar/Sidebar';
import { Header } from './Header/Header';
import { useMobile } from '@context/MobileContext';
import { BottomNavigation } from './BottomNavigation';

const SIDEBAR_WIDTH_OPEN = 280;
const SIDEBAR_WIDTH_COLLAPSED = 85;

export const DashboardLayout = () => {
  const { sidebarOpen, isMobile, isTablet } = useMobile();
  const isCompact = isMobile || isTablet;
  const sidebarWidth = isCompact ? 0 : sidebarOpen ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_COLLAPSED;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      <Sidebar />

      <div
        className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden transition-[margin-left,width] duration-300 ease-in-out"
        style={{
          marginLeft: isCompact ? 0 : sidebarWidth,
          width: isCompact ? '100%' : `calc(100% - ${sidebarWidth}px)`,
        }}
      >
        <Header />
        {/* This is the single page-level vertical scroll container. */}
        <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto bg-white pb-[58px] lg:pb-0">
          <Outlet />
        </main>
      </div>
      <BottomNavigation />
    </div>
  );
};
