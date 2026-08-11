export interface ApiResponse<T = any> {
  data: T;
  message: string;
  status: number;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
}
