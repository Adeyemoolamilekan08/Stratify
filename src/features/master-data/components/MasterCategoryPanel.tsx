// src/features/master-data/components/MasterCategoryPanel.tsx

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@utils/cn';

interface CategoryItem {
  id: string;
  label: string;
  path: string;
}

interface CategoryGroup {
  id: string;
  title: string;
  items: CategoryItem[];
}

const categoryGroups: CategoryGroup[] = [
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
      { id: 'machines', label: 'Machine', path: '/master-data/assets/machines' },
      { id: 'molds', label: 'Mold', path: '/master-data/assets/molds' },
      { id: 'colors', label: 'Colors', path: '/master-data/assets/colors' },
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

export const MasterCategoryPanel = () => {
  const location = useLocation();

  return (
    <div className="pt-6 px-5 pr-3 pb-4">
      <h1 className="text-[15px] font-semibold text-[#1F2937] mb-6">Master Data</h1>
      
      <nav className="space-y-8">
        {categoryGroups.map((group) => (
          <div key={group.id}>
            {/* Group Title */}
            <div className="px-3 py-1 mb-1">
              <span className="text-[10px] font-medium text-[#6B7280] uppercase tracking-[0.08em]">
                {group.title}
              </span>
            </div>

            {/* Group Items */}
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
  );
};