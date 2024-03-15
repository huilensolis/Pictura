"use client";

import { PostsGrid } from "@/components/feature/posts-grid/posts-grid.component";
import { useSupabase } from "@/hooks/use-supabase";

export function SearchedPostsGrid({ searchValue }: { searchValue: string }) {
  if (!searchValue || searchValue.trim().length === 0) searchValue = "painting";

  const { supabase } = useSupabase();

  async function fetchNewPosts({
    signal,
    currentPage,
    pageSize,
  }: {
    currentPage: number;
    signal: AbortSignal;
    pageSize: number;
  }) {
    return await supabase
      .from("posts")
      .select("*")
      .ilike("title", `%${searchValue}%`)
      .order("created_at", { ascending: false })
      .range(currentPage, currentPage + pageSize)
      .abortSignal(signal);
  }

  return (
    <main className="w-full h-full flex flex-col gap-2">
      <PostsGrid onFetchNewPosts={fetchNewPosts} />
    </main>
  );
}
