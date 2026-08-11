export interface ProductionPlan {
  id: string;
  machineId: string;
  machineName: string;
  productId: string;
  productName: string;
  quantity: number;
  produced: number;
  accepted: number;
  rejected: number;
  rework: number;
  scrap: number;
  startTime: Date;
  endTime?: Date;
  status: 'pending' | 'running' | 'completed' | 'cancelled' | 'paused';
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface ProductionLog {
  id: string;
  machineId: string;
  planId: string;
  operator: string;
  produced: number;
  accepted: number;
  rejected: number;
  rework: number;
  scrap: number;
  timestamp: Date;
}
