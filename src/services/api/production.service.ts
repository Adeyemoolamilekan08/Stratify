export interface ProductionData {
  id: string;
  machineId: string;
  machineName: string;
  shift: string;
  plan: number;
  produced: number;
  accepted: number;
  rejected: number;
  scrap: number;
  oee: number;
  timestamp: string;
}

export interface MachineStatus {
  id: string;
  name: string;
  status: 'running' | 'idle' | 'stopped' | 'maintenance';
  oee: number;
  production: number;
  target: number;
  shift: string;
}

export const ProductionService = {
  // Get production data
  getProductionData: async (): Promise<ProductionData[]> => {
    // Mock data - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            machineId: 'M001',
            machineName: 'HT-28-HT-270100',
            shift: 'Shift A',
            plan: 1000,
            produced: 950,
            accepted: 920,
            rejected: 20,
            scrap: 10,
            oee: 85.5,
            timestamp: new Date().toISOString(),
          },
          {
            id: '2',
            machineId: 'M002',
            machineName: 'HT-28-HT-270101',
            shift: 'Shift A',
            plan: 900,
            produced: 820,
            accepted: 800,
            rejected: 15,
            scrap: 5,
            oee: 92.3,
            timestamp: new Date().toISOString(),
          },
        ]);
      }, 500);
    });
  },

  // Get machine status
  getMachineStatus: async (): Promise<MachineStatus[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            name: 'HT-28-HT-270100',
            status: 'running',
            oee: 85.5,
            production: 950,
            target: 1000,
            shift: 'Shift A',
          },
          {
            id: '2',
            name: 'HT-28-HT-270101',
            status: 'running',
            oee: 92.3,
            production: 820,
            target: 900,
            shift: 'Shift A',
          },
          {
            id: '3',
            name: 'HT-28-HT-270102',
            status: 'idle',
            oee: 0,
            production: 0,
            target: 800,
            shift: 'Shift A',
          },
          {
            id: '4',
            name: 'HT-28-HT-270103',
            status: 'maintenance',
            oee: 0,
            production: 0,
            target: 750,
            shift: 'Shift A',
          },
        ]);
      }, 500);
    });
  },

  // Update machine status
  updateMachineStatus: async (machineId: string, status: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Machine ' + machineId + ' status updated to ' + status);
        resolve();
      }, 300);
    });
  },
};
