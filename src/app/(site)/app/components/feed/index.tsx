"use client";

import { useSupabase } from "@/hooks/use-supabase";
import { PostsGrid } from "@/components/feature/posts-grid/posts-grid.component";
import { Database } from "@/supabase/types";

export function Feed({
  userId,
}: {
  userId: Database["public"]["Tables"]["users"]["Row"]["id"];
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
    return await supabase
      .from("posts")
      .select("*")
      .range(currentPage, currentPage + pageSize)
      .abortSignal(signal);
  }

  return <PostsGrid onFetchNewPosts={fetchNewPosts} userId={userId} />;
}
