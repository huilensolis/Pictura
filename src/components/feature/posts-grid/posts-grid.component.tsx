import { useCallback, useEffect, useState } from "react";
import { PostsGridRow } from "./components/posts-grid-row";
import { type Database } from "@/supabase/types";
import { type PostgrestSingleResponse } from "@supabase/supabase-js";
import { Skeleton } from "@/components/ui/skeleton";
import { PostsGridContainer } from "./components/posts-grid-container";

type TPost = Database["public"]["Tables"]["posts"]["Row"];

type TOnFetchNewPostsProps = {
  currentPage: number;
  signal: AbortSignal;
  pageSize: number;
};

const PAGE_SIZE = 30;

type TOnFetchNewPosts = ({
  pageSize,
  signal,
  currentPage,
}: TOnFetchNewPostsProps) => Promise<PostgrestSingleResponse<TPost[]>>;

export function PostsGrid({
  onFetchNewPosts,
  collectionId,
  userId,
}: {
  onFetchNewPosts: TOnFetchNewPosts;
  collectionId?: Database["public"]["Tables"]["collection"]["Row"]["id"];
  userId: Database["public"]["Tables"]["users"]["Row"]["id"];
}) {
  const [lastElementRef, setLastElementRef] = useState<HTMLDivElement | null>(
    null,
  );

  const lastItemRef = useCallback((node: HTMLDivElement) => {
    if (!node) return;

    setLastElementRef(node);
  }, []);

  useEffect(() => {
    if (!lastElementRef || typeof window === "undefined") return;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: `${window.innerHeight * 2}px`,
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleScroll, observerOptions);

    observer.observe(lastElementRef);

    return () => {
      observer.unobserve(lastElementRef);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastElementRef]);

  const [posts, setPosts] = useState<TPost[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isLoadingFirstTime, setIsLoadingFirstTime] = useState<boolean>(true);

  function handleScroll() {
    setPage((prev) => prev + 32);
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchNewPosts() {
      try {
        setIsFetching(true);
        const { data: newPosts, error } = await onFetchNewPosts({
          signal: controller.signal,
          currentPage: page,
          pageSize: PAGE_SIZE,
        });
        if (error) {
          if (error instanceof Error && error.message === "AbortError") {
            // error is caused by an abortcontroller abort signal
            return;
          }
          if (error.code === "20") {
            return; // this means there has been throwed an error because the request has been aborted
          }
          throw new Error("eror fetching new posts");
        }

        if (newPosts.length === 0) {
          setIsLastPage(true);
          return;
        }

        setPosts((prev) => [...prev, ...newPosts]);
        setIsLoadingFirstTime(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    }

    if (isFetching) return;
    if (isLastPage) return;

    fetchNewPosts();

    return () => {
      controller.abort();
    };
  }, [page]);

  return (
    <PostsGridContainer>
      {!isLoadingFirstTime &&
        posts.length > 0 &&
        posts.map((post, i) => (
          <PostsGridRow
            key={i}
            userId={userId}
            post={post}
            collectionId={collectionId}
          />
        ))}
      {!isLoadingFirstTime && posts.length > 0 && (
        <div ref={lastItemRef} className="h-96 w-full" />
      )}
      {isLoadingFirstTime &&
        Array(32)
          .fill(" ")
          .map((_, i) => (
            <Skeleton
              key={i}
              className={`inline-block w-full mb-2 rounded-md transition-all animate-pulse duration-150`}
              style={{
                height: Math.min(
                  Math.max(Math.round(Math.random() * 1000), 250),
                  500,
                ),
              }}
            />
          ))}
    </PostsGridContainer>
  );
}
