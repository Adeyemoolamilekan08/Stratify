// src/components/ui/IconButton/IconButton.tsx

import React from 'react';
import { Tooltip } from '../Tooltip/Tooltip';
import { cn } from '@utils/cn';

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  tooltip?: string;
  className?: string;
  disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  tooltip,
  className = '',
  disabled = false,
}) => {
  const button = (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'p-0.5 text-[#8896AB] hover:text-[#4A5568] hover:bg-[#EDF2F7] rounded transition-colors disabled:opacity-40 disabled:pointer-events-none',
        className
      )}
    >
      {icon}
    </button>
  );

  if (tooltip) {
    return <Tooltip content={tooltip}>{button}</Tooltip>;
  }

  return button;
};