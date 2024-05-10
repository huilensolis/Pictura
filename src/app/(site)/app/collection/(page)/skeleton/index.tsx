import { CollectionFolderSkeleton } from "@/components/feature/collection/skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function PageSkeleton() {
  return (
    <>
      <Skeleton className="w-44 h-9 rounded-md" />
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-28 h-6 rounded-sm" />
          <Skeleton className="w-56 h-[2.65rem] rounded-md" />
        </div>
        <div className="flex gap-2 items-center justify-center">
          <Skeleton className="w-8 h-8 rounded-md" />
          <Skeleton className="w-32 h-8 rounded-md" />
        </div>
      </div>
      <div>
        <ul className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 auto-rows-auto gap-4">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <li key={i}>
                <CollectionFolderSkeleton />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
