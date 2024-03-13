"use client";

import { Heading } from "@/components/ui/typography/heading";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSupabase } from "@/hooks/use-supabase";
import { Database } from "@/supabase/types";
import { PostsGrid } from "@/components/feature/posts-grid/posts-grid.component";

export function Feed() {
  const { supabase } = useSupabase();

  const [posts, setPosts] = useState<
    Database["public"]["Tables"]["posts"]["Row"][]
  >([]);

  const [error, setError] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const [lastPostIndex, setLastPostIndex] = useState<number>(1);

  useEffect(() => {
    const controller = new AbortController();

    try {
      setIsLoading(true);
      setIsFetching(true);

      supabase
        .from("posts")
        .select("*")
        .order("id", { ascending: false })
        .limit(32)
        .range(lastPostIndex, lastPostIndex + 32)
        .abortSignal(controller.signal)
        .then(({ data: posts, error }) => {
          if (error) return;

          if (!posts) return;

          setPosts((prev) => [...prev, ...posts]);
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
    setLastPostIndex((prev) => prev + 32);
  }

  return (
    <main className="w-full h-full flex flex-col gap-2">
      {isLoading && (
        <ul className="break-inside-avoid gap-2 px-2 [column-count:3] md:[column-count:3]">
          {Array(16)
            .fill(" ")
            .map((_, i) => (
              <Skeleton key={i} className="w-full h-96 mb-2 rounded-sm" />
            ))}
        </ul>
      )}
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
    </main>
  );
}
