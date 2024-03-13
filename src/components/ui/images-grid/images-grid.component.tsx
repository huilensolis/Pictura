import { useCallback, useEffect, useRef, useState } from "react";
import { TPostsGridItem } from "./images-grid.models";
import { ImagesGridRow } from "./components/image-grid-row";

export function ImagesGrid({
  posts,
  onFetchNewImages,
}: {
  posts: TPostsGridItem[];
  onFetchNewImages: () => void;
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

    const observer = new IntersectionObserver(
      onFetchNewImages,
      observerOptions,
    );

    observer.observe(lastElementRef);

    return () => {
      observer.unobserve(lastElementRef);
    };
  }, [lastElementRef]);

  return (
    <ul
      className="break-inside-avoid gap-2 px-2 lg:[column-count:3] [column-count:2] w-full"
      ref={containerRef}
    >
      {posts.length > 0 && containerRef.current && (
        <>
          {posts.map((post, i) => (
            <ImagesGridRow
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
