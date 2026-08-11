// src/features/master-data/components/MasterBreadcrumb.tsx

import React from 'react';

interface MasterBreadcrumbProps {
  items: string[];
}

export const MasterBreadcrumb: React.FC<MasterBreadcrumbProps> = ({ items }) => {
  return (
    <div className="flex items-center gap-2 text-[11px] text-[#6B7280] mb-4">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-[#D1D5DB]">/</span>}
          {index === items.length - 1 ? (
            <span className="font-medium text-[#1F2937]">{item}</span>
          ) : (
            <span>{item}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};