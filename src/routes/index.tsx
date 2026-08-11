// src/routes/index.tsx

import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@components/layout/DashboardLayout';

// Lazy load pages
const Login = lazy(() => import('@features/auth/pages/Login'));
const Dashboard = lazy(() => import('@features/dashboard/pages/Dashboard'));

// Production
const ProductionPlanning = lazy(() => import('@features/production-planning/pages/ProductionPlanning'));

// Production Log
const ProductionLog = lazy(() => import('@features/production-log/pages/ProductionLogPage'));
const ProductionLogSettings = lazy(() => import('@features/production-log/pages/ProductionLogSettings'));

// Downtime
const DowntimeLog = lazy(() => import('@features/downtime-log/pages/DowntimeLog'));

// Dashboards
const LiveShopfloor = lazy(() => import('@features/live-shopfloor/pages/LiveShopfloor'));

// Reports
const ProductionReport = lazy(() => import('@features/reports/pages/ProductionReport'));
const DowntimeReport = lazy(() => import('@features/reports/pages/DowntimeReport'));
const QualityReport = lazy(() => import('@features/reports/pages/QualityReport'));
const PerformanceReport = lazy(() => import('@features/reports/pages/PerformanceReport'));

// Monthly Planning
const MonthlyPlanning = lazy(() => import('@features/monthly-planning/MonthlyPlanning'));

// Profile
const ProfileSettings = lazy(() => import('@features/profile/pages/ProfileSettings'));

// Master Data
const MasterDataLayout = lazy(() => import('@features/master-data/MasterDataLayout'));

const ColorPage = lazy(() => import('@features/master-data/pages/ColorPage'));
const MachinePage = lazy(() => import('@features/master-data/pages/MachinePage'));
const MoldPage = lazy(() => import('@features/master-data/pages/MoldPage'));
const PartPage = lazy(() => import('@features/master-data/pages/PartPage'));
const PartMatrixPage = lazy(() => import('@features/master-data/pages/PartMatrixPage'));
const OperatorPage = lazy(() => import('@features/master-data/pages/OperatorPage'));
const DowntimePage = lazy(() => import('@features/master-data/pages/DowntimePage'));
const RejectionPage = lazy(() => import('@features/master-data/pages/RejectionPage'));
const ReworkPage = lazy(() => import('@features/master-data/pages/ReworkPage'));
const ScrapPage = lazy(() => import('@features/master-data/pages/ScrapPage'));

const PageLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-8 h-8 border-4 border-[#2F6BFF] border-t-transparent rounded-full animate-spin" />
  </div>
);

export const router = createBrowserRouter(
  [
    {
      path: '/login',
      element: <Suspense fallback={<PageLoader />}><Login /></Suspense>,
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        // Dashboard - Main landing page
        { index: true, element: <Suspense fallback={<PageLoader />}><Dashboard /></Suspense> },
        { path: 'home', element: <Suspense fallback={<PageLoader />}><Dashboard /></Suspense> },
        { path: 'dashboard', element: <Suspense fallback={<PageLoader />}><Dashboard /></Suspense> },
        
        // Production
        { path: 'monthly-planning', element: <Suspense fallback={<PageLoader />}><MonthlyPlanning /></Suspense> },
        { path: 'production-planning', element: <Suspense fallback={<PageLoader />}><ProductionPlanning /></Suspense> },
        { path: 'production-planning/plan', element: <Suspense fallback={<PageLoader />}><ProductionPlanning /></Suspense> },
        { path: 'production-planning/reorder', element: <Suspense fallback={<PageLoader />}><ProductionPlanning /></Suspense> },
        { path: 'production-planning/plan/:planId', element: <Suspense fallback={<PageLoader />}><ProductionPlanning /></Suspense> },
        { path: 'production-log', element: <Suspense fallback={<PageLoader />}><ProductionLog /></Suspense> },
        { path: 'production-log/settings', element: <Suspense fallback={<PageLoader />}><ProductionLogSettings /></Suspense> },
        { path: 'downtime-log', element: <Suspense fallback={<PageLoader />}><DowntimeLog /></Suspense> },
        
        // Dashboards
        { path: 'live-shopfloor', element: <Suspense fallback={<PageLoader />}><LiveShopfloor /></Suspense> },
        
        // Reports
        { path: 'reports/production', element: <Suspense fallback={<PageLoader />}><ProductionReport /></Suspense> },
        { path: 'reports/downtime', element: <Suspense fallback={<PageLoader />}><DowntimeReport /></Suspense> },
        { path: 'reports/quality', element: <Suspense fallback={<PageLoader />}><QualityReport /></Suspense> },
        { path: 'reports/performance', element: <Suspense fallback={<PageLoader />}><PerformanceReport /></Suspense> },
        
        // Profile
        { path: 'profile', element: <Suspense fallback={<PageLoader />}><ProfileSettings /></Suspense> },
        { path: 'profile/preferences', element: <Suspense fallback={<PageLoader />}><ProfileSettings /></Suspense> },
        { path: 'profile/password', element: <Suspense fallback={<PageLoader />}><ProfileSettings /></Suspense> },

        // Master Data
        {
          path: 'master-data',
          element: <Suspense fallback={<PageLoader />}><MasterDataLayout /></Suspense>,
          children: [
            { index: true, element: <Navigate to="/master-data/assets/colors" replace /> },
            
            // Reasons
            { path: 'reasons/downtime', element: <Suspense fallback={<PageLoader />}><DowntimePage /></Suspense> },
            { path: 'reasons/rejection', element: <Suspense fallback={<PageLoader />}><RejectionPage /></Suspense> },
            { path: 'reasons/rework', element: <Suspense fallback={<PageLoader />}><ReworkPage /></Suspense> },
            { path: 'reasons/scrap', element: <Suspense fallback={<PageLoader />}><ScrapPage /></Suspense> },
            
            // Assets
            { path: 'assets/colors', element: <Suspense fallback={<PageLoader />}><ColorPage /></Suspense> },
            { path: 'assets/machines', element: <Suspense fallback={<PageLoader />}><MachinePage /></Suspense> },
            { path: 'assets/molds', element: <Suspense fallback={<PageLoader />}><MoldPage /></Suspense> },
            { path: 'assets/parts', element: <Suspense fallback={<PageLoader />}><PartPage /></Suspense> },
            { path: 'assets/part-matrix', element: <Suspense fallback={<PageLoader />}><PartMatrixPage /></Suspense> },
            
            // People
            { path: 'people/operators', element: <Suspense fallback={<PageLoader />}><OperatorPage /></Suspense> },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);