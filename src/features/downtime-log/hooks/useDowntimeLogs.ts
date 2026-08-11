import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { DowntimeLogService } from '../services/downtime-log.service';
import { CreateDowntimeLogDto, UpdateDowntimeLogDto, DowntimeLogFilters } from '../types/downtime-log.types';
import { useEffect, useState } from 'react';
import { productionLogWs } from '@features/production-log/services/production-log-ws.service';

export const downtimeLogKeys = {
  all: ['downtime-logs'] as const,
  lists: () => [...downtimeLogKeys.all, 'list'] as const,
  list: (filters: DowntimeLogFilters) => [...downtimeLogKeys.lists(), filters] as const,
  details: () => [...downtimeLogKeys.all, 'detail'] as const,
  detail: (id: string) => [...downtimeLogKeys.details(), id] as const,
  stats: (filters: DowntimeLogFilters) => [...downtimeLogKeys.all, 'stats', filters] as const,
};

export const useDowntimeLogs = (filters?: DowntimeLogFilters) => {
  const queryClient = useQueryClient();
  const [isLive, setIsLive] = useState(true);

  const query = useQuery({
    queryKey: downtimeLogKeys.list(filters || {}),
    queryFn: () => DowntimeLogService.getLogs(filters),
    staleTime: 30000,
    refetchInterval: isLive ? 10000 : false,
  });

  // WebSocket integration (reuse the same WebSocket connection)
  useEffect(() => {
    const handleNewDowntime = (data: any) => {
      if (data.type === 'new-downtime') {
        queryClient.setQueryData(
          downtimeLogKeys.list(filters || {}),
          (oldData: any) => {
            if (!oldData) return [data.payload];
            return [data.payload, ...oldData];
          }
        );
      }
    };

    productionLogWs.on('new-downtime', handleNewDowntime);

    return () => {
      productionLogWs.off('new-downtime');
    };
  }, [queryClient, filters]);

  return {
    ...query,
    isLive,
    setIsLive,
    toggleLive: () => setIsLive(!isLive),
  };
};

export const useDowntimeLogStats = (filters?: DowntimeLogFilters) => {
  return useQuery({
    queryKey: downtimeLogKeys.stats(filters || {}),
    queryFn: () => DowntimeLogService.getStats(filters),
    staleTime: 30000,
    refetchInterval: 10000,
  });
};

export const useCreateDowntimeLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDowntimeLogDto) => 
      DowntimeLogService.createLog(data),
    onSuccess: (data) => {
      toast.success('Downtime log created successfully!');
      queryClient.invalidateQueries({ queryKey: downtimeLogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: downtimeLogKeys.stats({}) });
      
      productionLogWs.send({
        type: 'new-downtime',
        payload: data
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create downtime log');
    },
  });
};

export const useUpdateDowntimeLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDowntimeLogDto }) =>
      DowntimeLogService.updateLog(id, data),
    onSuccess: (data) => {
      toast.success('Downtime log updated successfully!');
      queryClient.invalidateQueries({ queryKey: downtimeLogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: downtimeLogKeys.stats({}) });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update downtime log');
    },
  });
};

export const useResolveDowntimeLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, endTime }: { id: string; endTime: Date }) =>
      DowntimeLogService.resolveLog(id, endTime),
    onSuccess: (data) => {
      toast.success('Downtime resolved successfully!');
      queryClient.invalidateQueries({ queryKey: downtimeLogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: downtimeLogKeys.stats({}) });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to resolve downtime');
    },
  });
};

export const useDeleteDowntimeLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => DowntimeLogService.deleteLog(id),
    onSuccess: () => {
      toast.success('Downtime log deleted successfully!');
      queryClient.invalidateQueries({ queryKey: downtimeLogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: downtimeLogKeys.stats({}) });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete downtime log');
    },
  });
};