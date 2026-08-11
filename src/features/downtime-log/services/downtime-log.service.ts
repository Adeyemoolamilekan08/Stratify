import { api } from '@services/api/axios';
import { 
  DowntimeLog, 
  CreateDowntimeLogDto, 
  UpdateDowntimeLogDto,
  DowntimeLogFilters,
  DowntimeLogStats 
} from '../types/downtime-log.types';
import { mockDowntimeLogs, mockDowntimeStats } from './mock-data';

// Flag to use mock data
const USE_MOCK = true;

export class DowntimeLogService {
  static async getLogs(filters?: DowntimeLogFilters): Promise<DowntimeLog[]> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredLogs = [...mockDowntimeLogs];
      
      if (filters?.machineId) {
        filteredLogs = filteredLogs.filter(log => log.machineId === filters.machineId);
      }
      if (filters?.operator) {
        filteredLogs = filteredLogs.filter(log => 
          log.operator.toLowerCase().includes(filters.operator!.toLowerCase())
        );
      }
      if (filters?.shift) {
        filteredLogs = filteredLogs.filter(log => log.shift === filters.shift);
      }
      if (filters?.reasonCategory) {
        filteredLogs = filteredLogs.filter(log => log.reasonCategory === filters.reasonCategory);
      }
      if (filters?.status) {
        filteredLogs = filteredLogs.filter(log => log.status === filters.status);
      }
      if (filters?.dateFrom) {
        filteredLogs = filteredLogs.filter(log => log.startTime >= filters.dateFrom!);
      }
      if (filters?.dateTo) {
        filteredLogs = filteredLogs.filter(log => log.startTime <= filters.dateTo!);
      }
      
