import axios from 'axios';

export const STRATIFY_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const stratifyApi = axios.create({
  baseURL: STRATIFY_API_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

export async function getDashboardSummary() {
  const { data } = await stratifyApi.get('/dashboard/summary');
  return data.data;
}

export async function getWorkOrders() {
  const { data } = await stratifyApi.get('/work-orders');
  return data.data;
}

export async function getInventoryBalances() {
  const { data } = await stratifyApi.get('/inventory/balances');
  return data.data;
}

export async function getInventoryLedger(itemId?: string) {
  const { data } = await stratifyApi.get('/inventory/ledger', { params: itemId ? { itemId } : undefined });
  return data.data;
}
