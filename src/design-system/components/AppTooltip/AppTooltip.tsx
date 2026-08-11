// src/design-system/components/AppTooltip/AppTooltip.tsx

import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

interface AppTooltipProps {
  children: React.ReactNode;
  content: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
}

export const AppTooltip: React.FC<AppTooltipProps> = ({
  children,
  content,
  side = 'top',
  delay = 300,
}) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={delay}>
        <TooltipPrimitive.Trigger asChild>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            className="px-2 py-1 bg-[#1F2937] text-white text-[10px] rounded-[4px] shadow-lg z-50"
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-[#1F2937]" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};