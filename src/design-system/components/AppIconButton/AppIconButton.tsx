// src/design-system/components/AppIconButton/AppIconButton.tsx

import React from 'react';
import { AppTooltip } from '../AppTooltip/AppTooltip';

interface AppIconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  tooltip?: string;
  className?: string;
}

export const AppIconButton: React.FC<AppIconButtonProps> = ({
  icon,
  onClick,
  tooltip,
  className = '',
}) => {
  const button = (
    <button
      onClick={onClick}
      className={`p-1 text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F3F4F6] rounded-full transition-all duration-150 ${className}`}
    >
      {icon}
    </button>
  );

  if (tooltip) {
    return <AppTooltip content={tooltip}>{button}</AppTooltip>;
  }

  return button;
};