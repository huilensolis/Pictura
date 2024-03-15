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
    postsCuantity,
  }: {
    currentPage: number;
    signal: AbortSignal;
    postsCuantity: number;
  }) {
    return supabase
      .from("posts")
      .select("*")
      .neq("id", excludedPostId)
      .order("title", { ascending: false })
      .range(currentPage, currentPage + postsCuantity)
      .abortSignal(signal);
  }

  return <PostsGrid onFetchNewPosts={fetchNewPosts} />;
}
