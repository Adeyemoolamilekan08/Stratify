// src/shared/components/IconButton.tsx

import { ReactNode } from 'react';

interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  tooltip?: string;
}

export const IconButton = ({ children, onClick, tooltip }: IconButtonProps) => (
  <button
    onClick={onClick}
    className="p-1.5 hover:bg-[#F5F6FA] rounded transition-all duration-150 text-[#666666] hover:text-[#222222]"
    title={tooltip}
  >
    {children}
  </button>
);