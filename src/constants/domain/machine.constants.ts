export const MACHINE_STATUS = {
  RUNNING: 'running',
  IDLE: 'idle',
  OFFLINE: 'offline',
  MAINTENANCE: 'maintenance',
  SETUP: 'setup',
} as const;

export const MACHINE_STATUS_CONFIG = {
  running: { label: 'Running', color: 'success' },
  idle: { label: 'Idle', color: 'warning' },
  offline: { label: 'Offline', color: 'error' },
  maintenance: { label: 'Maintenance', color: 'info' },
  setup: { label: 'Setup', color: 'info' },
};
