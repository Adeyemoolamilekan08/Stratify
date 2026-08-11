import { api } from '../api/axios';

export class ProductionService {
  static async getPlans(params?: any) {
    const response = await api.get('/production/plans', { params });
    return response.data;
  }

  static async createPlan(data: any) {
    const response = await api.post('/production/plans', data);
    return response.data;
  }

  static async updatePlan(id: string, data: any) {
    const response = await api.put(`/production/plans/${id}`, data);
    return response.data;
  }

  static async deletePlan(id: string) {
    const response = await api.delete(`/production/plans/${id}`);
    return response.data;
  }

  static async getLogs(params?: any) {
    const response = await api.get('/production/logs', { params });
    return response.data;
  }
}
