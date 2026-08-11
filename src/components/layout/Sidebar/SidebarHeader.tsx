// src/components/layout/Sidebar/SidebarHeader.tsx

import React from 'react';
import { cn } from '@utils/cn';
import { SIDEBAR } from './SidebarStyles';

interface SidebarHeaderProps {
  collapsed?: boolean;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed = false }) => {
  return (
    <div 
      className={cn(
        "flex items-center border-b border-[#2A2A2A] flex-shrink-0",
        collapsed ? "justify-center px-3" : "px-4"
      )}
      style={{ height: SIDEBAR.LOGO_HEIGHT }}
    >
      <div className={cn(
        "flex items-center gap-2.5",
        collapsed ? "justify-center" : ""
      )}>
        {/* Logo Icon */}
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: SIDEBAR.ACTIVE_BG }}
        >
          <span className="text-white font-bold text-sm">ST</span>
        </div>
        
        {!collapsed && (
          <span 
            className="font-semibold text-white tracking-wide"
            style={{ fontSize: SIDEBAR.LOGO_FONT_SIZE }}
          >
            STRATIFY
          </span>
        )}
      </div>
    </div>
  );
};