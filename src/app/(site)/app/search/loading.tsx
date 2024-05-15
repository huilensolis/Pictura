import { PostsGridContainer } from "@/components/feature/posts-grid/components/posts-grid-container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="w-24 h-6 rounded-sm" />
        <Skeleton className="w-full h-10" />
      </div>
      <PostsGridContainer>
        {Array(32)
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
      </PostsGridContainer>
    </>
  );
}
