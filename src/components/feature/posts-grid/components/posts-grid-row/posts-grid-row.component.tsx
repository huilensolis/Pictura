"use client";

import Link from "next/link";
import { LazyImage } from "@/components/feature/lazy-image";
import { ClientRouting } from "@/models/routing/client";
import { Database } from "@/supabase/types";

export function PostsGridRow({
  post,
  columnWidth,
}: {
  post: Database["public"]["Tables"]["posts"]["Row"];
  columnWidth: number;
}) {
  const imageHeight = (post.asset_height * columnWidth) / post.asset_width;
  return (
    <li className={`flex w-full h-full pt-2`}>
      <Link
        href={ClientRouting.post().page(JSON.stringify(post.id) || "")}
        className="w-full"
      >
        <LazyImage
          src={post.asset_url}
          alt={post.title}
          className="flex w-full h-auto rounded-md object-cover object-center"
          skeletonClassName="w-full h-full rounded-md"
          height={imageHeight}
          width={columnWidth}
          skeletonBgColor={post.asset_color || undefined}
        />
      </Link>
    </li>
  );
}
