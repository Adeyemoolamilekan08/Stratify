// src/features/production-planning/components/PlanningContent.tsx

import React, { useState, useMemo } from 'react';
import { ProductionPlan } from '../types/productionPlanning';
import { DataTable } from '@components/table/DataTable';
import { LoadingSkeleton } from '@components/ui/LoadingSkeleton/LoadingSkeleton';
import { EmptyState } from '@components/ui/EmptyState/EmptyState';
import { format } from 'date-fns';

interface PlanningContentProps {
  data: ProductionPlan[];
  loading: boolean;
  searchQuery: string;
  onPlanClick: (planId: string) => void;
  onFavoriteToggle: (planId: string) => void;
  onCopyPlan: (planId: string) => void;
  onDeletePlan: (planId: string) => void;
}

export const PlanningContent: React.FC<PlanningContentProps> = ({
  data,
  loading,
  searchQuery,
  onPlanClick,
  onFavoriteToggle,
  onCopyPlan,
  onDeletePlan,
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  // Group by equipment
  const groupedData = useMemo(() => {
    if (!data) return [];
    const groups = data.reduce((acc, plan) => {
      const key = plan.equipment.id;
      if (!acc[key]) {
        acc[key] = {
          equipment: plan.equipment,
          plans: [],
        };
      }
      acc[key].plans.push(plan);
      return acc;
    }, {} as Record<string, any>);
    return Object.values(groups).sort((a, b) => a.equipment.name.localeCompare(b.equipment.name));
  }, [data]);

  if (loading && !data.length) {
    return <LoadingSkeleton />;
  }

  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <EmptyState
          title="No production plans found"
          description="Create a new production plan to get started"
          actionLabel="Create New Plan"
          onAction={() => {}}
        />
      </div>
    );
  }

  return (
    <div className="overflow-auto h-[calc(100vh-80px)] p-5">
      <div className="space-y-2">
        {groupedData.map((group) => (
          <EquipmentGroup
            key={group.equipment.id}
            equipment={group.equipment}
            plans={group.plans}
            isExpanded={expandedGroups.has(group.equipment.id)}
            onToggle={() => {
              setExpandedGroups(prev => {
                const newSet = new Set(prev);
                if (newSet.has(group.equipment.id)) {
                  newSet.delete(group.equipment.id);
                } else {
                  newSet.add(group.equipment.id);
                }
                return newSet;
              });
            }}
            onPlanClick={onPlanClick}
            onFavoriteToggle={onFavoriteToggle}
            onCopyPlan={onCopyPlan}
            onDeletePlan={onDeletePlan}
          />
        ))}
      </div>
    </div>
  );
};

// EquipmentGroup sub-component
interface EquipmentGroupProps {
  equipment: any;
  plans: ProductionPlan[];
  isExpanded: boolean;
  onToggle: () => void;
  onPlanClick: (planId: string) => void;
  onFavoriteToggle: (planId: string) => void;
  onCopyPlan: (planId: string) => void;
  onDeletePlan: (planId: string) => void;
}

const EquipmentGroup: React.FC<EquipmentGroupProps> = ({
  equipment,
  plans,
  isExpanded,
  onToggle,
  onPlanClick,
  onFavoriteToggle,
  onCopyPlan,
  onDeletePlan,
}) => {
  const columns = [
    {
      accessorKey: 'planNumber',
      header: 'Plan',
      cell: ({ row }: any) => (
        <span
          className="text-[11px] font-medium cursor-pointer hover:underline text-[#2B6CB0]"
          onClick={() => onPlanClick(row.original.id)}
        >
          {row.original.planNumber}
        </span>
      ),
      size: 120,
    },
    {
      accessorKey: 'part.name',
      header: 'Part',
      cell: ({ row }: any) => (
        <span className="text-[11px] text-[#1A1F36] truncate max-w-[180px] block">
          {row.original.part.name}
        </span>
      ),
      size: 180,
    },
    {
      accessorKey: 'color.name',
      header: 'Color',
      cell: ({ row }: any) => (
        <span className="text-[11px] text-[#8896AB]">{row.original.color?.name || 'NA'}</span>
      ),
      size: 80,
    },
    {
      accessorKey: 'equipment.name',
      header: 'Equipment',
      cell: ({ row }: any) => (
        <span className="text-[11px] text-[#1A1F36] truncate max-w-[140px] block">
          {row.original.equipment.name}
        </span>
      ),
      size: 140,
    },
    {
      accessorKey: 'plannedQuantity',
      header: 'Planned qty',
      cell: ({ row }: any) => (
        <span className="text-[11px] font-medium text-[#1A1F36] text-right block">
          {row.original.plannedQuantity.toLocaleString()}
        </span>
      ),
      size: 100,
    },
    {
      accessorKey: 'startDate',
      header: 'Start at',
      cell: ({ row }: any) => (
        <span className="text-[11px] text-[#8896AB]">
          {format(new Date(row.original.startDate), 'MMM d, HH:mm')}
        </span>
      ),
      size: 120,
    },
    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }: any) => (
        <div className="flex items-center justify-center gap-0.5">
          <button
            onClick={(e) => { e.stopPropagation(); onFavoriteToggle(row.original.id); }}
            className="p-0.5 text-[#A0AEC0] hover:text-[#D69E2E] transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill={row.original.isFavorite ? '#D69E2E' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onCopyPlan(row.original.id); }}
            className="p-0.5 text-[#A0AEC0] hover:text-[#4A5568] hover:bg-[#EDF2F7] rounded transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDeletePlan(row.original.id); }}
            className="p-0.5 text-[#A0AEC0] hover:text-[#E53E3E] hover:bg-[#FFF5F5] rounded transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ),
      size: 100,
    },
  ];

  return (
    <div className="bg-white border border-[#EDF2F7]">
      {/* Machine Header */}
      <div
        className="flex items-center justify-between px-3 cursor-pointer hover:bg-[#F7F8FA] transition-colors"
        style={{ height: '34px', borderBottom: '1px solid #EDF2F7' }}
        onClick={onToggle}
      >
        <span className="text-[13px] font-medium text-[#1A1F36]">
          {equipment.name}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#8896AB]">{plans.length} plans</span>
          <svg
            className={`w-4 h-4 text-[#8896AB] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Table */}
      {isExpanded && (
        <DataTable
          data={plans}
          columns={columns}
          rowHeight={34}
        />
      )}
    </div>
  );
};