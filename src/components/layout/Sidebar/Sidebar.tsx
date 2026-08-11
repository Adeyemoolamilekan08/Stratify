// src/components/layout/Sidebar/Sidebar.tsx

import React, { useState, useRef } from 'react';
import { useMobile } from '@context/MobileContext';
import { cn } from '@utils/cn';
import { SidebarHeader } from './SidebarHeader';
import { SidebarSection } from './SidebarSection';
import { SidebarFooter } from './SidebarFooter';
import { SidebarItem } from './SidebarItem';
import { Tooltip } from '@components/ui/Tooltip/Tooltip';
import { navigationStructure } from './navigation';
import { SIDEBAR } from './SidebarStyles';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export const Sidebar = () => {
  const { sidebarOpen, toggleSidebar, closeSidebar, isMobile, isTablet, isDesktop } = useMobile();
  const isCompact = isMobile || isTablet;
  const [tooltipInfo, setTooltipInfo] = useState<{ show: boolean; label: string; x: number; y: number }>({
    show: false,
    label: '',
    x: 0,
    y: 0,
  });
  const sidebarRef = useRef<HTMLDivElement>(null);

  const isCollapsed = isDesktop && !sidebarOpen;

  // Handle tooltip from child components
  const handleTooltip = (show: boolean, label: string, x: number, y: number) => {
    setTooltipInfo({ show, label, x, y });
  };

  return (
    <>
      {/* Mobile Hamburger */}
      {isCompact && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg hover:bg-[#2A2A2A] transition-colors"
          aria-label="Toggle sidebar"
        >
          {!sidebarOpen ? (
            <Bars3Icon className="w-6 h-6 text-white" />
          ) : (
            <XMarkIcon className="w-6 h-6 text-white" />
          )}
        </button>
      )}

      {/* Mobile Overlay */}
      {isCompact && sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40" onClick={closeSidebar} />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={cn(
          "fixed top-0 left-0 z-40 h-screen bg-[#0F2342] transition-all duration-300 ease-in-out flex flex-col",
          isDesktop && sidebarOpen ? "w-[280px]" : "",
          isDesktop && !sidebarOpen ? "w-[85px]" : "",
          isCompact && sidebarOpen ? "w-[280px] translate-x-0" : "",
          isCompact && !sidebarOpen ? "-translate-x-full" : "translate-x-0",
        )}
      >
        {/* Logo - Fixed at top */}
        <SidebarHeader collapsed={isCollapsed} />

        {/* Navigation - Scrollable middle section */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">  {/* More padding */}
          {/* Main Navigation Items */}
          <div className="space-y-1.5">  {/* More gap */}
            {navigationStructure.main.map((item) => (
              isCollapsed ? (
                <Tooltip key={item.id} content={item.label} side="right">
                  <div>
                    <SidebarItem
                      item={item}
                      collapsed={isCollapsed}
                      onClick={() => isCompact && closeSidebar()}
                    />
                  </div>
                </Tooltip>
              ) : (
                <SidebarItem
                  key={item.id}
                  item={item}
                  collapsed={isCollapsed}
                  onClick={() => isCompact && closeSidebar()}
                />
              )
            ))}
          </div>

          {/* Sections (DASHBOARDS, REPORTS) */}
          {navigationStructure.sections.map((section, index) => (
            <React.Fragment key={section.id}>
              <SidebarSection
                section={section}
                collapsed={isCollapsed}
                onItemClick={() => isCompact && closeSidebar()}
              />
              {/* More gap between sections */}
              {index < navigationStructure.sections.length - 1 && (
                <div className="h-3" />
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Footer - Fixed at bottom with divider */}
        <SidebarFooter
          item={navigationStructure.footer}
          collapsed={isCollapsed}
          onItemClick={() => isCompact && closeSidebar()}
        />
      </aside>
    </>
  );
};