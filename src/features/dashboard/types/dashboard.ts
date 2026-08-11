// src/features/dashboard/types/dashboard.ts

export interface Shift {
  id: string;
  label: string;
  date: string;
}

export interface Metric {
  key: string;
  label: string;
  value: number;
  trend: number;
}

export interface AvailabilityComparison {
  machine: string;
  shift1: number;
  shift2: number;
}

export interface ParetoDatum {
  name: string;
  value: number;
}

export interface ProductionRow {
  plan: string;
  planUrl?: string;
  part: string;
  produced: number;
  accepted: number;
  rejected: number;
}

export interface MachineGroup {
  machine: string;
  equipmentLabel: string;
  rows: ProductionRow[];
}

export interface DashboardData {
  shift: Shift;
  oeeMetrics: {
    oee: number;
    trend: number;
    availability: number;
    availabilityTrend: number;
    performance: number;
    performanceTrend: number;
    quality: number;
    qualityTrend: number;
  };
  metrics: Metric[];
  availabilityComparison: AvailabilityComparison[];
  downtimeByMachine: ParetoDatum[];
  downtimeByReason: ParetoDatum[];
  productionGroups: MachineGroup[];
}