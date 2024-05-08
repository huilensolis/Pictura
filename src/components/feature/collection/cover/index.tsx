"use client";

import { Database } from "@/supabase/types";
import { LazyImage } from "../../lazy-image";
import { Skeleton } from "@/components/ui/skeleton";
import { useSupabase } from "@/hooks/use-supabase";
import { useEffect, useState } from "react";

export function CollectionCover({
  collectionId,
}: {
  collectionId: Database["public"]["Tables"]["collection"]["Row"]["id"];
}) {
  const [collectionPosts, setCollectionPosts] = useState<
    Database["public"]["Tables"]["posts"]["Row"][]
  >([]);
  const { supabase } = useSupabase();

  useEffect(() => {
    async function getCollectionPosts({ signal }: { signal: AbortSignal }) {
      const { data: collectionItems } = await supabase
        .from("collection_item")
        .select("*")
        .limit(3)
        .eq("collection_id", collectionId)
        .abortSignal(signal);

      if (!collectionItems) return;

      const { data } = await supabase
        .from("posts")
        .select("*")
        .in(
          "id",
          collectionItems.map((item) => item.post_id),
        )
        .abortSignal(signal);

      if (data && data.length !== 0) {
        setCollectionPosts(data);
      }
    }

    const abortConstroller = new AbortController();
    getCollectionPosts({ signal: abortConstroller.signal });

    return () => {
      abortConstroller.abort();
    };
  }, []);

  return (
    <ul className="grid grid-cols-2 grid-rows-2 h-full w-full">
      {collectionPosts &&
        collectionPosts.length > 0 &&
        collectionPosts.map((post, i, posts) => (
          <li
            key={post.id}
            className={`${
              // if there are 2 posts, we make each image occupie 50%
              posts.length === 2
                ? "col-span-1 row-span-2"
                : // if there are 3 posts, we check for the index, the first image occupies 50% of the cols and 100% of the row, and the 2d and 3d img occupie 50% of the row and 50% of the col
                  posts.length === 3
                  ? `${
                      i === 0
                        ? "row-span-2 col-span-1"
                        : "row-span-1 col-span-1"
                    }`
                  : // if there are 1 image, we make the image occupie 100% the col and 100% the row
                    "col-span-2 row-span-2"
            }`}
          >
            <LazyImage
              src={post.asset_url}
              alt={post.title}
              className="w-full object-cover object-center h-full"
              skeletonBgColor={post.asset_color || undefined}
            />
          </li>
        ))}
      {!collectionPosts ||
        (collectionPosts.length === 0 && (
          <Skeleton className="w-full h-full row-span-2 col-span-2" />
        ))}
    </ul>
  );
}
