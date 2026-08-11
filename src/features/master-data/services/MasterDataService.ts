// src/features/master-data/services/masterDataService.ts

import { MasterEntity } from '../config/entities';
import { masterEntities } from '../config/entities';

const API_BASE = '/api/master';

export const masterDataService = {
  get: async <T = any>(entity: MasterEntity, params?: any): Promise<{ data: T[]; total: number }> => {
    const config = masterEntities[entity];
    const endpoint = config.endpoint;
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    const response = await fetch(`${API_BASE}/${endpoint}${queryString}`);
    return response.json();
  },

  getById: async <T = any>(entity: MasterEntity, id: string): Promise<T> => {
    const config = masterEntities[entity];
    const response = await fetch(`${API_BASE}/${config.endpoint}/${id}`);
    return response.json();
  },

  create: async <T = any>(entity: MasterEntity, data: any): Promise<T> => {
    const config = masterEntities[entity];
    const response = await fetch(`${API_BASE}/${config.endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  },

  update: async <T = any>(entity: MasterEntity, id: string, data: any): Promise<T> => {
    const config = masterEntities[entity];
    const response = await fetch(`${API_BASE}/${config.endpoint}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  },

  delete: async (entity: MasterEntity, id: string): Promise<void> => {
    const config = masterEntities[entity];
    await fetch(`${API_BASE}/${config.endpoint}/${id}`, {
      method: 'DELETE',
    });
  },

  bulkDelete: async (entity: MasterEntity, ids: string[]): Promise<void> => {
    const config = masterEntities[entity];
    await fetch(`${API_BASE}/${config.endpoint}/bulk-delete`, {
      method: 'POST',
      body: JSON.stringify({ ids }),
      headers: { 'Content-Type': 'application/json' },
    });
  },

  export: async (entity: MasterEntity, params?: any): Promise<Blob> => {
    const config = masterEntities[entity];
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    const response = await fetch(`${API_BASE}/${config.endpoint}/export${queryString}`);
    return response.blob();
  },

  import: async (entity: MasterEntity, file: File): Promise<any> => {
    const config = masterEntities[entity];
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_BASE}/${config.endpoint}/import`, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  },

  downloadSample: async (entity: MasterEntity): Promise<Blob> => {
    const config = masterEntities[entity];
    const response = await fetch(`${API_BASE}/${config.endpoint}/sample`);
    return response.blob();
  },
};