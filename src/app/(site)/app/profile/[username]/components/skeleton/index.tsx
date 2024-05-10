import { PostsGridContainer } from "@/components/feature/posts-grid/components/posts-grid-container";
import { PostsGridSkeleton } from "@/components/feature/posts-grid/components/posts-grid-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function UserProfileSkeleton() {
  return (
    <>
      <div className="flex items-center gap-2">
        <Skeleton className="w-10 h-10 rounded-md" />
        <Skeleton className="h-10 w-28 rounded-md" />
      </div>
      <header className="relative w-full mb-10">
        <Skeleton className="w-full h-56 rounded-md" />
        <Skeleton className="w-32 h-32 rounded-full absolute left-8 -bottom-10" />
      </header>
      <header className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <Skeleton className="w-32 h-5 rounded-sm" />
          <Skeleton className="w-28 h-4 rounded-sm" />
        </div>
        <Skeleton className="w-4/12 h-3 rounded-sm" />
        <Skeleton className="w-3/12 h-3 rounded-sm" />
        <Skeleton className="w-5/12 h-3 rounded-sm" />
      </header>
      <div className="flex gap-4">
        <Skeleton className="w-48 h-5 rounded-md" />
        <Skeleton className="w-48 h-5 rounded-md" />
        <Skeleton className="w-48 h-5 rounded-md" />
      </div>
      <PostsGridContainer>
        <PostsGridSkeleton />
      </PostsGridContainer>
    </>
  );
}
