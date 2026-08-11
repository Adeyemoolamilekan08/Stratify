import { api } from '../api/axios';

export class AuthService {
  static async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  }

  static async logout() {
    const response = await api.post('/auth/logout');
    return response.data;
  }

  static async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  }
}
