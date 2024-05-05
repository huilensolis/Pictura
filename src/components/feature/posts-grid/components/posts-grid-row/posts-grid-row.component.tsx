"use client";

import Link from "next/link";
import { ClientRouting } from "@/models/routing/client";
import { Database } from "@/supabase/types";
import { LazyImage } from "@/components/feature/lazy-image";

export function PostsGridRow({
  post,
  columnWidth,
}: {
  post: Database["public"]["Tables"]["posts"]["Row"];
  columnWidth: number;
}) {
  const imageHeight = (post.asset_height * columnWidth) / post.asset_width;
  return (
    <li
      className="inline-block w-full mb-2 rounded-md"
      style={{ width: columnWidth, height: imageHeight }}
    >
      <Link
        href={ClientRouting.post().page(post.id)}
        className="w-full rounded-md"
      >
        <LazyImage
          src={post.asset_url}
          alt={post.title}
          className="flex w-full h-full rounded-md object-cover object-center"
          height={Math.round(imageHeight)}
          width={Math.round(columnWidth)}
          skeletonClassName="w-full h-full rounded-md"
          skeletonBgColor={post.asset_color || undefined}
        />
      </Link>
    </li>
  );
}
