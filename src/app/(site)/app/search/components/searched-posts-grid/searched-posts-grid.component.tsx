"use client";

import { PostsGrid } from "@/components/feature/posts-grid/posts-grid.component";
import { useSupabase } from "@/hooks/use-supabase";

export function SearchedPostsGrid({ searchValue }: { searchValue: string }) {
  if (!searchValue || searchValue.trim().length === 0) searchValue = "painting";

  const { supabase } = useSupabase();

  async function fetchNewPosts({
    signal,
    currentPage,
    postsCuantity,
  }: {
    currentPage: number;
    signal: AbortSignal;
    postsCuantity: number;
  }) {
    return await supabase
      .from("posts")
      .select("*")
      .ilike("title", `%${searchValue}%`)
      .order("created_at", { ascending: false })
      .range(currentPage, currentPage + postsCuantity)
      .abortSignal(signal);
  }

  return (
    <main className="w-full h-full flex flex-col gap-2">
      <PostsGrid onFetchNewPosts={fetchNewPosts} />
    </main>
  );
}
