// src/features/dashboard/services/dashboardApi.ts

import { apiClient } from '@services/api/client';
import {
  Shift,
  Metric,
  AvailabilityComparison,
  ParetoDatum,
  MachineGroup,
  DashboardData
} from '../types/dashboard';

// Mock data - replace with real API calls
const mockShifts: Shift[] = [
  { id: '1', label: 'Shift1, 2026-07-30', date: '2026-07-30' },
  { id: '2', label: 'Shift2, 2026-07-30', date: '2026-07-30' },
  { id: '3', label: 'Shift3, 2026-07-30', date: '2026-07-30' },
];

const mockAvailabilityData: AvailabilityComparison[] = [
  { machine: 'HT-27-HT-270', shift1: 99.2, shift2: 97.5 },
  { machine: 'HT-39-HT-270', shift1: 98.7, shift2: 96.8 },
  { machine: 'LI-43-HT-1000', shift1: 99.8, shift2: 98.9 },
  { machine: 'MI-04-FU-110', shift1: 20.4, shift2: 85.6 },
  { machine: 'MI-10-HT-120', shift1: 97.3, shift2: 95.1 },
  { machine: 'MI-17-HT-200', shift1: 98.1, shift2: 97.8 },
  { machine: 'MI-23-HT-300', shift1: 96.5, shift2: 94.2 },
  { machine: 'LI-42-HT-700', shift1: 55.0, shift2: 88.3 },
  { machine: 'HT-53-HT-200', shift1: 85.0, shift2: 82.4 },
  { machine: 'MI-10-HT-160', shift1: 60.0, shift2: 90.1 },
  { machine: 'MI-15-HT-200', shift1: 97.8, shift2: 96.5 },
  { machine: 'HT-37-HT-260', shift1: 98.3, shift2: 97.2 },
  { machine: 'MI-22-HT-300', shift1: 94.5, shift2: 92.8 },
  { machine: 'HT-45-HT-350', shift1: 88.2, shift2: 84.6 },
  { machine: 'LI-50-HT-500', shift1: 92.7, shift2: 89.3 },
  { machine: 'MI-12-HT-180', shift1: 76.4, shift2: 80.2 },
  { machine: 'HT-28-HT-280', shift1: 95.1, shift2: 93.7 },
  { machine: 'MI-08-FU-200', shift1: 82.3, shift2: 78.9 },
  { machine: 'LI-46-HXM-900', shift1: 90.6, shift2: 87.4 },
  { machine: 'HT-55-HT-400', shift1: 73.8, shift2: 69.5 },
];

const mockDowntimeByMachine: ParetoDatum[] = [
  { name: 'MI-26-OC', value: 550 },
  { name: 'LI-41-HXM', value: 548 },
  { name: 'LI-44-HXM', value: 430 },
  { name: 'MI-15-HT-200', value: 230 },
  { name: 'HT-37-HT-260', value: 170 },
  { name: 'MI-24-OM', value: 155 },
  { name: 'MI-19-HT-250', value: 140 },
  { name: 'HT-35-FERO', value: 120 },
  { name: 'HT-29-HXH', value: 105 },
  { name: 'MI-16-FU-110', value: 90 },
  { name: 'MI-04-FU-110', value: 70 },
  { name: 'MI-20-FU-280', value: 55 },
];

const mockDowntimeByReason: ParetoDatum[] = [
  { name: 'No reason', value: 750 },
  { name: 'Nozzle blockage', value: 130 },
  { name: 'Process Fault', value: 50 },
  { name: 'Manpower shortage', value: 35 },
  { name: 'Machine Start Up', value: 15 },
];

