export interface ReportFilter {
  dateFrom?: Date;
  dateTo?: Date;
  machineId?: string;
  shift?: 'A' | 'B' | 'C' | 'all';
  department?: string;
  interval?: 'hourly' | 'daily' | 'shift';
}

export interface ProductionReportData {
  summary: {
    totalProduced: number;
    totalTarget: number;
    efficiency: number;
    totalMachines: number;
  };
  chartData: {
    labels: string[];
    produced: number[];
    target: number[];
  };
  tableData: any[];
}

export interface DowntimeReportData {
  summary: {
    totalDowntime: number;
    totalEvents: number;
    avgDuration: number;
    availability: number;
  };
  chartData: {
    labels: string[];
    values: number[];
    colors: string[];
  };
  tableData: any[];
}

export interface QualityReportData {
  summary: {
    totalInspected: number;
    accepted: number;
    rejected: number;
    defectRate: number;
  };
  chartData: {
    labels: string[];
    accepted: number[];
    rejected: number[];
  };
  tableData: any[];
}

export interface PerformanceReportData {
  summary: {
    avgEfficiency: number;
    totalRuntime: number;
    totalDelay: number;
    totalReject: number;
  };
  chartData: {
    labels: string[];
    runtime: number[];
    delay: number[];
    reject: number[];
  };
  tableData: any[];
}