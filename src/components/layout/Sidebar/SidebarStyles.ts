// src/components/layout/Sidebar/SidebarStyles.ts

export const SIDEBAR = {
  // Dimensions - WIDER
  WIDTH: 280,
  COLLAPSED_WIDTH: 85,
  LOGO_HEIGHT: 64,
  ITEM_HEIGHT: 38,
  
  // Typography - MORE WEIGHT
  FONT_SIZE: 11,
  SECTION_TITLE_SIZE: 9,
  LOGO_FONT_SIZE: 14,
  ICON_SIZE: 16,
  FONT_WEIGHT: 500,
  SECTION_FONT_WEIGHT: 700,
  
  // Spacing - MORE HEIGHT
  ITEM_PADDING_X: 12,
  ITEM_PADDING_Y: 7,
  SECTION_PADDING_TOP: 8,
  SECTION_PADDING_BOTTOM: 5,
  GAP_BETWEEN_ITEMS: 2,
  LOGO_PADDING_X: 12,
  SECTION_GAP: 7,
  
  // Radius - RIGHT SIDE ONLY
  ITEM_RADIUS: '0 20px 20px 0',  // Right side curved, left flat
  ITEM_RADIUS_ACTIVE: '0 20px 20px 0', // Active state same
  
  // Colors
  BACKGROUND: '#0F2342',
  BACKGROUND_HOVER: '#17355F',
  ACTIVE_BG: '#F97316',
  ACTIVE_SHADOW: '0 4px 20px rgba(249, 115, 22, 0.4)',
  TEXT_COLOR: '#A0A0A0',
  TEXT_ACTIVE: '#FFFFFF',
  TEXT_HOVER: '#FFFFFF',
  SECTION_TITLE_COLOR: '#6B7280',
  DIVIDER_COLOR: '#2A2A2A',
  LOGO_BG: '#F97316',
  LOGO_TEXT: '#FFFFFF',
  
  // Tooltip - FIXED
  TOOLTIP_BG: '#1F1F1F',
  TOOLTIP_BORDER: '#2A2A2A',
  TOOLTIP_TEXT: '#FFFFFF',
  TOOLTIP_FONT_SIZE: 13,
  TOOLTIP_PADDING: '6px 14px',
  TOOLTIP_RADIUS: 8,
  TOOLTIP_OFFSET: 12,            // Distance from cursor
  
  // Transitions
  TRANSITION_DURATION: '150ms',
  TRANSITION_EASING: 'ease-in-out',
};

export type SidebarStyles = typeof SIDEBAR;