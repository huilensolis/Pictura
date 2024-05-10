import { Skeleton } from "@/components/ui/skeleton";

export function CollectionFolderSkeleton() {
  return (
    <div className="h-full w-full flex flex-col gap-2 border border-transparent rounded-md">
      <div>
        <Skeleton className="flex flex-wrap w-full h-52 rounded-t-md" />
      </div>
      <div className="p-3 flex flex-col justify-between gap-2 h-full flex-1">
        <Skeleton className="h-4 w-32 rounded-sm" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-10/12 rounded-sm" />
          <Skeleton className="h-4 w-8/12 rounded-sm" />
        </div>
        <div>
          <ul className="flex gap-2">
            {Array(3)
              .fill("")
              .map((_, i) => (
                <li key={i}>
                  <Skeleton className="h-10 w-10 rounded-sm" />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
