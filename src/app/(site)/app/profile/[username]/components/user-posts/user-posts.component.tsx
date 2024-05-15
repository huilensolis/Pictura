"use client";

import { PostsGrid } from "@/components/feature/posts-grid/posts-grid.component";
import { useSupabase } from "@/hooks/use-supabase";
import { Database } from "@/supabase/types";

export function UserPosts({
  profileId,
  userId,
}: {
  profileId: string;
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
      .eq("profile_id", profileId)
      .order("created_at", { ascending: false })
      .range(currentPage, currentPage + pageSize)
      .abortSignal(signal);
  }

  return (
    <main className="w-full h-full flex flex-col gap-2">
      <PostsGrid onFetchNewPosts={fetchNewPosts} userId={userId} />
    </main>
  );
}
