"use client";

import { useEffect, useRef, useState } from "react";
import { PostsGridRow } from "./components/post";
import { TPostsGridItem } from "./posts-grid.models";

export function PostsGrid({ posts }: { posts: TPostsGridItem[] }) {
  const [columnWidth, setColumnWidth] = useState<number | null>(null);

  const containerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      if (containerWidth <= 0 || !containerWidth) return;

      setColumnWidth((containerWidth - 8 * 2) / 3);
    }
  }, []);

  return (
    <ul
      className="break-inside-avoid gap-2 px-2 [column-count:3] md:[column-count:3]"
      ref={containerRef}
    >
      {posts.length > 0 &&
        containerRef.current &&
        posts.map((post) => (
          <PostsGridRow
            columnWidth={columnWidth && !isNaN(columnWidth) ? columnWidth : 400}
            key={post.id}
            post={post}
            image={{
              width: post.imageWidth,
              height: post.imageHeight,
            }}
          />
        ))}
    </ul>
  );
}
