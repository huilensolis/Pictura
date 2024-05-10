import { PostsGridContainer } from "@/components/feature/posts-grid/components/posts-grid-container";
import { PostsGridSkeleton } from "@/components/feature/posts-grid/components/posts-grid-skeleton";
import { UserCardSkeleton } from "@/components/feature/user-card/skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="md:grid md:grid-cols-2 flex flex-col gap-4 w-full max-w-3xl">
        <Skeleton className="h-60 w-full rounded-sm" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-60 rounded-sm" />
          <Skeleton className="h-6 w-10/12 rounded-sm" />
          <UserCardSkeleton />
        </div>
      </div>
      <PostsGridContainer>
        <PostsGridSkeleton />
      </PostsGridContainer>
    </>
  );
}
