import { ReportFilter, ProductionReportData, DowntimeReportData, QualityReportData, PerformanceReportData } from '../types/reports.types';

// Mock data generators
const generateProductionData = (): ProductionReportData => {
  const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
  const produced = [120, 135, 142, 128, 115, 130, 145, 138];
  const target = [150, 150, 150, 150, 150, 150, 150, 150];
  
  return {
    summary: {
      totalProduced: produced.reduce((a, b) => a + b, 0),
      totalTarget: target.reduce((a, b) => a + b, 0),
      efficiency: 89,
      totalMachines: 8,
    },
    chartData: {
      labels: hours,
      produced: produced,
      target: target,
    },
    tableData: hours.map((hour, index) => ({
      date: '2024-01-15',
      hour: hour,
      machine: `LI-${43 + index}-OM-${910 + index}`,
      department: 'Production',
      category: 'Standard',
      production: produced[index],
      target: target[index],
      efficiency: Math.round((produced[index] / target[index]) * 100),
      operator: ['Mike Johnson', 'Sarah Smith', 'Tom Wilson', 'Emma Davis', 'James Brown', 'Lisa Anderson', 'Robert Taylor', 'Maria Garcia'][index],
      shift: index < 4 ? 'A' : 'B',
      part: `Widget ${String.fromCharCode(65 + index)}`,
      plan: `PLN-${String(index + 1).padStart(3, '0')}`,
    })),
  };
};

const generateDowntimeData = (): DowntimeReportData => {
  const categories = ['Unplanned', 'Maintenance', 'Setup', 'Break', 'Quality'];
  const values = [105, 90, 45, 30, 30];
  const colors = ['#EF4444', '#F59E0B', '#8B5CF6', '#10B981', '#F97316'];
  
  return {
    summary: {
      totalDowntime: 300,
      totalEvents: 12,
      avgDuration: 25,
      availability: 87.5,
    },
    chartData: {
      labels: categories,
      values: values,
      colors: colors,
    },
    tableData: [
      { date: '2024-01-15', hour: '08:00', machine: 'LI-43-OM-910', department: 'Production', category: 'Unplanned', reason: 'Machine Breakdown', reasonCode: 'UNP-001', duration: 45, shift: 'A', operator: 'Mike Johnson' },
      { date: '2024-01-15', hour: '09:30', machine: 'LI-44-OM-920', department: 'Production', category: 'Planned', reason: 'Scheduled Maintenance', reasonCode: 'PLN-001', duration: 30, shift: 'A', operator: 'Sarah Smith' },
      { date: '2024-01-15', hour: '10:15', machine: 'LI-45-OM-930', department: 'Quality', category: 'Unplanned', reason: 'Material Shortage', reasonCode: 'UNP-003', duration: 60, shift: 'A', operator: 'Tom Wilson' },
      { date: '2024-01-15', hour: '11:00', machine: 'LI-46-OM-940', department: 'Production', category: 'Break', reason: 'Lunch Break', reasonCode: 'BRK-001', duration: 30, shift: 'A', operator: 'Emma Davis' },
      { date: '2024-01-15', hour: '12:30', machine: 'LI-47-OM-950', department: 'Maintenance', category: 'Maintenance', reason: 'Preventive Maintenance', reasonCode: 'MNT-001', duration: 90, shift: 'B', operator: 'James Brown' },
    ],
  };
};

const generateQualityData = (): QualityReportData => {
  const parts = ['Widget A', 'Widget B', 'Widget C', 'Widget D', 'Widget E', 'Widget F'];
  const accepted = [140, 78, 0, 115, 42, 87];
  const rejected = [5, 4, 0, 5, 3, 3];
  
  return {
    summary: {
      totalInspected: accepted.reduce((a, b) => a + b, 0) + rejected.reduce((a, b) => a + b, 0),
      accepted: accepted.reduce((a, b) => a + b, 0),
      rejected: rejected.reduce((a, b) => a + b, 0),
      defectRate: 3.2,
    },
    chartData: {
      labels: parts,
      accepted: accepted,
      rejected: rejected,
    },
    tableData: parts.map((part, index) => ({
      date: '2024-01-15',
      hour: `${8 + index}:00`,
      machine: `LI-${43 + index}-OM-${910 + index}`,
      operator: ['Mike Johnson', 'Sarah Smith', 'Tom Wilson', 'Emma Davis', 'James Brown', 'Lisa Anderson'][index],
      part: part,
      plan: `PLN-${String(index + 1).padStart(3, '0')}`,
      produced: accepted[index] + rejected[index],
      accepted: accepted[index],
      rejected: rejected[index],
      defectRate: `${Math.round((rejected[index] / (accepted[index] + rejected[index])) * 100)}%`,
      shift: index < 4 ? 'A' : 'B',
    })),
  };
};

const generatePerformanceData = (): PerformanceReportData => {
  const operators = ['Mike Johnson', 'Sarah Smith', 'Tom Wilson', 'Emma Davis', 'James Brown', 'Lisa Anderson'];
  const runtime = [480, 420, 0, 450, 240, 480];
  const delay = [45, 30, 60, 30, 90, 45];
  const reject = [5, 4, 0, 5, 3, 3];
  
  return {
    summary: {
      avgEfficiency: 68,
      totalRuntime: runtime.reduce((a, b) => a + b, 0),
      totalDelay: delay.reduce((a, b) => a + b, 0),
      totalReject: reject.reduce((a, b) => a + b, 0),
    },
    chartData: {
      labels: operators,
      runtime: runtime,
      delay: delay,
      reject: reject,
    },
    tableData: operators.map((operator, index) => ({
      date: '2024-01-15',
      shift: index < 4 ? 'A' : 'B',
      machine: `LI-${43 + index}-OM-${910 + index}`,
      operator: operator,
      operatorCode: `OP-${String(index + 1).padStart(3, '0')}`,
      plan: `PLN-${String(index + 1).padStart(3, '0')}`,
      part: `Widget ${String.fromCharCode(65 + index)}`,
      efficiency: runtime[index] > 0 ? Math.round((runtime[index] / (runtime[index] + delay[index])) * 100) : 0,
      runtime: runtime[index],
      delay: delay[index],
      reject: reject[index],
    })),
  };
};

export const ReportsService = {
  getProductionReport: async (filters?: ReportFilter): Promise<ProductionReportData> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return generateProductionData();
  },
  
  getDowntimeReport: async (filters?: ReportFilter): Promise<DowntimeReportData> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return generateDowntimeData();
  },
  
  getQualityReport: async (filters?: ReportFilter): Promise<QualityReportData> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return generateQualityData();
  },
  
  getPerformanceReport: async (filters?: ReportFilter): Promise<PerformanceReportData> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return generatePerformanceData();
  },
};