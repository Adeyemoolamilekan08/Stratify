import { useState, useEffect, useCallback } from 'react';
import { ProductionPlan } from '../types/productionPlanning';

interface UseProductionPlansParams {
  machine?: string;
  shift?: string;
  status?: string;
  date?: Date;
  listView?: 'Day' | 'Week' | 'Month';
  search?: string;
}

const mockPlans: ProductionPlan[] = [
  {
    id: '1',
    planNumber: '100-7248',
    part: { id: 'p1', name: '15ML MEASURING CUP', code: '100-7248' },
    color: { id: 'c1', name: 'NA', code: 'NA' },
    equipment: { id: 'HT-28-HT-270', name: 'HT-28-HT-270', code: 'HT-28-HT-270', department: 'Molding' },
    plannedQuantity: 300000,
    producedQuantity: 0,
    rejectedQuantity: 0,
    startDate: '2026-07-31T17:29:00',
    endDate: '2026-08-01T17:29:00',
    status: 'planned',
    priority: 'high',
    isFavorite: false,
    createdAt: '2026-07-24T10:00:00',
    updatedAt: '2026-07-27T12:00:00',
    createdBy: 'Planner A',
  },
  {
    id: '2',
    planNumber: '100-7262',
    part: { id: 'p2', name: 'SFG - Diamond Jug', code: '100-7262' },
    color: { id: 'c1', name: 'NA', code: 'NA' },
    equipment: { id: 'HT-29-HT-270', name: 'HT-29-HT-270', code: 'HT-29-HT-270', department: 'Molding' },
    plannedQuantity: 15000,
    producedQuantity: 0,
    rejectedQuantity: 0,
    startDate: '2026-08-02T01:28:00',
    endDate: '2026-08-02T12:28:00',
    status: 'planned',
    priority: 'medium',
    isFavorite: false,
    createdAt: '2026-07-25T11:00:00',
    updatedAt: '2026-07-28T13:00:00',
    createdBy: 'Planner B',
  },
  {
    id: '3',
    planNumber: '100-7249',
    part: { id: 'p3', name: 'SFG - Darvinks NeoSkin Flip Cap', code: '100-7249' },
    color: { id: 'c1', name: 'NA', code: 'NA' },
    equipment: { id: 'HT-30-HT-270', name: 'HT-30-HT-270', code: 'HT-30-HT-270', department: 'Molding' },
    plannedQuantity: 300000,
    producedQuantity: 0,
    rejectedQuantity: 0,
    startDate: '2026-08-01T10:32:00',
    endDate: '2026-08-01T20:32:00',
    status: 'planned',
    priority: 'high',
    isFavorite: false,
    createdAt: '2026-07-26T09:00:00',
    updatedAt: '2026-07-29T15:00:00',
    createdBy: 'Planner C',
  },
  {
    id: '4',
    planNumber: '100-7031',
    part: { id: 'p4', name: 'SFG - Diamond Jug', code: '100-7031' },
    color: { id: 'c1', name: 'NA', code: 'NA' },
    equipment: { id: 'HT-29-HT-270', name: 'HT-29-HT-270', code: 'HT-29-HT-270', department: 'Molding' },
    plannedQuantity: 12000,
    producedQuantity: 0,
    rejectedQuantity: 0,
    startDate: '2026-07-13T22:00:00',
    endDate: '2026-07-14T06:00:00',
    status: 'planned',
    priority: 'low',
    isFavorite: true,
    createdAt: '2026-07-20T08:00:00',
    updatedAt: '2026-07-27T08:00:00',
    createdBy: 'Planner D',
  },
  {
    id: '5',
    planNumber: '100-7254',
    part: { id: 'p5', name: 'MI-10-HT-160 Sfg Twister Medium Cover', code: '100-7254' },
    color: { id: 'c1', name: 'NA', code: 'NA' },
    equipment: { id: 'HT-28-HT-270', name: 'HT-28-HT-270', code: 'HT-28-HT-270', department: 'Molding' },
    plannedQuantity: 1500000,
    producedQuantity: 0,
    rejectedQuantity: 0,
    startDate: '2026-05-06T12:30:00',
    endDate: '2026-05-06T20:30:00',
    status: 'planned',
    priority: 'high',
    isFavorite: false,
    createdAt: '2026-07-18T15:00:00',
    updatedAt: '2026-07-25T16:00:00',
    createdBy: 'Planner E',
  },
];

export const useProductionPlans = (params: UseProductionPlansParams) => {
  const [data, setData] = useState<ProductionPlan[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      let filtered = [...mockPlans];

      if (params.machine) {
        filtered = filtered.filter((p) => p.equipment.name === params.machine);
      }
      if (params.shift && params.shift !== 'all') {
        filtered = filtered.filter((p) => p.status === params.shift);
      }
      if (params.status && params.status !== 'all') {
        filtered = filtered.filter((p) => p.status === params.status);
      }
      if (params.search) {
        const search = params.search.toLowerCase();
        filtered = filtered.filter((p) =>
          p.planNumber.toLowerCase().includes(search) ||
          p.part.name.toLowerCase().includes(search) ||
          p.equipment.name.toLowerCase().includes(search)
        );
      }

      if (params.date && params.listView) {
        const startDate = new Date(params.date);
        const endDate = new Date(startDate);
        if (params.listView === 'Week') {
          endDate.setDate(startDate.getDate() + 6);
        } else if (params.listView === 'Month') {
          endDate.setDate(startDate.getDate() + 29);
        }

        filtered = filtered.filter((p) => {
          const planDate = new Date(p.startDate);
          return planDate >= startDate && planDate <= endDate;
        });
      }

      setData(filtered);
      setLoading(false);
    }, 300);
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, refetch };
};
