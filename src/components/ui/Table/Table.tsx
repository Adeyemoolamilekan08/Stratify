import { ReactNode } from 'react';
import { cn } from '@utils/cn';

interface TableProps {
  children: ReactNode;
  className?: string;
}

export const Table = ({ children, className }: TableProps) => {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full">{children}</table>
    </div>
  );
};

export const TableHead = ({ children, className }: TableProps) => {
  return <thead className={cn('bg-gray-50', className)}>{children}</thead>;
};

export const TableBody = ({ children, className }: TableProps) => {
  return <tbody className={cn('divide-y divide-gray-200', className)}>{children}</tbody>;
};

export const TableRow = ({ children, className }: TableProps) => {
  return <tr className={cn('hover:bg-gray-50 transition-colors', className)}>{children}</tr>;
};

export const TableHeader = ({ children, className }: TableProps) => {
  return (
    <th className={cn('px-4 py-3 text-left text-sm font-semibold text-gray-600', className)}>
      {children}
    </th>
  );
};

export const TableCell = ({ children, className }: TableProps) => {
  return <td className={cn('px-4 py-3 text-sm text-gray-900', className)}>{children}</td>;
};
