export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
}

export interface FilterParams extends PaginationParams {
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
  machineId?: string;
}
