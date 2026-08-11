import { api } from '@services/api/axios';
import { MachineStatus, ShopfloorStats, LiveShopfloorFilters } from '../types/live-shopfloor.types';
import { initialMachines, mockShopfloorStats, simulateStatusChange } from './mock-data';

const USE_MOCK = true;
let currentMachines = [...initialMachines];

export class LiveShopfloorService {
  static async getMachines(filters?: LiveShopfloorFilters): Promise<MachineStatus[]> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let machines = [...currentMachines];
      
      if (filters?.shift) {
        machines = machines.filter(m => m.shift === filters.shift);
      }
      if (filters?.status) {
        machines = machines.filter(m => m.status === filters.status);
      }
      if (filters?.search) {
        const search = filters.search.toLowerCase();
        machines = machines.filter(m => 
          m.name.toLowerCase().includes(search) ||
          m.currentProduct?.toLowerCase().includes(search) ||
          m.operator?.toLowerCase().includes(search)
        );
      }
      
      return machines;
    }
    
    const response = await api.get<MachineStatus[]>('/live-shopfloor/machines', { params: filters });
    return response.data;
  }

  static async getStats(): Promise<ShopfloorStats> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const machines = currentMachines;
      const stats = {
        totalMachines: machines.length,
        operating: machines.filter(m => m.status === 'operating').length,
        stopped: machines.filter(m => m.status === 'stopped').length,
        idle: machines.filter(m => m.status === 'idle').length,
        maintenance: machines.filter(m => m.status === 'maintenance').length,
        setup: machines.filter(m => m.status === 'setup').length,
        overallEfficiency: machines
          .filter(m => m.efficiency !== undefined)
          .reduce((sum, m) => sum + (m.efficiency || 0), 0) / 
          machines.filter(m => m.efficiency !== undefined).length || 0,
        productionRate: machines
          .filter(m => m.productionRate !== undefined)
          .reduce((sum, m) => sum + (m.productionRate || 0), 0) / 
          machines.filter(m => m.productionRate !== undefined).length || 0,
        activeOperators: new Set(machines.filter(m => m.operator).map(m => m.operator)).size,
        shift: 'A',
        lastUpdated: new Date(),
      };
      
      return stats;
    }
    
    const response = await api.get<ShopfloorStats>('/live-shopfloor/stats');
    return response.data;
  }

  static async updateMachineStatus(id: string, status: string): Promise<MachineStatus> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 200));
      const index = currentMachines.findIndex(m => m.id === id);
      if (index === -1) throw new Error('Machine not found');
      
      currentMachines[index] = {
        ...currentMachines[index],
        status: status as any,
        lastUpdate: new Date(),
      };
      
      return currentMachines[index];
    }
    
    const response = await api.patch<MachineStatus>(`/live-shopfloor/machines/${id}`, { status });
    return response.data;
  }

  // Simulate real-time updates
  static async simulateRealTimeUpdate(): Promise<MachineStatus[]> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 100));
      currentMachines = simulateStatusChange(currentMachines);
      return currentMachines;
    }
    return [];
  }
}