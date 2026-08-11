import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2F6BFF',
      light: '#EBF5FF',
      dark: '#1A5AEE',
    },
    secondary: {
      main: '#6B7280',
    },
    success: {
      main: '#31B86A',
    },
    warning: {
      main: '#F4A62A',
    },
    error: {
      main: '#EF5350',
    },
    background: {
      default: '#F6F8FB',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    fontSize: 11,
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

export { designSystem } from './design-system';
export { componentStyles } from './components';