// src/features/production-planning/components/PlanningRow.tsx

import React from 'react';
import { ProductionPlan } from '../types/productionPlanning';
import { StatusBadge } from './StatusBadge';
import { FavoriteButton } from './FavoriteButton';
import { CopyButton } from './CopyButton';
import { formatDate } from '../utils/date';

interface PlanningRowProps {
  plan: ProductionPlan;
  onPlanClick: (planId: string) => void;
  onFavoriteToggle: (planId: string) => void;
  onCopyPlan: (planId: string) => void;
  onEditPlan: (planId: string) => void;
  onDeletePlan: (planId: string) => void;
}

export const PlanningRow: React.FC<PlanningRowProps> = ({
  plan,
  onPlanClick,
  onFavoriteToggle,
  onCopyPlan,
  onEditPlan,
  onDeletePlan,
}) => {
  return (
    <div className="flex items-center px-4 py-2.5 hover:bg-[#F8FAFC] transition-colors group">
      {/* Status Dot */}
      <StatusBadge status={plan.status} />

      {/* Plan Number - Clickable */}
      <span
        className="w-[120px] text-[#2F6BFF] font-medium cursor-pointer hover:underline"
        onClick={() => onPlanClick(plan.id)}
      >
        {plan.planNumber}
      </span>

      {/* Part */}
      <span className="w-[200px] text-[#1F2937] truncate">
        {plan.part.name}
      </span>

      {/* Color */}
      <span className="w-[80px] text-[#6B7280]">
        {plan.color?.name || 'NA'}
      </span>

      {/* Equipment */}
      <span className="w-[150px] text-[#6B7280] truncate">
        {plan.equipment.name}
      </span>

      {/* Planned Quantity */}
      <span className="w-[100px] text-right font-medium text-[#1F2937]">
        {plan.plannedQuantity.toLocaleString()}
      </span>

      {/* Start At */}
      <span className="w-[130px] text-[#6B7280]">
        {formatDate(plan.startDate)}
      </span>

      {/* Actions */}
      <div className="flex items-center gap-1 ml-auto">
        <FavoriteButton
          isFavorite={plan.isFavorite}
          onClick={() => onFavoriteToggle(plan.id)}
        />
        <CopyButton onClick={() => onCopyPlan(plan.id)} />
        <button
          onClick={() => onEditPlan(plan.id)}
          className="p-1 text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F3F4F6] rounded transition-colors"
          title="Edit plan"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={() => onDeletePlan(plan.id)}
          className="p-1 text-[#6B7280] hover:text-[#EF5350] hover:bg-[#FEE2E2] rounded transition-colors"
          title="Delete plan"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};