// src/features/production-log/components/ProductionSkeleton.tsx

import React from 'react';

export const ProductionSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-7 w-24 bg-gray-200 rounded"></div>
      <div className="flex items-center gap-4">
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
        <div className="h-4 w-px bg-gray-200"></div>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-3">
          <div className="h-6 w-40 bg-gray-200 rounded"></div>
          <div className="h-10 w-72 bg-gray-200 rounded"></div>
          <div className="h-[300px] bg-gray-100 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductionSkeleton;