import { Skeleton } from "@/components/ui/skeleton";

export function CollectionListSkeleton() {
  return (
    <ul className="flex flex-col gap-1">
      {Array(3)
        .fill("")
        .map((_, i) => (
          <li key={i} className="flex gap-2">
            <Skeleton className="w-12 h-12 rounded-sm" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-48 rounded-sm" />
              <Skeleton className="h-2 w-40 rounded-sm" />
              <Skeleton className="h-2 w-36 rounded-sm" />
            </div>
          </li>
        ))}
    </ul>
  );
}
