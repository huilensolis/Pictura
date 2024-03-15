"use client";

import { PostsGrid } from "@/components/feature/posts-grid/posts-grid.component";
import { useSupabase } from "@/hooks/use-supabase";
import { Database } from "@/supabase/types";

export function RecentPosts({
  excludedPostId,
}: {
  excludedPostId: Database["public"]["Tables"]["posts"]["Row"]["id"];
}) {
  const { supabase } = useSupabase();

  async function fetchNewPosts({
    currentPage,
    signal,
    pageSize,
  }: {
    currentPage: number;
    signal: AbortSignal;
    pageSize: number;
  }) {
    return supabase
      .from("posts")
      .select("*")
      .neq("id", excludedPostId) // exclude the posts that has the id equal to excludedPostId
      .order("title", { ascending: false })
      .range(currentPage, currentPage + pageSize)
      .abortSignal(signal);
  }

  return <PostsGrid onFetchNewPosts={fetchNewPosts} />;
}
