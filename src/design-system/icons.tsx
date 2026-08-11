// src/design-system/icons.tsx
//
// This file did not exist before. It's created to satisfy imports like:
//   import { AvatarIcon } from '@design-system/icons';
//   import { RefreshIcon, SyncIcon, HelpIcon } from '@design-system/icons';
// which were failing to resolve — there was no '@design-system' alias
// configured in vite.config.ts or tsconfig.json, AND this /icons module
// didn't exist under src/design-system. That unresolved import fails the
// whole Vite build, which is the most likely explanation for the app
// (sidebar included) coming up blank/broken in another environment.
//
// Icon shapes intentionally avoid arrow glyphs (circular-arrow "refresh/sync"
// icons), consistent with removing decorative arrows elsewhere in the app.

import type { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

function BaseIcon({ size = 16, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Small filled dot inside a ring — signals "sync" without an arrow glyph. */
export function SyncIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
    </BaseIcon>
  );
}

/** Two concentric rings — signals "refresh"/"reload" without an arrow glyph. */
export function RefreshIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
    </BaseIcon>
  );
}

/** Standard question-mark help icon. */
export function HelpIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 3.4 2.33c-.9.34-1.4 1.1-1.4 1.92v.25" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
    </BaseIcon>
  );
}

interface AvatarIconProps {
  initials: string;
  size?: number;
  className?: string;
}

/** Circular avatar showing a user's initials. */
export function AvatarIcon({ initials, size = 28, className = '' }: AvatarIconProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-[#1E3A8A] text-white font-semibold ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </span>
  );
}
