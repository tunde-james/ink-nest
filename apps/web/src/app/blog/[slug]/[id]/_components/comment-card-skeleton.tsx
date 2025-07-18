import { Skeleton } from '@/components/ui/skeleton';

function CommentCardSkeleton() {
  return (
    <div className="p-2 shadow rounded flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Skeleton className="rounded-full h-12 w-12" />
        <Skeleton className="h-4 w-48" />
      </div>
      <Skeleton className="h-8 w-96" />
    </div>
  );
}

export default CommentCardSkeleton;
