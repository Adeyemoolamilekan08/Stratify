// src/features/production-planning/services/productionPlanningApi.ts

import { ProductionPlan } from '../types/productionPlanning';

// Mock data
const mockPlans: ProductionPlan[] = [
  {
    id: '1',
    orderNumber: 'PO-2026-001',
    machineName: 'HT-28-HT-270100',
    partName: 'Part A-100',
    priority: 'High',
    status: 'In-Progress',
    plannedStartDate: '2026-07-24',
    plannedEndDate: '2026-07-25',
    plannedQuantity: 1000,
    completedQuantity: 450,
    rejectedQuantity: 5,
    oee: 85.5,
  },
  // Add more mock data
];

export const productionPlanningApi = {
  // Get all production plans
  getPlans: async (): Promise<ProductionPlan[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockPlans), 500);
    });
  },

  // Get a single plan by ID
  getPlanById: async (id: string): Promise<ProductionPlan | null> => {
    const plan = mockPlans.find((p) => p.id === id);
    return new Promise((resolve) => {
      setTimeout(() => resolve(plan || null), 300);
    });
  },

  // Create a new production plan
  createPlan: async (plan: Omit<ProductionPlan, 'id'>): Promise<ProductionPlan> => {
    const newPlan = {
      ...plan,
      id: `PLAN-${Date.now()}`,
    };
    mockPlans.push(newPlan);
    return new Promise((resolve) => {
      setTimeout(() => resolve(newPlan), 500);
    });
  },

  // Update a production plan
  updatePlan: async (id: string, plan: Partial<ProductionPlan>): Promise<ProductionPlan> => {
    const index = mockPlans.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Plan not found');
    mockPlans[index] = { ...mockPlans[index], ...plan };
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockPlans[index]), 500);
    });
  },
};