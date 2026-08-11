// Dashboard Type Definitions
// KPI, Machine, Production, Downtime, OEE

export interface KPIData {
  totalMachines: number;
  running: number;
  idle: number;
  offline: number;
  maintenance: number;
  efficiency: number;
  oee: number;
}

export interface MachineStatus {
  id: string;
  name: string;
  status: 'Running' | 'Idle' | 'Offline' | 'Maintenance' | 'Setup';
  operator: string;
  efficiency: number;
  oee: number;
  shift: 'A' | 'B' | 'C';
}

export interface ProductionData {
  hourly: {
    hour: number;
    produced: number;
    target: number;
  }[];
  daily: {
    date: string;
    produced: number;
    target: number;
  }[];
  shift: {
    shift: string;
    produced: number;
    target: number;
  }[];
}

export interface DowntimeData {
  reason: string;
  duration: number;
  category: 'Planned' | 'Unplanned' | 'Maintenance' | 'Break' | 'Setup' | 'Quality';
}

export interface OEEData {
  availability: number;
  performance: number;
  quality: number;
  overall: number;
}

export interface DashboardData {
  kpi: KPIData;
  production: ProductionData;
  machines: MachineStatus[];
  downtime: DowntimeData[];
  oee: OEEData;
}
