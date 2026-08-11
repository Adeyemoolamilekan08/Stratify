// src/features/dashboard/hooks/useDashboard.ts

import { useState, useEffect, useCallback } from 'react';
import { dashboardApi } from '../services/dashboardApi';
import { Shift, DashboardData } from '../types/dashboard';

export const useDashboard = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [selectedShiftId, setSelectedShiftId] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadShifts = useCallback(async () => {
    try {
      const result = await dashboardApi.getShifts();
      setShifts(result);
      if (!selectedShiftId && result.length > 0) {
        setSelectedShiftId(result[0].id);
      }
    } catch (err) {
      setError('Failed to load shifts');
    }
  }, []);

  const loadDashboardData = useCallback(async (shiftId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await dashboardApi.getDashboardData(shiftId);
      setData(result);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadShifts();
  }, []);

  useEffect(() => {
    if (selectedShiftId) {
      loadDashboardData(selectedShiftId);
    }
  }, [selectedShiftId]);

  const refresh = useCallback(() => {
    if (selectedShiftId) {
      loadDashboardData(selectedShiftId);
    }
  }, [selectedShiftId, loadDashboardData]);

  const refreshRow = useCallback(async (machine: string, plan: string) => {
    try {
      const updatedRow = await dashboardApi.refreshRow(machine, plan);
      // Update the row in the local data
      setData(prev => {
        if (!prev) return prev;
        const updatedGroups = prev.productionGroups.map(group => {
          if (group.machine === machine) {
            const updatedRows = group.rows.map(row => {
              if (row.plan === plan) {
                return updatedRow;
              }
              return row;
            });
            return { ...group, rows: updatedRows };
          }
          return group;
        });
        return { ...prev, productionGroups: updatedGroups };
      });
    } catch (err) {
      console.error('Failed to refresh row:', err);
    }
  }, []);

  return {
    shifts,
    selectedShiftId,
    setSelectedShiftId,
    data,
    loading,
    error,
    refresh,
    refreshRow,
  };
};