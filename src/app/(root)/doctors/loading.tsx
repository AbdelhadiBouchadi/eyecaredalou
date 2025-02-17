import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div>
      <Skeleton className="h-8 w-48 mb-8" />

      <Skeleton className="h-32 w-full" />

      <Skeleton className="h-[600px] w-full mt-8" />
    </div>
  );
}