      return filteredLogs.sort((a, b) => 
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
      );
    }
    
    const response = await api.get<DowntimeLog[]>('/downtime/logs', { params: filters });
    return response.data;
  }

  static async getLog(id: string): Promise<DowntimeLog> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const log = mockDowntimeLogs.find(l => l.id === id);
      if (!log) throw new Error('Downtime log not found');
      return log;
    }
    
    const response = await api.get<DowntimeLog>(`/downtime/logs/${id}`);
    return response.data;
  }

  static async createLog(data: CreateDowntimeLogDto): Promise<DowntimeLog> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newLog: DowntimeLog = {
        id: Date.now().toString(),
        machineId: data.machineId,
        machineName: `Machine ${data.machineId}`,
        startTime: data.startTime,
        endTime: data.endTime,
        duration: data.endTime 
          ? Math.round((data.endTime.getTime() - data.startTime.getTime()) / 60000)
          : undefined,
        reason: data.reason,
        reasonCode: data.reasonCode,
        reasonCategory: data.reasonCategory,
        operator: data.operator,
        shift: data.shift,
        remarks: data.remarks,
        status: data.endTime ? 'resolved' : 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      mockDowntimeLogs.unshift(newLog);
      return newLog;
    }
    
    const response = await api.post<DowntimeLog>('/downtime/logs', data);
    return response.data;
  }

  static async updateLog(id: string, data: UpdateDowntimeLogDto): Promise<DowntimeLog> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockDowntimeLogs.findIndex(l => l.id === id);
      if (index === -1) throw new Error('Downtime log not found');
      
      const updated = { ...mockDowntimeLogs[index], ...data, updatedAt: new Date() };
      
      // Calculate duration if endTime is set
      if (data.endTime && updated.startTime) {
        updated.duration = Math.round((data.endTime.getTime() - updated.startTime.getTime()) / 60000);
        updated.status = 'resolved';
      }
      
      mockDowntimeLogs[index] = updated;
      return updated;
    }
    
    const response = await api.put<DowntimeLog>(`/downtime/logs/${id}`, data);
    return response.data;
  }

  static async resolveLog(id: string, endTime: Date): Promise<DowntimeLog> {
    return this.updateLog(id, { 
      endTime, 
      status: 'resolved' 
    });
  }

  static async deleteLog(id: string): Promise<void> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockDowntimeLogs.findIndex(l => l.id === id);
      if (index === -1) throw new Error('Downtime log not found');
      mockDowntimeLogs.splice(index, 1);
      return;
    }
    
    await api.delete(`/downtime/logs/${id}`);
  }

  static async getStats(filters?: DowntimeLogFilters): Promise<DowntimeLogStats> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Calculate stats from mock data
      let filteredLogs = [...mockDowntimeLogs];
      
      if (filters?.machineId) {
        filteredLogs = filteredLogs.filter(log => log.machineId === filters.machineId);
      }
      if (filters?.shift) {
        filteredLogs = filteredLogs.filter(log => log.shift === filters.shift);
      }
      if (filters?.dateFrom) {
        filteredLogs = filteredLogs.filter(log => log.startTime >= filters.dateFrom!);
      }
      if (filters?.dateTo) {
        filteredLogs = filteredLogs.filter(log => log.startTime <= filters.dateTo!);
      }
      
      const totalDowntime = filteredLogs.reduce((sum, log) => sum + (log.duration || 0), 0);
      const totalEvents = filteredLogs.length;
      const activeEvents = filteredLogs.filter(log => log.status === 'active').length;
      const avgDuration = totalEvents > 0 ? Math.round(totalDowntime / totalEvents) : 0;
      
      // Find most common reason
      const reasonCounts: Record<string, { count: number; name: string }> = {};
      filteredLogs.forEach(log => {
        if (!reasonCounts[log.reasonCode]) {
          reasonCounts[log.reasonCode] = { count: 0, name: log.reason };
        }
        reasonCounts[log.reasonCode].count++;
      });
      
      let mostCommonReason = '';
      let mostCommonReasonCount = 0;
      Object.entries(reasonCounts).forEach(([code, data]) => {
        if (data.count > mostCommonReasonCount) {
          mostCommonReason = data.name;
          mostCommonReasonCount = data.count;
        }
      });
      
      const uniqueMachines = new Set(filteredLogs.map(log => log.machineId));
      
      // Calculate MTBF and MTTR (simplified)
      const resolvedLogs = filteredLogs.filter(log => log.status === 'resolved' && log.duration);
      const mtbf = resolvedLogs.length > 0 
        ? Math.round(resolvedLogs.reduce((sum, log) => sum + (log.duration || 0), 0) / resolvedLogs.length)
        : 0;
      const mttr = resolvedLogs.filter(log => log.reasonCategory === 'unplanned' || log.reasonCategory === 'maintenance').length > 0
        ? Math.round(resolvedLogs
            .filter(log => log.reasonCategory === 'unplanned' || log.reasonCategory === 'maintenance')
            .reduce((sum, log) => sum + (log.duration || 0), 0) / 
            resolvedLogs.filter(log => log.reasonCategory === 'unplanned' || log.reasonCategory === 'maintenance').length)
        : 0;
      
      // Calculate availability (simplified)
      const totalTime = 480; // 8-hour shift in minutes
      const availability = totalTime > 0 
        ? Math.round(((totalTime - totalDowntime) / totalTime) * 100 * 10) / 10
        : 0;
      
      // OEE Impact (simplified)
      const oeeImpact = totalTime > 0 
        ? Math.round((totalDowntime / totalTime) * 100 * 10) / 10
        : 0;
      
      // Downtime by category
      const categoryMap: Record<string, { duration: number; count: number }> = {};
      filteredLogs.forEach(log => {
        if (!categoryMap[log.reasonCategory]) {
          categoryMap[log.reasonCategory] = { duration: 0, count: 0 };
        }
        categoryMap[log.reasonCategory].duration += log.duration || 0;
        categoryMap[log.reasonCategory].count++;
      });
      
      const downtimeByCategory = Object.entries(categoryMap).map(([category, data]) => ({
        category: category.charAt(0).toUpperCase() + category.slice(1),
        duration: data.duration,
        count: data.count,
      }));
      
      // Downtime by machine
      const machineMap: Record<string, { machineId: string; machineName: string; duration: number; count: number }> = {};
      filteredLogs.forEach(log => {
        if (!machineMap[log.machineId]) {
          machineMap[log.machineId] = { 
            machineId: log.machineId, 
            machineName: log.machineName, 
            duration: 0, 
            count: 0 
          };
        }
        machineMap[log.machineId].duration += log.duration || 0;
        machineMap[log.machineId].count++;
      });
      
      const downtimeByMachine = Object.values(machineMap);
      
      return {
        totalDowntime,
        totalEvents,
        activeEvents,
        averageDuration: avgDuration,
        mostCommonReason,
        mostCommonReasonCount,
        machinesAffected: uniqueMachines.size,
        availability,
        mtbf,
        mttr,
        oeeImpact,
        downtimeByCategory,
        downtimeByMachine,
      };
    }
    
    const response = await api.get<DowntimeLogStats>('/downtime/logs/stats', { params: filters });
    return response.data;
  }

  static async getReasons() {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return [
        { id: '1', code: 'BRK-001', name: 'Break', category: 'break' },
        { id: '2', code: 'MNT-001', name: 'Maintenance', category: 'maintenance' },
        { id: '3', code: 'UNP-001', name: 'Unplanned', category: 'unplanned' },
        { id: '4', code: 'PLN-001', name: 'Planned', category: 'planned' },
        { id: '5', code: 'SET-001', name: 'Setup', category: 'setup' },
        { id: '6', code: 'QTY-001', name: 'Quality', category: 'quality' },
      ];
    }
    
    const response = await api.get('/downtime/reasons');
    return response.data;
  }
}