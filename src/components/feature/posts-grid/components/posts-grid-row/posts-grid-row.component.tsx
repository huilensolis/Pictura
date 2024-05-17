"use client";

import Link from "next/link";
import { ClientRouting } from "@/models/routing/client";
import { Database } from "@/supabase/types";
import { LazyImage } from "@/components/feature/lazy-image";
import { PostRowFooter } from "../post-row-footer";
import { useCallback, useState } from "react";

export function PostsGridRow({
  post,
  collection,
  userId,
}: {
  post: Database["public"]["Tables"]["posts"]["Row"];
  collection?: Database["public"]["Tables"]["collection"]["Row"];
  userId: Database["public"]["Tables"]["users"]["Row"]["id"];
}) {
  const [columnWidth, setColumnWidth] = useState(0);

  const column = useCallback((node: HTMLLIElement) => {
    if (node) {
      setColumnWidth(node.offsetWidth);
    }
  }, []);

  return (
    <li className="w-full mb-6 rounded-md flex flex-col gap-1" ref={column}>
      <Link
        href={ClientRouting.post().page(post.id)}
        className="w-full rounded-md"
      >
        <LazyImage
          src={post.asset_url}
          alt={post.title}
          width={columnWidth}
          height={(post.asset_height / post.asset_width) * columnWidth}
          className="flex w-full h-full rounded-md object-cover object-center"
          skeletonClassName="w-full h-full rounded-md"
          skeletonBgColor={post.asset_color || undefined}
        />
      </Link>
      <PostRowFooter collection={collection} userId={userId} post={post} />
    </li>
  );
}
