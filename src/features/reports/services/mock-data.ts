import { ProductionReportData, DowntimeReportData, QualityReportData, PerformanceReportData } from '../types/reports.types';

// Generate dates for the last 30 days
const generateDates = (days: number) => {
  const dates = [];
  const today = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date);
  }
  return dates;
};

const dates = generateDates(30);

export const mockProductionReport: ProductionReportData = {
  summary: {
    totalProduced: 15420,
    totalAccepted: 14920,
    totalRejected: 500,
    efficiency: 96.8,
    targetAchieved: 92.5,
  },
  dailyData: dates.map(date => ({
    date: date.toISOString().split('T')[0],
    produced: Math.floor(Math.random() * 200) + 400,
    accepted: Math.floor(Math.random() * 180) + 380,
    rejected: Math.floor(Math.random() * 30) + 10,
  })),
  machinePerformance: [
    { machineId: '1', machineName: 'LI-43-OM-910', produced: 5200, efficiency: 97.2, utilization: 88.5 },
    { machineId: '2', machineName: 'LI-44-OM-920', produced: 4800, efficiency: 95.8, utilization: 82.3 },
    { machineId: '3', machineName: 'LI-45-OM-930', produced: 4400, efficiency: 93.4, utilization: 76.8 },
    { machineId: '4', machineName: 'LI-46-OM-940', produced: 4900, efficiency: 96.1, utilization: 85.7 },
    { machineId: '5', machineName: 'LI-47-OM-950', produced: 3800, efficiency: 91.8, utilization: 71.2 },
  ],
  shiftPerformance: [
    { shift: 'Shift A', produced: 5800, efficiency: 97.5 },
    { shift: 'Shift B', produced: 5200, efficiency: 95.2 },
    { shift: 'Shift C', produced: 4420, efficiency: 93.8 },
  ],
  trends: dates.slice(0, 15).map(date => ({
    date: date.toISOString().split('T')[0],
    efficiency: 90 + Math.random() * 8,
    production: Math.floor(Math.random() * 200) + 400,
  })),
};

export const mockDowntimeReport: DowntimeReportData = {
  summary: {
    totalDowntime: 1320,
    totalEvents: 48,
    averageDuration: 27.5,
    availability: 87.5,
    mtbf: 185,
    mttr: 42,
  },
  downtimeByCategory: [
    { category: 'Unplanned', duration: 480, count: 18 },
    { category: 'Maintenance', duration: 360, count: 12 },
    { category: 'Setup', duration: 240, count: 8 },
    { category: 'Break', duration: 120, count: 6 },
    { category: 'Quality', duration: 120, count: 4 },
  ],
  topReasons: [
    { reason: 'Machine Breakdown', duration: 300, count: 10 },
    { reason: 'Scheduled Maintenance', duration: 240, count: 8 },
    { reason: 'Material Shortage', duration: 180, count: 6 },
    { reason: 'Machine Setup', duration: 180, count: 6 },
    { reason: 'Quality Inspection', duration: 120, count: 4 },
  ],
  machineDowntime: [
    { machineId: '1', machineName: 'LI-43-OM-910', duration: 360, count: 12 },
    { machineId: '2', machineName: 'LI-44-OM-920', duration: 300, count: 10 },
    { machineId: '3', machineName: 'LI-45-OM-930', duration: 240, count: 8 },
    { machineId: '4', machineName: 'LI-46-OM-940', duration: 270, count: 9 },
    { machineId: '5', machineName: 'LI-47-OM-950', duration: 150, count: 5 },
  ],
  dailyTrends: dates.slice(0, 15).map(date => ({
    date: date.toISOString().split('T')[0],
    downtime: Math.floor(Math.random() * 60) + 20,
    events: Math.floor(Math.random() * 5) + 1,
  })),
};

export const mockQualityReport: QualityReportData = {
  summary: {
    totalInspected: 15200,
    passed: 14440,
    failed: 760,
    firstPassYield: 95.0,
    reworkRate: 3.2,
    scrapRate: 1.8,
  },
  dailyQuality: dates.slice(0, 15).map(date => ({
    date: date.toISOString().split('T')[0],
    inspected: Math.floor(Math.random() * 200) + 400,
    passed: Math.floor(Math.random() * 180) + 380,
    failed: Math.floor(Math.random() * 30) + 10,
  })),
  defectsByMachine: [
    { machineId: '1', machineName: 'LI-43-OM-910', defects: 120, defectRate: 2.3 },
    { machineId: '2', machineName: 'LI-44-OM-920', defects: 95, defectRate: 2.0 },
    { machineId: '3', machineName: 'LI-45-OM-930', defects: 150, defectRate: 3.4 },
    { machineId: '4', machineName: 'LI-46-OM-940', defects: 85, defectRate: 1.7 },
    { machineId: '5', machineName: 'LI-47-OM-950', defects: 180, defectRate: 4.7 },
  ],
  defectTypes: [
    { type: 'Dimensional', count: 280, percentage: 36.8 },
    { type: 'Surface Defects', count: 200, percentage: 26.3 },
    { type: 'Material Defects', count: 150, percentage: 19.7 },
    { type: 'Assembly Issues', count: 80, percentage: 10.5 },
    { type: 'Other', count: 50, percentage: 6.6 },
  ],
  trends: dates.slice(0, 15).map(date => ({
    date: date.toISOString().split('T')[0],
    passRate: 92 + Math.random() * 6,
    yield: 90 + Math.random() * 8,
  })),
};

export const mockPerformanceReport: PerformanceReportData = {
  summary: {
    oee: 78.5,
    availability: 87.5,
    performance: 92.3,
    quality: 96.8,
    totalProduced: 15420,
    targetProduction: 18000,
  },
  machinePerformance: [
    { machineId: '1', machineName: 'LI-43-OM-910', oee: 84.2, availability: 90.5, performance: 95.2, quality: 97.8 },
    { machineId: '2', machineName: 'LI-44-OM-920', oee: 79.8, availability: 87.3, performance: 93.1, quality: 96.5 },
    { machineId: '3', machineName: 'LI-45-OM-930', oee: 72.5, availability: 82.4, performance: 89.8, quality: 94.2 },
    { machineId: '4', machineName: 'LI-46-OM-940', oee: 81.3, availability: 88.6, performance: 94.5, quality: 97.1 },
    { machineId: '5', machineName: 'LI-47-OM-950', oee: 68.7, availability: 78.9, performance: 87.2, quality: 91.8 },
  ],
  dailyOEE: dates.slice(0, 15).map(date => ({
    date: date.toISOString().split('T')[0],
    oee: 72 + Math.random() * 12,
    availability: 82 + Math.random() * 10,
    performance: 88 + Math.random() * 8,
    quality: 92 + Math.random() * 6,
  })),
  operatorPerformance: [
    { operator: 'Mike Johnson', efficiency: 95.2, quality: 97.8, unitsProduced: 4200 },
    { operator: 'Sarah Smith', efficiency: 92.8, quality: 96.5, unitsProduced: 3800 },
    { operator: 'Tom Wilson', efficiency: 88.5, quality: 94.2, unitsProduced: 3400 },
    { operator: 'Emma Davis', efficiency: 93.1, quality: 97.1, unitsProduced: 3900 },
    { operator: 'James Brown', efficiency: 86.8, quality: 91.8, unitsProduced: 3100 },
  ],
};