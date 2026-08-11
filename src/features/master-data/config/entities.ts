// src/features/master-data/config/entities.ts

export interface MasterEntityConfig {
  id: string;
  title: string;
  breadcrumb: string[];
  icon?: any;
  endpoint: string;
  category: 'reasons' | 'assets' | 'people';
  route: string;
}

export const masterEntities: Record<string, MasterEntityConfig> = {
  downtime: {
    id: 'downtime',
    title: 'Downtime Reasons',
    breadcrumb: ['Master Data', 'Reasons', 'Downtime Reasons'],
    endpoint: 'reasons/downtime',
    category: 'reasons',
    route: 'reasons/downtime',
  },
  rejection: {
    id: 'rejection',
    title: 'Rejection Reasons',
    breadcrumb: ['Master Data', 'Reasons', 'Rejection Reasons'],
    endpoint: 'reasons/rejection',
    category: 'reasons',
    route: 'reasons/rejection',
  },
  rework: {
    id: 'rework',
    title: 'Rework Reasons',
    breadcrumb: ['Master Data', 'Reasons', 'Rework Reasons'],
    endpoint: 'reasons/rework',
    category: 'reasons',
    route: 'reasons/rework',
  },
  scrap: {
    id: 'scrap',
    title: 'Scrap Reasons',
    breadcrumb: ['Master Data', 'Reasons', 'Scrap Reasons'],
    endpoint: 'reasons/scrap',
    category: 'reasons',
    route: 'reasons/scrap',
  },
  machine: {
    id: 'machine',
    title: 'Machines',
    breadcrumb: ['Master Data', 'Assets', 'Machines'],
    endpoint: 'assets/machines',
    category: 'assets',
    route: 'assets/machines',
  },
  mold: {
    id: 'mold',
    title: 'Molds',
    breadcrumb: ['Master Data', 'Assets', 'Molds'],
    endpoint: 'assets/molds',
    category: 'assets',
    route: 'assets/molds',
  },
  color: {
    id: 'color',
    title: 'Colors',
    breadcrumb: ['Master Data', 'Assets', 'Colors'],
    endpoint: 'assets/colors',
    category: 'assets',
    route: 'assets/colors',
  },
  part: {
    id: 'part',
    title: 'Parts',
    breadcrumb: ['Master Data', 'Assets', 'Parts'],
    endpoint: 'assets/parts',
    category: 'assets',
    route: 'assets/parts',
  },
  partMatrix: {
    id: 'partMatrix',
    title: 'Part Matrix',
    breadcrumb: ['Master Data', 'Assets', 'Part Matrix'],
    endpoint: 'assets/part-matrix',
    category: 'assets',
    route: 'assets/part-matrix',
  },
  operator: {
    id: 'operator',
    title: 'Operators',
    breadcrumb: ['Master Data', 'People', 'Operators'],
    endpoint: 'people/operators',
    category: 'people',
    route: 'people/operators',
  },
};

export type MasterEntity = keyof typeof masterEntities;