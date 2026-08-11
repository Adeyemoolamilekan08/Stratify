export interface MachineStatus {
  id: string;
  name: string;
  status: 'operational' | 'stopped' | 'idle' | 'down';
  product?: string;
  availability?: number;
  quality?: number;
  performance?: number;
  oee?: number;
  downSince?: string;
  downReason?: string;
  lastUpdate: string;
}

export interface ShopfloorStats {
  totalMachines: number;
  operating: number;
  stopped: number;
  idle: number;
}