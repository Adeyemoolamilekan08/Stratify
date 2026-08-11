export type StatusType = 'success' | 'warning' | 'error' | 'info' | 'default';

export interface StatusConfig {
  label: string;
  color: StatusType;
  icon?: React.ReactNode;
}
