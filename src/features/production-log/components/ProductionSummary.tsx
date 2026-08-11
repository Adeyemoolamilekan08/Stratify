// src/features/production-log/components/ProductionSummary.tsx

import React from 'react';
import dayjs from 'dayjs';

interface ProductionSummaryProps {
  total: number;
}

export const ProductionSummary: React.FC<ProductionSummaryProps> = ({ total }) => {
  const today = dayjs().format('DD MMM, YYYY');

  return (
    <div className="flex items-center justify-end gap-3 text-[12px] text-[#6B7280] mb-4">
      <span>{total} of {total} records</span>
      <span className="text-[#D1D5DB]">|</span>
      <span className="cursor-pointer hover:text-[#1F2937]">All Machines</span>
      <span className="text-[#D1D5DB]">|</span>
      <span className="cursor-pointer hover:text-[#1F2937]">All Shifts</span>
      <span className="text-[#D1D5DB]">-</span>
      <span>{today}</span>
      <button className="text-[#6B7280] hover:text-[#1F2937] transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      </button>
    </div>
  );
};

export default ProductionSummary;