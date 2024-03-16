import { useCallback, useEffect, useRef, useState } from "react";
import { PostsGridRow } from "./components/posts-grid-row";
import { PostsGridContainer } from "./components/posts-grid-container";
import { type Database } from "@/supabase/types";
import { type PostgrestSingleResponse } from "@supabase/supabase-js";
import { PostsGridSkeleton } from "./components/posts-grid-skeleton";

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
}: {
  onFetchNewPosts: TOnFetchNewPosts;
}) {
  const [columnWidth, setColumnWidth] = useState<number | null>(null);

  const containerRef = useRef<HTMLUListElement | null>(null);

  const setContainerRef = useCallback((node: HTMLUListElement) => {
    if (!node) return;

    calculateColumnWidth(node.offsetWidth);
    containerRef.current = node;
    return;
  }, []);

  function calculateColumnWidth(containerWidth: number) {
    if (typeof window === "undefined") return;

    if (containerWidth <= 0 || !containerWidth) return;

    const columnCount = window.innerWidth > 1024 ? 3 : 2;
    setColumnWidth((containerWidth - 8 * 2) / columnCount);
  }

  useEffect(() => {
    if (typeof window === "undefined") return;

    console.log("running use Effect");

    function eventListenerForWidthResize() {
      if (containerRef.current === null) return;
      calculateColumnWidth(containerRef.current.offsetWidth);
    }

    window.addEventListener("resize", eventListenerForWidthResize);

    return () =>
      window.removeEventListener("resize", eventListenerForWidthResize);
  }, []);

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
  const [page, setPage] = useState<number>(1);
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
            return; // this means there is been throwed an error because the request has been aborted
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
    <>
      <PostsGridContainer ref={setContainerRef}>
        {!isLoadingFirstTime && posts.length > 0 && columnWidth && (
          <>
            {posts.map((post, i) => (
              <PostsGridRow
                columnWidth={
                  columnWidth && !isNaN(columnWidth) ? columnWidth : 400
                }
                key={i}
                post={post}
              />
            ))}
            <div ref={lastItemRef} className="h-96 w-full" />
          </>
        )}
        {(isFetching || isLoadingFirstTime) && (
          <PostsGridSkeleton cuantity={32} />
        )}
      </PostsGridContainer>
    </>
  );
}
