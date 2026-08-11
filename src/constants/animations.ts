// src/constants/animations.ts

export const ANIMATIONS = {
  // Duration
  duration: {
    instant: 0,
    fast: 100,
    base: 200,
    slow: 300,
    slower: 400,
  },
  
  // Easing
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    cubic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Presets
  presets: {
    fadeIn: {
      animation: 'fadeIn 200ms ease-out',
    },
    fadeOut: {
      animation: 'fadeOut 200ms ease-in',
    },
    slideIn: {
      animation: 'slideIn 300ms ease-out',
    },
    slideOut: {
      animation: 'slideOut 300ms ease-in',
    },
    scaleIn: {
      animation: 'scaleIn 200ms ease-out',
    },
    scaleOut: {
      animation: 'scaleOut 200ms ease-in',
    },
    shimmer: {
      animation: 'shimmer 1.5s ease-in-out infinite',
    },
  },
};