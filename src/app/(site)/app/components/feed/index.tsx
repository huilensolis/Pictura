"use client";
import { useSupabase } from "@/hooks/use-supabase";
import { PostsGrid } from "@/components/feature/posts-grid/posts-grid.component";

export function Feed() {
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
      .limit(30)
      .range(currentPage, currentPage + postsCuantity)
      .abortSignal(signal);
  }

  return (
    <main className="w-full h-full flex flex-col gap-2">
      <PostsGrid onFetchNewPosts={fetchNewPosts} />
    </main>
  );
}
