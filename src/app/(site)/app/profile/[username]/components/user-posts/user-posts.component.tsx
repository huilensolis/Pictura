"use client";

import { PostsGrid } from "@/components/feature/posts-grid/posts-grid.component";

export function UserPosts({ profileId }: { profileId: string }) {
  function handleScroll() {}

  return <PostsGrid posts={[]} onFetchNewPosts={handleScroll} />;
}
