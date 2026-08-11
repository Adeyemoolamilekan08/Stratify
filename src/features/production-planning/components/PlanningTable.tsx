// src/features/production-planning/components/PlanningTable.tsx

import React, { useMemo } from 'react';
import { ProductionPlan } from '../types/productionPlanning';
import { format } from 'date-fns';
import { IconButton } from '@components/ui/IconButton/IconButton';

interface PlanningTableProps {
  plans: ProductionPlan[];
  onPlanClick: (planId: string) => void;
  onFavoriteToggle: (planId: string) => void;
  onCopyPlan: (planId: string) => void;
  onDeletePlan: (planId: string) => void;
}

export const PlanningTable: React.FC<PlanningTableProps> = ({
  plans,
  onPlanClick,
  onFavoriteToggle,
  onCopyPlan,
  onDeletePlan,
}) => {
  const groupedPlans = useMemo(() => {
    return plans.reduce<Record<string, ProductionPlan[]>>((acc, plan) => {
      const key = plan.equipment.name;
      if (!acc[key]) acc[key] = [];
      acc[key].push(plan);
      return acc;
    }, {});
  }, [plans]);

  return (
    <div className="space-y-8">
      {Object.entries(groupedPlans).map(([equipmentName, equipmentPlans]) => (
        <div key={equipmentName} className="space-y-4">
          <div className="text-[14px] font-semibold text-[#1D4ED8]">{equipmentName}</div>
          <div className="overflow-x-auto rounded-[10px] border border-[#E5E7EB] bg-white shadow-sm">
            <table className="w-full border-collapse text-[12px]">
              <thead className="bg-[#F7F8FA] border-b border-[#E5E7EB]">
                <tr>
                  <th className="px-3 py-3 text-left text-[10px] font-semibold text-[#7C8798] uppercase tracking-[0.04em]">Plan</th>
                  <th className="px-3 py-3 text-left text-[10px] font-semibold text-[#7C8798] uppercase tracking-[0.04em]">Part</th>
                  <th className="px-3 py-3 text-left text-[10px] font-semibold text-[#7C8798] uppercase tracking-[0.04em]">Color</th>
                  <th className="px-3 py-3 text-left text-[10px] font-semibold text-[#7C8798] uppercase tracking-[0.04em]">Equipment</th>
                  <th className="px-3 py-3 text-right text-[10px] font-semibold text-[#7C8798] uppercase tracking-[0.04em]">Planned qty</th>
                  <th className="px-3 py-3 text-left text-[10px] font-semibold text-[#7C8798] uppercase tracking-[0.04em]">Start at</th>
                  <th className="px-3 py-3 text-center text-[10px] font-semibold text-[#7C8798] uppercase tracking-[0.04em]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F1F3]">
                {equipmentPlans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-[#F7F8FA] transition-colors">
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#16A34A]" />
                        <button
                          type="button"
                          onClick={() => onPlanClick(plan.id)}
                          className="text-[12px] font-semibold text-[#2B6CB0] hover:underline"
                        >
                          {plan.planNumber}
                        </button>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-[12px] text-[#1A1F36]">{plan.part.name}</td>
                    <td className="px-3 py-3 text-[12px] text-[#8896AB]">{plan.color?.name || 'NA'}</td>
                    <td className="px-3 py-3 text-[12px] text-[#1A1F36]">{plan.equipment.name}</td>
                    <td className="px-3 py-3 text-right text-[12px] font-semibold text-[#1A1F36]">{plan.plannedQuantity.toLocaleString()}</td>
                    <td className="px-3 py-3 text-[12px] text-[#8896AB]">{format(new Date(plan.startDate), 'MMM d, HH:mm')}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <IconButton
                          icon={
                            plan.isFavorite ? (
                              <svg className="w-4 h-4 text-[#D69E2E]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                              </svg>
                            )
                          }
                          onClick={() => onFavoriteToggle(plan.id)}
                          tooltip={plan.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        />
                        <IconButton
                          icon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          }
                          onClick={() => onCopyPlan(plan.id)}
                          tooltip="Copy plan"
                        />
                        <IconButton
                          icon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          }
                          onClick={() => onDeletePlan(plan.id)}
                          tooltip="Delete plan"
                          className="hover:text-[#E53E3E] hover:bg-[#FFF5F5]"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};