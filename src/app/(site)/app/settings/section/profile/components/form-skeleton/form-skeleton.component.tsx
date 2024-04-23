import { Skeleton } from "@/components/ui/skeleton";

export function FormSkeleton() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <header className="relative w-full mb-16">
        <Skeleton className="w-full h-56 rounded-lg" />
        <Skeleton className="w-32 h-32 rounded-full absolute top-40 left-5" />
      </header>
      <div className="flex flex-col gap-1">
        <Skeleton className="w-28 h-3 rounded-lg" />
        <Skeleton className="w-full h-10 rounded-lg" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="w-28 h-3 rounded-lg" />
        <Skeleton className="w-full h-10 rounded-lg" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="w-28 h-3 rounded-lg" />
        <Skeleton className="w-full h-44 rounded-lg" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="w-28 h-3 rounded-lg" />
        <Skeleton className="w-full h-10 rounded-lg" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="w-28 h-3 rounded-lg" />
        <Skeleton className="w-full h-10 rounded-lg" />
      </div>
      <Skeleton className="w-full h-12 rounded-lg" />
    </div>
  );
}
