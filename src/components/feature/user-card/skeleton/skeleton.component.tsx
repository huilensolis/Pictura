import { Skeleton } from "@/components/ui/skeleton";

export function UserCardSkeleton() {
  return (
    <div className="flex gap-2 w-full">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex flex-col justify-between">
        <Skeleton className="w-20 h-5 rounded-sm" />
        <Skeleton className="w-32 h-5 rounded-sm" />
      </div>
    </div>
  );
}
