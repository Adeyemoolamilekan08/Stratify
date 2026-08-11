import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="p-5 space-y-3 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="h-6 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-7 w-64 bg-gray-200 rounded"></div>
          <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* Toolbar skeleton */}
      <div className="flex items-center gap-2 h-9 px-4 bg-white border-b border-[#E2E6EB]">
        <div className="h-5 w-24 bg-gray-200 rounded"></div>
        <div className="w-px h-4 bg-gray-200"></div>
        <div className="h-5 w-32 bg-gray-200 rounded"></div>
        <div className="h-5 w-24 bg-gray-200 rounded"></div>
        <div className="w-px h-4 bg-gray-200"></div>
        <div className="h-5 w-20 bg-gray-200 rounded ml-auto"></div>
      </div>

      {/* Machine groups skeleton */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white border border-[#EDF2F7]">
          <div className="flex items-center justify-between px-3 py-2 border-b border-[#EDF2F7]">
            <div className="h-5 w-40 bg-gray-200 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
          {[1, 2, 3].map((j) => (
            <div key={j} className="flex items-center px-3 py-1.5 border-b border-[#EDF2F7] gap-4">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-40 bg-gray-200 rounded"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-4 w-20 bg-gray-200 rounded ml-auto"></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
