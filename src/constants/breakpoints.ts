// src/constants/breakpoints.ts

export const BREAKPOINTS = {
  mobile: {
    min: 0,
    max: 479,
    label: 'Mobile',
    columns: 1,
  },
  tablet: {
    min: 480,
    max: 767,
    label: 'Tablet',
    columns: 2,
  },
  laptop: {
    min: 768,
    max: 1023,
    label: 'Laptop',
    columns: 3,
  },
  desktop: {
    min: 1024,
    max: 1279,
    label: 'Desktop',
    columns: 4,
  },
  wide: {
    min: 1280,
    max: 1919,
    label: 'Wide',
    columns: 5,
  },
  ultra: {
    min: 1920,
    max: Infinity,
    label: 'Ultra',
    columns: 6,
  },
};

export type Breakpoint = keyof typeof BREAKPOINTS;