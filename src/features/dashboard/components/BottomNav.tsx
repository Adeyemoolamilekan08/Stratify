// src/features/shift-summary/components/BottomNav.tsx

import React from 'react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

export const BottomNav: React.FC = () => {
  const items: NavItem[] = [
    { label: 'Home', active: true },
    { label: 'Insights', active: false },
    { label: 'Account', active: false },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E2E8F0]">
      <div className="flex items-center justify-around max-w-7xl mx-auto px-4 py-2">
        {items.map((item) => (
          <button
            key={item.label}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
              item.active ? 'text-[#1E3A8A]' : 'text-[#64748B]'
            }`}
          >
            {/* Icon placeholder - replace with actual icons */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};