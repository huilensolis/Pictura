"use client";

import { useEffect, useRef, useState } from "react";
import { PostsGridRow } from "./components/post";
import { TPostsGridItem } from "./posts-grid.models";

export function PostsGrid({ posts }: { posts: TPostsGridItem[] }) {
  const [columnWidth, setColumnWidth] = useState<number | null>(null);

  const containerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function calculateColumnWidth() {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      if (containerWidth <= 0 || !containerWidth) return;

      const columnCount = window.innerWidth > 1024 ? 3 : 2;
      console.log(window.innerWidth);
      setColumnWidth((containerWidth - 8 * 2) / columnCount);
    }

    calculateColumnWidth();

    window.addEventListener("resize", calculateColumnWidth);

    return () => window.removeEventListener("resize", calculateColumnWidth);
  }, []);
  return (
    <ul
      className="break-inside-avoid gap-2 px-2 lg:[column-count:3] [column-count:2]"
      ref={containerRef}
    >
      {posts.length > 0 &&
        containerRef.current &&
        posts.map((post) => (
          <PostsGridRow
            columnWidth={columnWidth && !isNaN(columnWidth) ? columnWidth : 400}
            key={post.id}
            post={post}
          />
        ))}
    </ul>
  );
}
