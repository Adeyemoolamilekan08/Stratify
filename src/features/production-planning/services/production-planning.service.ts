import { api } from '@services/api/axios';

// Mock data for testing
const mockPlans = [
  {
    id: '1',
    machineName: 'HT-28-HT-270',
    status: 'running',
    part: '100-7017',
    partDescription: 'Darvinks Visita Flip Cap',
    cavity: 4,
    cycleTime: 12,
    equipment: 'Darvinks',
    mould: 'M-001',
    plannedQty: 300000,
    actualQty: 8759,
    efficiency: 95,
    machineId: 'HT-28-HT-270',
  },
  {
    id: '2',
    machineName: 'HT-29-HT-270',
    status: 'idle',
    part: '100-6982',
    partDescription: 'SFG - Crystal/Deep Bucket 5ltr Rndv',
    cavity: 2,
    cycleTime: 15,
    equipment: 'SFG',
    mould: 'M-002',
    plannedQty: 20000,
    actualQty: 0,
    efficiency: 0,
    machineId: 'HT-29-HT-270',
  },
  {
    id: '3',
    machineName: 'HT-30-HT-270',
    status: 'running',
    part: '100-7013',
    partDescription: 'Crystal Spoon',
    cavity: 6,
    cycleTime: 8,
    equipment: 'Crystal',
    mould: 'M-003',
    plannedQty: 300000,
    actualQty: 41465,
    efficiency: 92,
    machineId: 'HT-30-HT-270',
  },
  {
    id: '4',
    machineName: 'HT-32-FERO-275',
    status: 'stopped',
    part: '100-7004',
    partDescription: 'SFG - 50cc Cap',
    cavity: 8,
    cycleTime: 10,
    equipment: 'SFG',
    mould: 'M-004',
    plannedQty: 150000,
    actualQty: 20022,
    efficiency: 85,
    machineId: 'HT-32-FERO-275',
  },
  {
    id: '5',
    machineName: 'HT-34-FERO-200',
    status: 'idle',
    part: '100-7019',
    partDescription: 'SFG - 30gm Visita Cap',
    cavity: 4,
    cycleTime: 14,
    equipment: 'SFG',
    mould: 'M-005',
    plannedQty: 300000,
    actualQty: 0,
    efficiency: 0,
    machineId: 'HT-34-FERO-200',
  },
];

export const ProductionPlanningService = {
  getPlans: async (filters?: any) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filteredPlans = [...mockPlans];
    
    if (filters?.machine) {
      filteredPlans = filteredPlans.filter(p => p.machineId === filters.machine);
    }
    if (filters?.status && filters.status !== 'all') {
      filteredPlans = filteredPlans.filter(p => p.status === filters.status);
    }
    if (filters?.shift && filters.shift !== 'all') {
      filteredPlans = filteredPlans.filter(p => p.shift === filters.shift);
    }
    
    return filteredPlans;
  },
};
