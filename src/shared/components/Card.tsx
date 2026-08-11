// src/shared/components/Card.tsx

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => (
  <div className={`bg-white rounded-[8px] border border-[#E6E6E6] shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-4 ${className}`}>
    {children}
  </div>
);