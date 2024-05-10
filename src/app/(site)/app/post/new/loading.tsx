import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="h-9 w-48 rounded-md" />
      <div className="flex gap-2 md:flex-row flex-col">
        <Skeleton className="w-96 h-[calc(340px+2.5rem+0.5rem)] rounded-md" />
        <div className="flex gap-2 flex-col">
          <Skeleton className="w-96 h-[340px] rounded-sm" />
          <Skeleton className="w-full h-10 rounded-sm" />
        </div>
      </div>
      <Skeleton className="w-60 h-6 rounded-sm" />
    </>
  );
}
