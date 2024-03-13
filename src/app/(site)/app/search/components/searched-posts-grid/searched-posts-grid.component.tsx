"use client";

import { PostsGridSkeleton } from "@/components/feature/posts-grid/components/posts-grid-skeleton";
import { PostsGrid } from "@/components/feature/posts-grid/posts-grid.component";
import { Heading } from "@/components/ui/typography/heading";
import { useSupabase } from "@/hooks/use-supabase";
import { Database } from "@/supabase/types";
import { useEffect, useState } from "react";

export function SearchedPostsGrid({ searchValue }: { searchValue: string }) {
  const { supabase } = useSupabase();

  const [posts, setPosts] = useState<
    Database["public"]["Tables"]["posts"]["Row"][]
  >([]);

  const [error, setError] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const [lastPostIndex, setLastPostIndex] = useState<number>(1);

  const [notFound, setNotFound] = useState<boolean>(false);

  function getAndSetPosts({ signal }: { signal: AbortSignal }) {
    try {
      setIsLoading(true);
      setIsFetching(true);

      setNotFound(false);

      supabase
        .from("posts")
        .select("*")
        .like("title", `%${searchValue}%`)
        .order("created_at", { ascending: false })
        .range(lastPostIndex, lastPostIndex + 32)
        .abortSignal(signal)
        .limit(32)
        .then(({ data: posts, error }) => {
          if (error) return;

          if (!posts) return;

          if (posts.length === 0) {
            setNotFound(true);
            return;
          }
          setNotFound(false);

          setPosts((prev) => [...prev, ...posts]);
        });
    } catch (error: unknown) {
      if ((error as Error).name === "AbortError") return;

      setError(true);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    getAndSetPosts({ signal: controller.signal });

    return () => {
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastPostIndex]);

  useEffect(() => {
    const controller = new AbortController();

    if (isLoading || isFetching) return;

    setLastPostIndex(1);

    setPosts([]);

    getAndSetPosts({ signal: controller.signal });

    return () => {
      controller.abort();
    };
  }, [searchValue]);

  function handleScroll() {
    setLastPostIndex((prev) => prev + 32);
  }

  console.log({ isLoading, isFetching });

  return (
    <main className="w-full h-full flex flex-col gap-2">
      {isLoading && <PostsGridSkeleton cuantity={32} />}
      {!isLoading && !isFetching && (
        <>
          {!error ? (
            <div>
              <PostsGrid posts={posts} onFetchNewPosts={handleScroll} />
            </div>
          ) : (
            <article className="flex items-center justify-center w-full max-h-96 py-32 text-center">
              <Heading level={10}>
                Something wen wrong, please reload the page
              </Heading>
            </article>
          )}
        </>
      )}
      {notFound && posts.length === 0 && (
        <article className="flex items-center justify-center w-full max-h-96 py-32 text-center">
          <Heading level={10}>404 not found</Heading>
        </article>
      )}
    </main>
  );
}
