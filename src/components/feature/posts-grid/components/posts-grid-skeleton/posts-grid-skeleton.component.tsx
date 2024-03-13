import { Skeleton } from "@/components/ui/skeleton";
import { PostsGridContainer } from "../posts-grid-container";

export function PostsGridSkeleton({ cuantity = 16 }: { cuantity?: number }) {
  return (
    <PostsGridContainer>
      {Array(cuantity)
        .fill(" ")
        .map((_, i) => (
          <Skeleton key={i} className="w-full h-96 mb-2 rounded-sm" />
        ))}
    </PostsGridContainer>
  );
}
