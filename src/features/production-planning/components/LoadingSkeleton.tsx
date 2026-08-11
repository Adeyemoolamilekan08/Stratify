// src/features/production-planning/components/LoadingSkeleton.tsx

import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] p-4 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-8 w-48 bg-gray-200 rounded"></div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-64 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Toolbar skeleton */}
      <div className="flex items-center gap-2 mb-4">
        <div className="h-10 w-32 bg-gray-200 rounded"></div>
        <div className="h-10 w-32 bg-gray-200 rounded"></div>
        <div className="h-10 w-32 bg-gray-200 rounded"></div>
        <div className="h-10 w-32 bg-gray-200 rounded"></div>
        <div className="h-10 w-20 bg-gray-200 rounded ml-auto"></div>
      </div>

      {/* Table skeletons */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-[8px] border border-[#E5E7EB] mb-4">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB]">
            <div className="h-6 w-40 bg-gray-200 rounded"></div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>
          {[1, 2, 3].map((j) => (
            <div key={j} className="flex items-center px-4 py-2.5 gap-4">
              <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-16 bg-gray-200 rounded ml-auto"></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};