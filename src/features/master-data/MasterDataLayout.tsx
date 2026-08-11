// src/features/master-data/MasterDataLayout.tsx

import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useMobile } from '@context/MobileContext';
import { cn } from '@utils/cn';

const categoryGroups = [
  {
    id: 'reasons',
    title: 'REASON',
    items: [
      { id: 'downtime', label: 'Downtime reasons', path: '/master-data/reasons/downtime' },
      { id: 'rejection', label: 'Rejection reasons', path: '/master-data/reasons/rejection' },
      { id: 'rework', label: 'Rework reasons', path: '/master-data/reasons/rework' },
      { id: 'scrap', label: 'Scrap reasons', path: '/master-data/reasons/scrap' },
    ],
  },
  {
    id: 'assets',
    title: 'ASSET',
    items: [
      { id: 'colors', label: 'Colors', path: '/master-data/assets/colors' },
      { id: 'machines', label: 'Machine', path: '/master-data/assets/machines' },
      { id: 'molds', label: 'Mold', path: '/master-data/assets/molds' },
      { id: 'parts', label: 'Part', path: '/master-data/assets/parts' },
      { id: 'part-matrix', label: 'Part Matrix', path: '/master-data/assets/part-matrix' },
    ],
  },
  {
    id: 'people',
    title: 'PEOPLE',
    items: [
      { id: 'operators', label: 'Operator', path: '/master-data/people/operators' },
    ],
  },
];

const MasterDataLayout = () => {
  const { isMobile } = useMobile();

  return (
    <div className="flex h-full bg-[#F8F9FC]">
      {/* Category Panel */}
      <div className={cn(
        "flex-shrink-0 border-r border-[#E5E7EB] bg-white overflow-y-auto",
        isMobile ? "w-[240px]" : "w-[260px]"
      )}>
        <div className="pt-6 px-5 pr-3 pb-4">
          <h1 className="text-[15px] font-semibold text-[#1F2937] mb-6">Master Data</h1>
          
          <nav className="space-y-8">
            {categoryGroups.map((group) => (
              <div key={group.id}>
                <div className="px-3 py-1 mb-1">
                  <span className="text-[10px] font-medium text-[#6B7280] uppercase tracking-[0.08em]">
                    {group.title}
                  </span>
                </div>
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      className={({ isActive }) => `
                        block w-full text-left px-4 py-2.5 rounded-full transition-all duration-150
                        text-[13px] font-medium
                        ${isActive
                          ? 'bg-[#E9EBF8] text-[#33479A]'
                          : 'text-[#1F2937] hover:bg-[#F6F7FA]'
                        }
                      `}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className={cn(
        "flex-1 overflow-y-auto",
        isMobile ? "p-3" : "p-4"
      )}>
        <Outlet />
      </div>
    </div>
  );
};

// ✅ IMPORTANT: Use default export for lazy loading
export default MasterDataLayout;