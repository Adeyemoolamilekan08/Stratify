import { api } from '../api/axios';

export class MachineService {
  static async getMachines(params?: any) {
    const response = await api.get('/machines', { params });
    return response.data;
  }

  static async getMachine(id: string) {
    const response = await api.get(/machines/);
    return response.data;
  }

  static async createMachine(data: any) {
    const response = await api.post('/machines', data);
    return response.data;
  }

  static async updateMachine(id: string, data: any) {
    const response = await api.put(/machines/, data);
    return response.data;
  }

  static async deleteMachine(id: string) {
    const response = await api.delete(/machines/);
    return response.data;
  }
}
