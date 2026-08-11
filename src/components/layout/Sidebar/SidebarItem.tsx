// src/components/layout/Sidebar/SidebarItem.tsx

import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@utils/cn';
import { SIDEBAR } from './SidebarStyles';
import { NavItem } from './navigation';

interface SidebarItemProps {
  item: NavItem;
  collapsed?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  collapsed = false,
  isActive: propIsActive,
  onClick,
}) => {
  const Icon = item.icon;
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const itemRef = useRef<HTMLAnchorElement>(null);

  if (!item.path) return null;

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHovering(true);
    if (collapsed) {
      setShowTooltip(true);
      updateTooltipPosition(e);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowTooltip(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (collapsed && showTooltip) {
      updateTooltipPosition(e);
    }
  };

  const updateTooltipPosition = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltipPosition({
      x: e.clientX - rect.left + 15,
      y: e.clientY - rect.top - 10,
    });
  };

  return (
    <NavLink
      ref={itemRef}
      to={item.path}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={({ isActive }) => {
        const active = isActive || propIsActive;
        return `
          group relative flex items-center gap-3
          transition-all duration-150 cursor-pointer
          ${active
            ? 'bg-[#F97316] text-white'
            : 'text-[#A0A0A0] hover:bg-[#2A2A2A] hover:text-white'
          }
          ${collapsed ? 'justify-center' : ''}
        `;
      }}
      style={{
        height: SIDEBAR.ITEM_HEIGHT,
        width: collapsed ? SIDEBAR.COLLAPSED_WIDTH : '100%',
        paddingLeft: collapsed ? 0 : SIDEBAR.ITEM_PADDING_X,
        paddingRight: collapsed ? 0 : SIDEBAR.ITEM_PADDING_X,
        paddingTop: SIDEBAR.ITEM_PADDING_Y,
        paddingBottom: SIDEBAR.ITEM_PADDING_Y,
        borderRadius: SIDEBAR.ITEM_RADIUS, // Right side only
      }}
    >
      {({ isActive }) => {
        const active = isActive || propIsActive;
        return (
          <>
            {Icon && (
              <Icon 
                className={cn(
                  "flex-shrink-0 transition-colors duration-150",
                  active 
                    ? 'text-white' 
                    : 'text-[#A0A0A0] group-hover:text-white'
                )}
                style={{ 
                  width: SIDEBAR.ICON_SIZE, 
                  height: SIDEBAR.ICON_SIZE,
                  strokeWidth: 1.5,
                }}
              />
            )}
            
            {!collapsed && (
              <span 
                className="font-medium"
                style={{ 
                  fontSize: SIDEBAR.FONT_SIZE,
                  fontWeight: SIDEBAR.FONT_WEIGHT,
                }}
              >
                {item.label}
              </span>
            )}
            
            {/* Active indicator shadow with right-side radius */}
            {active && (
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{ 
                  borderRadius: SIDEBAR.ITEM_RADIUS_ACTIVE,
                  boxShadow: SIDEBAR.ACTIVE_SHADOW,
                }}
              />
            )}
          </>
        );
      }}
    </NavLink>
  );
};

// Separate tooltip component that renders outside the navlink
export const SidebarTooltip: React.FC<{
  label: string;
  show: boolean;
  position: { x: number; y: number };
  parentRef: React.RefObject<HTMLElement>;
}> = ({ label, show, position, parentRef }) => {
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (show && parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      setTooltipStyle({
        position: 'fixed',
        left: rect.right + 10,
        top: rect.top + rect.height / 2 - 12,
        backgroundColor: SIDEBAR.TOOLTIP_BG,
        borderColor: SIDEBAR.TOOLTIP_BORDER,
        color: SIDEBAR.TOOLTIP_TEXT,
        fontSize: SIDEBAR.TOOLTIP_FONT_SIZE,
        fontWeight: 500,
        padding: SIDEBAR.TOOLTIP_PADDING,
        borderRadius: SIDEBAR.TOOLTIP_RADIUS,
        border: '1px solid #2A2A2A',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        zIndex: 9999,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      });
    }
  }, [show, parentRef]);

  if (!show) return null;

  return (
    <div style={tooltipStyle}>
      {label}
      <div 
        style={{
          position: 'absolute',
          left: -6,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 0,
          height: 0,
          borderTop: '6px solid transparent',
          borderBottom: '6px solid transparent',
          borderRight: '6px solid #1F1F1F',
        }}
      />
    </div>
  );
};