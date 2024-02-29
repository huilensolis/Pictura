import { LazyImage } from "@/components/feature/lazy-image";
import { ClientRouting } from "@/models/routing/client";
import { Database } from "@/supabase/types";
import Link from "next/link";

export function PostsGridRow({
  post,
  image,
  columnWidth,
}: {
  post: Database["public"]["Tables"]["posts"]["Row"];
  image: { width: number; height: number };
  columnWidth: number;
}) {
  const imageHeight = (image.height * columnWidth) / columnWidth;

  return (
    <li key={post.id} className={`flex w-full h-full py-2`}>
      <Link
        href={ClientRouting.post().page(JSON.stringify(post.id) || "")}
        className="w-full"
      >
        <LazyImage
          src={post.asset_url}
          alt={post.title}
          className="flex w-full h-auto rounded-md"
          skeletonClassName="w-full"
          skeletonStyle={{ height: imageHeight }}
        />
      </Link>
    </li>
  );
}
