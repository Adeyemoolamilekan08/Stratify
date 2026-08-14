import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { router } from './routes';
import { theme } from './theme';
import { MobileProvider } from '@context/MobileContext';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const AppLoader = () => (
  <div className="flex items-center justify-center h-screen bg-[#F6F8FB]">
    <div className="w-10 h-10 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MobileProvider>
          <Suspense fallback={<AppLoader />}>
            <RouterProvider router={router} />
          </Suspense>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                iconTheme: {
                  primary: '#31B86A',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF5350',
                  secondary: '#fff',
                },
              },
            }}
          />
        </MobileProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;