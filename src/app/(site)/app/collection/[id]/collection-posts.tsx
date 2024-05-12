"use client";

import { PostsGrid } from "@/components/feature/posts-grid";
import { useSupabase } from "@/hooks/use-supabase";
import { Database } from "@/supabase/types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

type TPost = Database["public"]["Tables"]["posts"]["Row"];

type TOnFetchNewPostsProps = {
  currentPage: number;
  signal: AbortSignal;
  pageSize: number;
};

export function CollectionPosts({ collection_id }: { collection_id: number }) {
  const { supabase } = useSupabase();

  async function fetchCollectionPosts({
    pageSize,
    signal,
    currentPage,
  }: TOnFetchNewPostsProps): Promise<PostgrestSingleResponse<TPost[]>> {
    const { data: collectionItems } = await supabase
      .from("collection_item")
      .select("*")
      .eq("collection_id", collection_id);

    return await supabase
      .from("posts")
      .select("*")
      .range(currentPage, currentPage + pageSize)
      .filter(
        "id",
        "in",
        `(${
          collectionItems
            ? collectionItems.map((item) => `"${item.post_id}"`).join(",")
            : " "
        })`,
      )
      .abortSignal(signal);
  }

  return <PostsGrid onFetchNewPosts={fetchCollectionPosts} />;
}
