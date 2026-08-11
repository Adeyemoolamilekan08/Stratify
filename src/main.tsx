// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { MobileProvider } from './context/MobileContext';
import { AuthProvider } from './context/AuthContext'; // ✅ Should now work
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <MobileProvider>
        <RouterProvider router={router} />
      </MobileProvider>
    </AuthProvider>
  </React.StrictMode>
);