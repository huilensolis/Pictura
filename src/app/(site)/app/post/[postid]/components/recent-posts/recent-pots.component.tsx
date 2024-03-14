"use client";

import { PostsGridSkeleton } from "@/components/feature/posts-grid/components/posts-grid-skeleton";
import { PostsGrid } from "@/components/feature/posts-grid/posts-grid.component";
import { Heading } from "@/components/ui/typography/heading";
import { useSupabase } from "@/hooks/use-supabase";
import { Database } from "@/supabase/types";
import { useEffect, useState } from "react";

export function RecentPosts({
  excludedPostId,
}: {
  excludedPostId: Database["public"]["Tables"]["posts"]["Row"]["id"];
}) {
  const [posts, setPosts] = useState<
    Database["public"]["Tables"]["posts"]["Row"][]
  >([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const [lastPostIndex, setLastPostIndex] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);

  const { supabase } = useSupabase();

  useEffect(() => {
    const controller = new AbortController();

    try {
      setIsLoading(true);
      setIsFetching(true);

      supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(32)
        .range(lastPostIndex, lastPostIndex + 32)
        .abortSignal(controller.signal)
        .then(({ data: posts, error }) => {
          if (error) return;

          if (!posts) return;

          setPosts((prev) => [
            ...prev,
            ...posts.filter((post) => post.id !== excludedPostId),
          ]);
        });
    } catch (error: unknown) {
      if ((error as Error).name === "AbortError") return;

      setError(true);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }

    return () => {
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastPostIndex]);

  function handleScroll() {
    if (isLoading || isFetching) return;

    setLastPostIndex((prev) => prev + 32);
  }

  return (
    <section>
      {isLoading && <PostsGridSkeleton cuantity={32} />}
      {!isLoading && !isFetching && (
        <>
          {!error ? (
            <div>
              <PostsGrid posts={posts} onFetchNewPosts={handleScroll} />
            </div>
          ) : (
            <article className="flex items-center justify-center w-full max-h-96 py-32 text-center border-y border-neutral-300">
              <Heading level={10}>
                Something wen wrong, please reload the page
              </Heading>
            </article>
          )}
        </>
      )}
    </section>
  );
}
