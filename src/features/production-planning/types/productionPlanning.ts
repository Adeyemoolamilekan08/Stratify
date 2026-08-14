// src/features/production-planning/types/productionPlanning.ts

export interface ProductionPlan {
  id: string;
  planNumber: string;
  part: {
    id: string;
    name: string;
    code: string;
  };
  color?: {
    id: string;
    name: string;
    code: string;
  };
  equipment: {
    id: string;
    name: string;
    code: string;
    department: string;
  };
  plannedQuantity: number;
  producedQuantity: number;
  rejectedQuantity: number;
  startDate: string;
  endDate: string;
  status: 'planned' | 'in-progress' | 'completed' | 'delayed' | 'paused' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  notes?: string;
}

export interface FilterState {
  equipmentIds?: string[];
  dateFrom?: string | null;
  dateTo?: string | null;
  planNumber?: string;
  statuses?: ProductionPlan['status'][];
  product?: string;
  colorIds?: string[];
  minQuantity?: number;
  maxQuantity?: number;
}
export interface Equipment {
  id: string;
  name: string;
  code: string;
  department: string;
}
