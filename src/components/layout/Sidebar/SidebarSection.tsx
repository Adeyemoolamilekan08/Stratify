// src/components/layout/Sidebar/SidebarSection.tsx

import React from 'react';
import { SidebarItem } from './SidebarItem';
import { NavSection } from './navigation';
import { SIDEBAR } from './SidebarStyles';

interface SidebarSectionProps {
  section: NavSection;
  collapsed?: boolean;
  onItemClick?: () => void;
}

export const SidebarSection: React.FC<SidebarSectionProps> = ({
  section,
  collapsed = false,
  onItemClick,
}) => {
  return (
    <div className="mt-4">  {/* More spacing between sections */}
      {/* Section Title */}
      {!collapsed && (
        <div 
          className="px-4 py-2"
          style={{ 
            paddingTop: SIDEBAR.SECTION_PADDING_TOP,
            paddingBottom: SIDEBAR.SECTION_PADDING_BOTTOM,
          }}
        >
          <span 
            className="font-bold uppercase tracking-wider"
            style={{
              fontSize: SIDEBAR.SECTION_TITLE_SIZE,
              color: SIDEBAR.SECTION_TITLE_COLOR,
              letterSpacing: '0.1em',
              fontWeight: SIDEBAR.SECTION_FONT_WEIGHT,
            }}
          >
            {section.title}
          </span>
        </div>
      )}
      {collapsed && <div className="h-4" />}  {/* More height when collapsed */}
      
      {/* Section Items */}
      <div className="space-y-1.5">  {/* More gap between items */}
        {section.items.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            collapsed={collapsed}
            onClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
};