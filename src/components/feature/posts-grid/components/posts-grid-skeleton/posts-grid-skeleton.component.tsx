import { Skeleton } from "@/components/ui/skeleton";

export function PostsGridSkeleton({ cuantity = 16 }: { cuantity?: number }) {
  return (
    <>
      {Array(cuantity)
        .fill(" ")
        .map((_, i) => (
          <Skeleton
            key={i}
            className={`inline-block w-full mb-2 rounded-md transition-all animate-pulse duration-150`}
            style={{
              height: Math.min(
                Math.max(Math.round(Math.random() * 1000), 250),
                500,
              ),
            }}
          />
        ))}
    </>
  );
}
