import { Skeleton } from "@/components/ui/skeleton";

export function PostsGridSkeleton({ cuantity = 16 }: { cuantity?: number }) {
  return (
    <>
      {Array(cuantity)
        .fill(" ")
        .map((_, i) => (
          <Skeleton key={i} className={`w-full h-96 mb-2 rounded-md`} />
        ))}
    </>
  );
}
