export interface Machine {
  id: string;
  name: string;
  code: string;
  status: 'running' | 'idle' | 'offline' | 'maintenance' | 'setup';
  operator?: string;
  currentProduct?: string;
  efficiency?: number;
  oee?: number;
  shift?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MachineStatus {
  id: string;
  status: string;
  lastUpdate: Date;
}
