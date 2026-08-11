// src/features/production-log/utils/productionLogHelpers.ts

export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${minutes} ${ampm}`;
};

export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'running':
      return 'text-green-600 bg-green-100';
    case 'stopped':
      return 'text-red-600 bg-red-100';
    case 'idle':
      return 'text-yellow-600 bg-yellow-100';
    case 'maintenance':
      return 'text-blue-600 bg-blue-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export const getStatusLabel = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'running':
      return 'Running';
    case 'stopped':
      return 'Stopped';
    case 'idle':
      return 'Idle';
    case 'maintenance':
      return 'Maintenance';
    default:
      return status;
  }
};