// src/components/layout/Sidebar/navigation.ts

import {
  HomeIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  ClockIcon,
  Squares2X2Icon,
  ChartBarIcon,
  ChartPieIcon,
  CheckCircleIcon,
  ChartBarSquareIcon,
  ServerIcon,
} from '@heroicons/react/24/outline';

export interface NavItem {
  id: string;
  label: string;
  path?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface NavSection {
  id: string;
  title: string;
  items: NavItem[];
}

export interface NavGroup {
  id: string;
  type: 'item' | 'section' | 'footer';
  data: NavItem | NavSection;
}

// Main Navigation Items
export const mainNavItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/dashboard',
    icon: HomeIcon,
  },
  {
    id: 'production-planning',
    label: 'Production Planning',
    path: '/production-planning',
    icon: ClipboardDocumentListIcon,
  },
  {
    id: 'monthly-planning',
    label: 'Monthly Planning',
    path: '/monthly-planning',
    icon: CalendarDaysIcon,
  },
  {
    id: 'production-log',
    label: 'Production Log',
    path: '/production-log',
    icon: DocumentTextIcon,
  },
  {
    id: 'downtime-log',
    label: 'Downtime Log',
    path: '/downtime-log',
    icon: ClockIcon,
  },
];

// Dashboard Section
export const dashboardSection: NavSection = {
  id: 'dashboards',
  title: 'DASHBOARDS',
  items: [
    {
      id: 'live-shopfloor',
      label: 'Live Shopfloor',
      path: '/live-shopfloor',
      icon: Squares2X2Icon,
    },
  ],
};

// Reports Section
export const reportsSection: NavSection = {
  id: 'reports',
  title: 'REPORTS',
  items: [
    {
      id: 'production-report',
      label: 'Production',
      path: '/reports/production',
      icon: ChartBarIcon,
    },
    {
      id: 'downtime-report',
      label: 'Downtime',
      path: '/reports/downtime',
      icon: ChartPieIcon,
    },
    {
      id: 'quality-report',
      label: 'Quality',
      path: '/reports/quality',
      icon: CheckCircleIcon,
    },
    {
      id: 'performance-report',
      label: 'Performance',
      path: '/reports/performance',
      icon: ChartBarSquareIcon,
    },
  ],
};

// Footer Item
export const footerItem: NavItem = {
  id: 'master-data',
  label: 'Master Data',
  path: '/master-data',
  icon: ServerIcon,
};

// Complete Navigation Structure
export const navigationStructure = {
  main: mainNavItems,
  sections: [dashboardSection, reportsSection],
  footer: footerItem,
};