// src/components/layout/Sidebar/SidebarFooter.tsx

import React from 'react';
import { SidebarItem } from './SidebarItem';
import { NavItem } from './navigation';
import { SIDEBAR } from './SidebarStyles';

interface SidebarFooterProps {
  item: NavItem;
  collapsed?: boolean;
  onItemClick?: () => void;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  item,
  collapsed = false,
  onItemClick,
}) => {
  return (
    <div className="flex-shrink-0">
      {/* Divider */}
      <div 
        className="mx-4 my-3 border-t"
        style={{ borderColor: SIDEBAR.DIVIDER_COLOR }}
      />
      
      <div className="px-3 pb-3">
        <SidebarItem
          item={item}
          collapsed={collapsed}
          onClick={onItemClick}
        />
      </div>
    </div>
  );
};