const mockProductionGroups: MachineGroup[] = [
  {
    machine: 'HT-28-HT-270',
    equipmentLabel: 'HT-28-HT-270',
    rows: [
      { plan: '100-7102', part: 'SFG - Crystal/Deep Bucket', produced: 100, accepted: 98, rejected: 2 },
      { plan: '100-7103', part: 'SFG - 50cc Cap', produced: 200, accepted: 195, rejected: 5 },
    ]
  },
  {
    machine: 'HT-29-HT-270',
    equipmentLabel: 'HT-29-HT-270',
    rows: [
      { plan: '100-7104', part: 'Crystal Spoon', produced: 150, accepted: 148, rejected: 2 },
    ]
  },
  {
    machine: 'HT-30-HT-270',
    equipmentLabel: 'HT-30-HT-270',
    rows: [
      { plan: '100-7105', part: 'SFG - 30gm Visita Cap', produced: 300, accepted: 290, rejected: 10 },
    ]
  },
  {
    machine: 'HT-31-HT-270',
    equipmentLabel: 'HT-31-HT-270',
    rows: [
      { plan: '100-7106', part: 'Clear Jar 500ml', produced: 80, accepted: 78, rejected: 2 },
    ]
  },
  {
    machine: 'HT-32-FERO-275',
    equipmentLabel: 'HT-32-FERO-275',
    rows: [
      { plan: '100-7107', part: 'White Lid 40mm', produced: 220, accepted: 215, rejected: 5 },
    ]
  },
  {
    machine: 'HT-34-FERO-200',
    equipmentLabel: 'HT-34-FERO-200',
    rows: [
      { plan: '100-7108', part: 'Blue Cap 28mm', produced: 180, accepted: 176, rejected: 4 },
    ]
  },
  {
    machine: 'HT-35-HXH-260',
    equipmentLabel: 'HT-35-HXH-260',
    rows: [
      { plan: '100-7109', part: 'Green Cap 32mm', produced: 250, accepted: 245, rejected: 5 },
    ]
  },
  {
    machine: 'HT-36-HT-270',
    equipmentLabel: 'HT-36-HT-270',
    rows: [
      { plan: '100-7110', part: 'SFG - Deep Bucket 5ltr', produced: 130, accepted: 128, rejected: 2 },
    ]
  },
  {
    machine: 'HT-37-HT-270',
    equipmentLabel: 'HT-37-HT-270',
    rows: [
      { plan: '100-7111', part: 'SFG - Classic 16ltr', produced: 90, accepted: 88, rejected: 2 },
    ]
  },
  {
    machine: 'LI-42-HT-700',
    equipmentLabel: 'LI-42-HT-700',
    rows: [
      { plan: '100-7112', part: 'Crystal Bowl', produced: 160, accepted: 155, rejected: 5 },
    ]
  },
  {
    machine: 'LI-44-HXM-830',
    equipmentLabel: 'LI-44-HXM-830',
    rows: [
      { plan: '100-7113', part: 'SFG - Lid 40mm', produced: 200, accepted: 195, rejected: 5 },
    ]
  },
  {
    machine: 'MI-04-FU-110',
    equipmentLabel: 'MI-04-FU-110',
    rows: [
      { plan: '100-7114', part: 'SFG - Container 1ltr', produced: 120, accepted: 118, rejected: 2 },
    ]
  },
  {
    machine: 'MI-06-HT-120',
    equipmentLabel: 'MI-06-HT-120',
    rows: [
      { plan: '100-7115', part: 'SFG - Bucket 10ltr', produced: 75, accepted: 73, rejected: 2 },
    ]
  },
  {
    machine: 'MI-10-HT-120',
    equipmentLabel: 'MI-10-HT-120',
    rows: [
      { plan: '100-7116', part: 'SFG - Tray Large', produced: 110, accepted: 108, rejected: 2 },
    ]
  },
  {
    machine: 'MI-10-HT-160',
    equipmentLabel: 'MI-10-HT-160',
    rows: [
      { plan: '100-7117', part: 'SFG - Tray Small', produced: 140, accepted: 138, rejected: 2 },
    ]
  },
  {
    machine: 'MI-15-HT-200',
    equipmentLabel: 'MI-15-HT-200',
    rows: [
      { plan: '100-7118', part: 'SFG - Cover 30mm', produced: 170, accepted: 167, rejected: 3 },
    ]
  },
  {
    machine: 'MI-17-HT-200',
    equipmentLabel: 'MI-17-HT-200',
    rows: [
      { plan: '100-7119', part: 'SFG - Base 30mm', produced: 190, accepted: 186, rejected: 4 },
    ]
  },
  {
    machine: 'MI-23-HT-300',
    equipmentLabel: 'MI-23-HT-300',
    rows: [
      { plan: '100-7120', part: 'SFG - Ring 40mm', produced: 210, accepted: 205, rejected: 5 },
    ]
  },
];

export const dashboardApi = {
  getShifts: async (): Promise<Shift[]> => {
    return mockShifts;
  },

  getDashboardData: async (shiftId: string): Promise<DashboardData> => {
    // Find the selected shift
    const shift = mockShifts.find(s => s.id === shiftId) || mockShifts[0];

    // OEE metrics
    const oeeMetrics = {
      oee: 59.64,
      trend: -5.63,
      availability: 75.39,
      availabilityTrend: 1.21,
      performance: 77.02,
      performanceTrend: 2.34,
      quality: 99.0,
      qualityTrend: 0.15,
    };

    // Carousel metrics (4th is Utilization)
    const metrics: Metric[] = [
      { key: 'availability', label: 'Availability', value: oeeMetrics.availability, trend: oeeMetrics.availabilityTrend },
      { key: 'performance', label: 'Performance', value: oeeMetrics.performance, trend: oeeMetrics.performanceTrend },
      { key: 'quality', label: 'Quality', value: oeeMetrics.quality, trend: oeeMetrics.qualityTrend },
      { key: 'utilization', label: 'Utilization', value: 82.5, trend: 1.2 },
    ];

    return {
      shift,
      oeeMetrics,
      metrics,
      availabilityComparison: mockAvailabilityData,
      downtimeByMachine: mockDowntimeByMachine,
      downtimeByReason: mockDowntimeByReason,
      productionGroups: mockProductionGroups,
    };
  },

  refreshRow: async (machine: string, plan: string): Promise<ProductionRow> => {
    // Mock refresh - returns updated row data
    const group = mockProductionGroups.find(g => g.machine === machine);
    const row = group?.rows.find(r => r.plan === plan);
    if (row) {
      // Slightly randomize values to simulate refresh
      const change = Math.floor(Math.random() * 5) - 2;
      return {
        ...row,
        produced: Math.max(0, row.produced + change),
        accepted: Math.max(0, row.accepted + change),
        rejected: Math.max(0, row.rejected + change),
      };
    }
    throw new Error('Row not found');
  },
};