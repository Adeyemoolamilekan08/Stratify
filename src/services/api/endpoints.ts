export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    me: '/auth/me',
  },
  machines: {
    list: '/machines',
    get: (id: string) => /machines/,
    create: '/machines',
    update: (id: string) => /machines/,
    delete: (id: string) => /machines/,
    status: (id: string) => /machines//status,
  },
  production: {
    plans: '/production/plans',
    logs: '/production/logs',
  },
  downtime: {
    logs: '/downtime/logs',
    reasons: '/downtime/reasons',
  },
  reports: {
    production: '/reports/production',
    downtime: '/reports/downtime',
    quality: '/reports/quality',
    performance: '/reports/performance',
  },
};
