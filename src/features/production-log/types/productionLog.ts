// src/features/production-log/types/productionLog.ts

export interface ProductionLog {
  id: string;
  machineName: string;
  shift: string;
  startTime: string;
  endTime?: string;
  status: ProductionStatus;
  partName: string;
  plannedQuantity: number;
  producedQuantity: number;
  acceptedQuantity: number;
  rejectedQuantity: number;
  scrapQuantity: number;
  oee?: number;
  operator?: string;
  notes?: string;
}

export type ProductionStatus = 'Running' | 'Stopped' | 'Idle' | 'Maintenance';

export interface ProductionLogFilters {
  machineName?: string;
  shift?: string;
  status?: ProductionStatus;
  dateFrom?: string;
  dateTo?: string;
}

export interface ProductionLogStats {
  totalProduction: number;
  totalAccepted: number;
  totalRejected: number;
  totalScrap: number;
  overallOEE: number;
  machineCount: number;
}