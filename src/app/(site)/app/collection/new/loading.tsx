import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="h-9 w-56 rounded-sm" />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-6 w-20 rounded-sm" />
          <Skeleton className="h-10 w-full rounded-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-6 w-36 rounded-sm" />
          <Skeleton className="h-40 w-full rounded-md" />
        </div>
        <Skeleton className="w-full h-10 rounded-sm" />
      </div>
    </>
  );
}
