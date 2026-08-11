import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { LiveShopfloorService } from '../services/live-shopfloor.service';
import { LiveShopfloorFilters } from '../types/live-shopfloor.types';
import { useEffect, useState } from 'react';

export const liveShopfloorKeys = {
  all: ['live-shopfloor'] as const,
  machines: (filters: LiveShopfloorFilters) => [...liveShopfloorKeys.all, 'machines', filters] as const,
  stats: () => [...liveShopfloorKeys.all, 'stats'] as const,
};

export const useLiveShopfloor = (filters?: LiveShopfloorFilters) => {
  const [isLive, setIsLive] = useState(true);

  const machinesQuery = useQuery({
    queryKey: liveShopfloorKeys.machines(filters || {}),
    queryFn: () => LiveShopfloorService.getMachines(filters),
    staleTime: 5000,
    refetchInterval: isLive ? 3000 : false, // Update every 3 seconds when live
  });

  const statsQuery = useQuery({
    queryKey: liveShopfloorKeys.stats(),
    queryFn: () => LiveShopfloorService.getStats(),
    staleTime: 5000,
    refetchInterval: isLive ? 3000 : false,
  });

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(async () => {
      await LiveShopfloorService.simulateRealTimeUpdate();
      machinesQuery.refetch();
      statsQuery.refetch();
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  return {
    machines: machinesQuery.data || [],
    stats: statsQuery.data,
    isLoading: machinesQuery.isLoading || statsQuery.isLoading,
    isLive,
    setIsLive,
    toggleLive: () => setIsLive(!isLive),
    refetch: () => {
      machinesQuery.refetch();
      statsQuery.refetch();
    },
  };
};

export const useUpdateMachineStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      LiveShopfloorService.updateMachineStatus(id, status),
    onSuccess: () => {
      toast.success('Machine status updated!');
      queryClient.invalidateQueries({ queryKey: liveShopfloorKeys.all });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update machine status');
    },
  });
};