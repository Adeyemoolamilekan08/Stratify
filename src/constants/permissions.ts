// src/constants/permissions.ts

export const ROLES = {
  ADMIN: 'admin',
  SUPERVISOR: 'supervisor',
  OPERATOR: 'operator',
  VIEWER: 'viewer',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export const PERMISSIONS = {
  // Production Planning
  'production-planning:view': [ROLES.ADMIN, ROLES.SUPERVISOR, ROLES.OPERATOR, ROLES.VIEWER],
  'production-planning:create': [ROLES.ADMIN, ROLES.SUPERVISOR],
  'production-planning:edit': [ROLES.ADMIN, ROLES.SUPERVISOR],
  'production-planning:delete': [ROLES.ADMIN],
  'production-planning:reorder': [ROLES.ADMIN, ROLES.SUPERVISOR],
  'production-planning:favorite': [ROLES.ADMIN, ROLES.SUPERVISOR, ROLES.OPERATOR],
  'production-planning:export': [ROLES.ADMIN, ROLES.SUPERVISOR],

  // Production Log
  'production-log:view': [ROLES.ADMIN, ROLES.SUPERVISOR, ROLES.OPERATOR, ROLES.VIEWER],
  'production-log:create': [ROLES.ADMIN, ROLES.SUPERVISOR],
  'production-log:edit': [ROLES.ADMIN, ROLES.SUPERVISOR],

  // Downtime
  'downtime:view': [ROLES.ADMIN, ROLES.SUPERVISOR, ROLES.OPERATOR, ROLES.VIEWER],
  'downtime:create': [ROLES.ADMIN, ROLES.SUPERVISOR],
  'downtime:edit': [ROLES.ADMIN, ROLES.SUPERVISOR],

  // Master Data
  'master-data:view': [ROLES.ADMIN, ROLES.SUPERVISOR, ROLES.VIEWER],
  'master-data:create': [ROLES.ADMIN],
  'master-data:edit': [ROLES.ADMIN],
  'master-data:delete': [ROLES.ADMIN],
  'master-data:import': [ROLES.ADMIN],
  'master-data:export': [ROLES.ADMIN, ROLES.SUPERVISOR],

  // Reports
  'reports:view': [ROLES.ADMIN, ROLES.SUPERVISOR, ROLES.VIEWER],
  'reports:export': [ROLES.ADMIN, ROLES.SUPERVISOR],

  // Settings
  'settings:view': [ROLES.ADMIN, ROLES.SUPERVISOR],
  'settings:edit': [ROLES.ADMIN],
};

export type Permission = keyof typeof PERMISSIONS;

export const hasPermission = (role: Role, permission: Permission): boolean => {
  return PERMISSIONS[permission]?.includes(role) || false;
};

export const usePermission = (permission: Permission): boolean => {
  const { user } = useAuth();
  if (!user) return false;
  return hasPermission(user.role as Role, permission);
};