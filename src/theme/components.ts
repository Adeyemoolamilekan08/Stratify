import { designSystem } from './design-system';

export const componentStyles = {
  button: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `${designSystem.spacing.sm} ${designSystem.spacing.lg}`,
      fontSize: designSystem.typography.size.sm,
      fontWeight: designSystem.typography.weight.medium,
      borderRadius: designSystem.radius.md,
      border: 'none',
      cursor: 'pointer',
      transition: `all ${designSystem.transitions.fast}`,
    },
    variants: {
      primary: {
        backgroundColor: designSystem.colors.primary.blue,
        color: designSystem.colors.text.white,
        hover: { backgroundColor: designSystem.colors.primary.blueDark },
      },
      outline: {
        backgroundColor: 'transparent',
        color: designSystem.colors.text.secondary,
        border: `1px solid ${designSystem.colors.border}`,
        hover: { backgroundColor: designSystem.colors.background },
      },
    },
  },
  card: {
    base: {
      backgroundColor: designSystem.colors.card,
      borderRadius: designSystem.radius.lg,
      border: `1px solid ${designSystem.colors.border}`,
      padding: designSystem.spacing.lg,
      boxShadow: designSystem.shadows.md,
    },
  },
  statusDot: {
    base: { width: '8px', height: '8px', borderRadius: designSystem.radius.full, display: 'inline-block' },
    variants: {
      running: { backgroundColor: designSystem.colors.machine.running },
      idle: { backgroundColor: designSystem.colors.machine.idle },
      offline: { backgroundColor: designSystem.colors.machine.offline },
      maintenance: { backgroundColor: designSystem.colors.machine.maintenance },
      setup: { backgroundColor: designSystem.colors.machine.setup },
    },
  },
};