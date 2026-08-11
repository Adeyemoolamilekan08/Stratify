import { MachineStatus, ShopfloorStats } from '../types/live-shopfloor.types';

export const mockStats: ShopfloorStats = {
  totalMachines: 49,
  operating: 32,
  stopped: 13,
  idle: 4,
};

export const mockMachines: MachineStatus[] = [
  {
    id: '1',
    name: 'HT-27-HT-270',
    status: 'down',
    downSince: '2 days',
    downReason: 'No reason',
    lastUpdate: '14 minutes ago',
  },
  {
    id: '2',
    name: 'HT-28-HT-270',
    status: 'operational',
    product: 'Darvinks Visita Flip Cap - NA',
    availability: 73.65,
    quality: 100.00,
    lastUpdate: '37 minutes ago',
  },
  {
    id: '3',
    name: '3408/32400',
    status: 'operational',
    performance: 77.09,
    quality: 56.78,
    lastUpdate: '45 minutes ago',
  },
  {
    id: '4',
    name: 'HT-29-HT-270',
    status: 'idle',
    performance: 100.00,
    quality: 100.00,
    oee: 100.00,
    lastUpdate: '1 hour ago',
  },
  {
    id: '5',
    name: 'HT-30-HT-270',
    status: 'stopped',
    lastUpdate: '2 hours ago',
  },
];