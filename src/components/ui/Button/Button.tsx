// src/components/ui/Button/Button.tsx

import React from 'react';
import { cn } from '@utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  size = 'sm',
  children,
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-[#2B6CB0] text-white hover:bg-[#2C5282]',
    secondary: 'bg-[#F7F8FA] text-[#4A5568] hover:bg-[#EDF2F7]',
    danger: 'bg-[#E53E3E] text-white hover:bg-[#C53030]',
    ghost: 'bg-transparent text-[#4A5568] hover:bg-[#EDF2F7]',
  };

  const sizes = {
    sm: 'h-5 px-2.5 text-[10px]',
    md: 'h-6 px-3 text-[11px]',
    lg: 'h-8 px-4 text-[12px]',
  };

  return (
    <button
      className={cn(
        'font-medium rounded-[2px] transition-colors flex items-center gap-1',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};