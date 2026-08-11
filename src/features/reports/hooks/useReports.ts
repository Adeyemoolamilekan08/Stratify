import { useQuery } from '@tanstack/react-query';
import { ReportsService } from '../services/reports.service';
import { ReportFilter } from '../types/reports.types';

export const reportKeys = {
  all: ['reports'] as const,
  production: (filters: ReportFilter) => [...reportKeys.all, 'production', filters] as const,
  downtime: (filters: ReportFilter) => [...reportKeys.all, 'downtime', filters] as const,
  quality: (filters: ReportFilter) => [...reportKeys.all, 'quality', filters] as const,
  performance: (filters: ReportFilter) => [...reportKeys.all, 'performance', filters] as const,
};

export const useProductionReport = (filters: ReportFilter) => {
  return useQuery({
    queryKey: reportKeys.production(filters),
    queryFn: () => ReportsService.getProductionReport(filters),
    staleTime: 5 * 60 * 1000,
  });
};

export const useDowntimeReport = (filters: ReportFilter) => {
  return useQuery({
    queryKey: reportKeys.downtime(filters),
    queryFn: () => ReportsService.getDowntimeReport(filters),
    staleTime: 5 * 60 * 1000,
  });
};

export const useQualityReport = (filters: ReportFilter) => {
  return useQuery({
    queryKey: reportKeys.quality(filters),
    queryFn: () => ReportsService.getQualityReport(filters),
    staleTime: 5 * 60 * 1000,
  });
};

export const usePerformanceReport = (filters: ReportFilter) => {
  return useQuery({
    queryKey: reportKeys.performance(filters),
    queryFn: () => ReportsService.getPerformanceReport(filters),
    staleTime: 5 * 60 * 1000,
  });
};