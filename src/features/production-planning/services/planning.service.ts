// src/features/production-planning/services/planning.service.ts

import { ProductionPlan, FilterState } from '../types/productionPlanning';

export const planningService = {
  getPlans: async (filters?: FilterState): Promise<ProductionPlan[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    return [];
  },

  getPlanById: async (id: string): Promise<ProductionPlan | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return null;
  },

  createPlan: async (data: Partial<ProductionPlan>): Promise<ProductionPlan> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {} as ProductionPlan;
  },

  updatePlan: async (id: string, data: Partial<ProductionPlan>): Promise<ProductionPlan> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {} as ProductionPlan;
  },

  deletePlan: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
  },

  copyPlan: async (id: string): Promise<ProductionPlan> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {} as ProductionPlan;
  },

  toggleFavorite: async (id: string): Promise<ProductionPlan> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return {} as ProductionPlan;
  },
};