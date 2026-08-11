// src/features/production-log/components/renderers/ScrapCellRenderer.tsx

import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { AppTooltip } from '@design-system/components/AppTooltip/AppTooltip';
import { colors } from '@design-system/tokens/colors';

export const ScrapCellRenderer: React.FC<ICellRendererParams> = (params) => {
  const value = params.value;

  return (
    <AppTooltip content="View scrap details" side="top">
      <div className="flex items-center justify-end gap-1 cursor-pointer hover:opacity-70 transition-opacity">
        <span style={{ color: colors.status.scrap }}>
          {value.toFixed(2)}
        </span>
        <svg className="w-3.5 h-3.5" style={{ color: colors.status.scrap }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
    </AppTooltip>
  );
};