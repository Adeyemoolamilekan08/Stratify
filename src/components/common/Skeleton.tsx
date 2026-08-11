import { cn } from '@utils/cn';

interface SkeletonProps {
  className?: string;
  count?: number;
}

export const Skeleton = ({ className, count = 1 }: SkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "animate-pulse bg-[#E5E7EB] rounded",
            className
          )}
        />
      ))}
    </>
  );
};

export const SkeletonCard = () => (
  <div className="stratify-card">
    <div className="flex justify-between items-start mb-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-16" />
    </div>
    <Skeleton className="h-3 w-full mb-2" />
    <Skeleton className="h-3 w-3/4 mb-3" />
    <div className="flex gap-2">
      <Skeleton className="h-6 w-12" />
      <Skeleton className="h-6 w-12" />
    </div>
  </div>
);

export const SkeletonTable = () => (
  <div className="stratify-card">
    <div className="flex justify-between mb-4">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-6 w-24" />
    </div>
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  </div>
);