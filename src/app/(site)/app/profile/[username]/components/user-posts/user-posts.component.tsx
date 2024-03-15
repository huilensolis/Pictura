"use client";

import { PostsGrid } from "@/components/feature/posts-grid/posts-grid.component";
import { useSupabase } from "@/hooks/use-supabase";

export function UserPosts({ profileId }: { profileId: string }) {
  const { supabase } = useSupabase();

  async function fetchNewPosts({
    currentPage,
    signal,
    postsCuantity,
  }: {
    currentPage: number;
    signal: AbortSignal;
    postsCuantity: number;
  }) {
    return await supabase
      .from("posts")
      .select("*")
      .eq("profile_id", profileId)
      .order("created_at", { ascending: false })
      .limit(32)
      .range(currentPage, currentPage + postsCuantity)
      .abortSignal(signal);
  }

  return (
    <main className="w-full h-full flex flex-col gap-2">
      <PostsGrid onFetchNewPosts={fetchNewPosts} />
    </main>
  );
}
