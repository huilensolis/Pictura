import { PostsGridContainer } from "@/components/feature/posts-grid/components/posts-grid-container";
import { PostsGridSkeleton } from "@/components/feature/posts-grid/components/posts-grid-skeleton";
import { UserCardSkeleton } from "@/components/feature/user-card/skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div>
        <div className="w-full flex items-center gap-4 pb-2">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-8 w-32 rounded-md" />
        </div>
        <Skeleton className="w-full h-[1px] rounded-sm" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-[75vh] rounded-md" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-60 h-8 rounded-md" />
          <UserCardSkeleton />
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Skeleton className="h-10 w-10 rounded-sm" />
              <Skeleton className="h-10 w-10 rounded-sm" />
              <Skeleton className="h-10 w-10 rounded-sm" />
            </div>
            <Skeleton className="w-52 h-10 rounded-sm" />
          </div>
        </div>
      </div>
      <PostsGridContainer>
        <PostsGridSkeleton />
      </PostsGridContainer>
    </>
  );
}
