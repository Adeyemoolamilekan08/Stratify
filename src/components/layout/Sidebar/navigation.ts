import type React from 'react';
import {
  HomeIcon, ClipboardDocumentListIcon, CalendarDaysIcon, DocumentTextIcon, ClockIcon,
  Squares2X2Icon, ChartBarIcon, ChartPieIcon, CheckCircleIcon, ChartBarSquareIcon,
  ServerIcon, CubeIcon, ArchiveBoxIcon, WrenchScrewdriverIcon, BuildingOffice2Icon,
  Cog6ToothIcon, ClipboardIcon, BeakerIcon, ShieldCheckIcon, CircleStackIcon,
} from '@heroicons/react/24/outline';

export interface NavItem { id: string; label: string; path?: string; icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; }
export interface NavSection { id: string; title: string; items: NavItem[]; }

export const mainNavItems: NavItem[] = [
  { id: 'home', label: 'Home', path: '/dashboard', icon: HomeIcon },
  { id: 'production-planning', label: 'Production Planning', path: '/production-planning', icon: ClipboardDocumentListIcon },
  { id: 'monthly-planning', label: 'Monthly Planning', path: '/monthly-planning', icon: CalendarDaysIcon },
  { id: 'work-orders', label: 'Work Orders', path: '/work-orders', icon: ClipboardIcon },
  { id: 'production-log', label: 'Production Log / DPR', path: '/production-log', icon: DocumentTextIcon },
  { id: 'downtime-log', label: 'Downtime Log', path: '/downtime-log', icon: ClockIcon },
];

export const operationsSection: NavSection = {
  id: 'operations', title: 'OPERATIONS', items: [
    { id: 'live-shopfloor', label: 'Live Shopfloor', path: '/live-shopfloor', icon: Squares2X2Icon },
    { id: 'production-summary', label: 'Production WO Summary', path: '/production-summary', icon: ChartBarIcon },
    { id: 'boms', label: 'BOM Management', path: '/boms', icon: CubeIcon },
  ]
};

export const storesSection: NavSection = {
  id: 'stores', title: 'STORES & MATERIALS', items: [
    { id: 'inventory', label: 'Inventory & Ledger', path: '/inventory', icon: CircleStackIcon },
    { id: 'locations', label: 'Locations', path: '/locations', icon: BuildingOffice2Icon },
    { id: 'sfg', label: 'SFG Store', path: '/sfg', icon: ArchiveBoxIcon },
  ]
};

export const assemblySection: NavSection = {
  id: 'assembly', title: 'ASSEMBLY & FG', items: [
    { id: 'assembly', label: 'Assembly', path: '/assembly', icon: WrenchScrewdriverIcon },
    { id: 'fg-quarantine', label: 'FG Quarantine', path: '/fg-quarantine', icon: ShieldCheckIcon },
    { id: 'fg-store', label: 'FG Store', path: '/fg-store', icon: ArchiveBoxIcon },
    { id: 'grinding', label: 'Grinding', path: '/grinding', icon: Cog6ToothIcon },
    { id: 'regrind', label: 'Regrind', path: '/regrind', icon: BeakerIcon },
  ]
};

export const reportsSection: NavSection = {
  id: 'reports', title: 'REPORTS', items: [
    { id: 'production-report', label: 'Production', path: '/reports/production', icon: ChartBarIcon },
    { id: 'downtime-report', label: 'Downtime', path: '/reports/downtime', icon: ChartPieIcon },
    { id: 'quality-report', label: 'Quality', path: '/reports/quality', icon: CheckCircleIcon },
    { id: 'performance-report', label: 'Performance', path: '/reports/performance', icon: ChartBarSquareIcon },
  ]
};

export const footerItem: NavItem = { id: 'master-data', label: 'Master Data', path: '/master-data', icon: ServerIcon };

export const navigationStructure = {
  main: mainNavItems,
  sections: [operationsSection, storesSection, assemblySection, reportsSection],
  footer: footerItem,
};
