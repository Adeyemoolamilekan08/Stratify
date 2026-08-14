// src/features/master-data/hooks/useMasterTable.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { masterDataService } from '../services/MasterDataService';
import { masterEntities, MasterEntity } from '../config/entities';
import { masterColumns } from '../config/columns';
import { masterForms } from '../config/forms';
import { getMasterPermissions } from '../config/permissions';

interface UseMasterTableOptions {
  page?: number;
  pageSize?: number;
  filters?: Record<string, any>;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

export const useMasterTable = (entity: MasterEntity, options: UseMasterTableOptions = {}) => {
  const queryClient = useQueryClient();
  const config = masterEntities[entity];
  const columns = masterColumns[entity];
  const formFields = masterForms[entity];
  
  // Get permissions from auth context (mock for now)
  const userPermissions: string[] = []; // From auth context
  const permissions = getMasterPermissions(entity, userPermissions);

  const {
    page = 1,
    pageSize = 20,
    filters = {},
    sortField = '',
    sortOrder = 'asc',
  } = options;

  // Query for data
  const query = useQuery({
    queryKey: ['master', entity, { page, pageSize, filters, sortField, sortOrder }],
    queryFn: () => masterDataService.get(entity, {
      page,
      pageSize,
      ...filters,
      sortField,
      sortOrder,
    }),
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: (data: any) => masterDataService.create(entity, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['master', entity] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      masterDataService.update(entity, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['master', entity] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => masterDataService.delete(entity, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['master', entity] });
    },
  });

  const bulkDeleteMutation = useMutation({
    mutationFn: (ids: string[]) => masterDataService.bulkDelete(entity, ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['master', entity] });
    },
  });

  const exportMutation = useMutation({
    mutationFn: (params?: any) => masterDataService.export(entity, params),
  });

  const importMutation = useMutation({
    mutationFn: (file: File) => masterDataService.import(entity, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['master', entity] });
    },
  });

  return {
    // Data
    data: query.data?.data || [],
    total: query.data?.total || 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,

    // Configuration
    config,
    columns,
    formFields,
    permissions,

    // Mutations
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    delete: deleteMutation.mutateAsync,
    bulkDelete: bulkDeleteMutation.mutateAsync,
    export: exportMutation.mutateAsync,
    import: importMutation.mutateAsync,
    downloadSample: () => masterDataService.downloadSample(entity),

    // Loading states
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isExporting: exportMutation.isPending,
    isImporting: importMutation.isPending,
  };
};