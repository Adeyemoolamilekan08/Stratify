export interface DowntimeLog {
  id: string;
  machineId: string;
  machineName: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  reason: string;
  reasonCode: string;
  operator: string;
  remarks?: string;
  category: 'planned' | 'unplanned' | 'maintenance' | 'break';
  createdAt: Date;
}
