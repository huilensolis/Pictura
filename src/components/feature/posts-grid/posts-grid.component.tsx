import { useCallback, useEffect, useRef, useState } from "react";
import { TPostsGridItem } from "./posts-grid.models";
import { PostsGridRow } from "./components/posts-grid-row/posts-grid-row.component";

export function PostsGrid({
  posts,
  onFetchNewPosts,
}: {
  posts: TPostsGridItem[];
  onFetchNewPosts: () => void;
}) {
  const [columnWidth, setColumnWidth] = useState<number | null>(null);

  const containerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function calculateColumnWidth() {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      if (containerWidth <= 0 || !containerWidth) return;

      const columnCount = window.innerWidth > 1024 ? 3 : 2;
      setColumnWidth((containerWidth - 8 * 2) / columnCount);
    }

    calculateColumnWidth();

    window.addEventListener("resize", calculateColumnWidth);

    return () => window.removeEventListener("resize", calculateColumnWidth);
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

    const observer = new IntersectionObserver(onFetchNewPosts, observerOptions);

    observer.observe(lastElementRef);

    return () => {
      observer.unobserve(lastElementRef);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastElementRef]);

  return (
    <ul
      className="break-inside-avoid gap-2 px-2 lg:[column-count:3] [column-count:2] w-full"
      ref={containerRef}
    >
      {posts.length > 0 && containerRef.current && (
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
    </ul>
  );
}
