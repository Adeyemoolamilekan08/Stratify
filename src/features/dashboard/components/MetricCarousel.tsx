// src/features/dashboard/components/MetricCarousel.tsx

import React, { useState } from 'react';

interface Metric {
  key: string;
  label: string;
  value: number;
  trend: number;
}

interface MetricCarouselProps {
  metrics: Metric[];
}

export const MetricCarousel: React.FC<MetricCarouselProps> = ({ metrics }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!metrics || metrics.length === 0) {
    return (
      <div className="flex items-center justify-center w-full py-8 text-[#64748B]">
        No metrics available
      </div>
    );
  }

  const safeIndex = Math.min(currentIndex, metrics.length - 1);
  const current = metrics[safeIndex];

  if (!current) {
    return (
      <div className="flex items-center justify-center w-full py-8 text-[#64748B]">
        No metrics available
      </div>
    );
  }

  const isPositive = current.trend >= 0;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + metrics.length) % metrics.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % metrics.length);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center justify-between w-full max-w-md">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="p-2 text-[#94A3B8] hover:text-[#1E293B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 rounded"
          aria-label="Previous metric"
        >
          <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Center Content */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[30px] font-bold text-[#1E3A8A]">
              {current.value.toFixed(2)}%
            </span>
            <span className={`text-[14px] font-medium ${isPositive ? 'text-[#059669]' : 'text-[#EF4444]'}`}>
              {isPositive ? '▲' : '▼'} {Math.abs(current.trend).toFixed(2)}%
            </span>
          </div>
          <div className="mt-1">
            <span className="text-[16px] font-bold text-[#1E3A8A] border-b-2 border-[#1E3A8A] pb-0.5">
              {current.label}
            </span>
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="p-2 text-[#94A3B8] hover:text-[#1E293B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 rounded"
          aria-label="Next metric"
        >
          <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex items-center gap-1.5 mt-2">
        {metrics.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-[#2C3E9E]' : 'bg-[#D1D5DB]'}`}
          />
        ))}
      </div>
    </div>
  );
};