// src/features/production-log/services/productionLogApi.ts

export interface ProductionLog {
  id: string;
  machineName: string;
  shift: string;
  startTime: string;
  endTime?: string;
  status: string;
  partName: string;
  plannedQuantity: number;
  producedQuantity: number;
  acceptedQuantity: number;
  rejectedQuantity: number;
  scrapQuantity: number;
  oee?: number;
}

// Mock data for now
const mockProductionLogs: ProductionLog[] = [
  {
    id: '1',
    machineName: 'HT-28-HT-270100',
    shift: 'Shift A',
    startTime: '2026-07-24 06:00',
    endTime: '2026-07-24 14:00',
    status: 'Running',
    partName: 'Part A-100',
    plannedQuantity: 1000,
    producedQuantity: 950,
    acceptedQuantity: 920,
    rejectedQuantity: 20,
    scrapQuantity: 10,
    oee: 85.5,
  },
  // Add more mock data as needed
];

export const productionLogApi = {
  // Get all production logs
  getLogs: async (): Promise<ProductionLog[]> => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockProductionLogs), 500);
    });
  },

  // Get a single production log by ID
  getLogById: async (id: string): Promise<ProductionLog | null> => {
    const log = mockProductionLogs.find((log) => log.id === id);
    return new Promise((resolve) => {
      setTimeout(() => resolve(log || null), 300);
    });
  },

  // Get logs by machine
  getLogsByMachine: async (machineName: string): Promise<ProductionLog[]> => {
    const logs = mockProductionLogs.filter(
      (log) => log.machineName === machineName
    );
    return new Promise((resolve) => {
      setTimeout(() => resolve(logs), 300);
    });
  },

  // Get logs by shift
  getLogsByShift: async (shift: string): Promise<ProductionLog[]> => {
    const logs = mockProductionLogs.filter((log) => log.shift === shift);
    return new Promise((resolve) => {
      setTimeout(() => resolve(logs), 300);
    });
  },
};