import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function ProfileFormLoader() {
  return (
    <div className="col-span-2">
      <div className="space-y-4">
        <Skeleton className="h-8 w-40" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    </div>
  );
}
