// src/features/master-data/routes.tsx

import { MasterDataLayout } from './MasterDataLayout';
import { ColorPage } from './pages/ColorPage';
// Import other pages as needed

export const masterDataRoutes = {
  path: 'master-data',
  element: <MasterDataLayout />,
  children: [
    { index: true, element: <Navigate to="/master-data/assets/colors" replace /> },
    { path: 'assets/colors', element: <ColorPage /> },
    // Add other routes as you create the pages
  ],
};