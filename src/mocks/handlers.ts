// src/mocks/handlers.ts

import { http, HttpResponse } from 'msw';
import { mockPlans, mockEquipment, mockParts } from './data';

export const handlers = [
  // Get all plans with optional filters
  http.get('/api/production-planning', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    const status = url.searchParams.get('status');
    
    let filtered = mockPlans;
    
    if (search) {
      filtered = filtered.filter(p => 
        p.planNumber.includes(search) ||
        p.part.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (status) {
      filtered = filtered.filter(p => p.status === status);
    }
    
    return HttpResponse.json({
      data: filtered,
      total: filtered.length,
    });
  }),

  // Get single plan
  http.get('/api/production-planning/:id', ({ params }) => {
    const plan = mockPlans.find(p => p.id === params.id);
    if (!plan) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(plan);
  }),

  // Create plan
  http.post('/api/production-planning', async ({ request }) => {
    const body = await request.json();
    const newPlan = {
      ...body,
      id: `plan-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: false,
    };
    mockPlans.push(newPlan);
    return HttpResponse.json(newPlan, { status: 201 });
  }),

  // Update plan
  http.put('/api/production-planning/:id', async ({ params, request }) => {
    const body = await request.json();
    const index = mockPlans.findIndex(p => p.id === params.id);
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    mockPlans[index] = { ...mockPlans[index], ...body, updatedAt: new Date().toISOString() };
    return HttpResponse.json(mockPlans[index]);
  }),

  // Delete plan
  http.delete('/api/production-planning/:id', ({ params }) => {
    const index = mockPlans.findIndex(p => p.id === params.id);
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    mockPlans.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),

  // Toggle favorite
  http.post('/api/production-planning/:id/favorite', ({ params }) => {
    const plan = mockPlans.find(p => p.id === params.id);
    if (!plan) {
      return new HttpResponse(null, { status: 404 });
    }
    plan.isFavorite = !plan.isFavorite;
    return HttpResponse.json(plan);
  }),

  // Get equipment
  http.get('/api/equipment', () => {
    return HttpResponse.json(mockEquipment);
  }),

  // Get parts
  http.get('/api/parts', () => {
    return HttpResponse.json(mockParts);
  }),
];