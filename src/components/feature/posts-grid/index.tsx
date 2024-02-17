import { Database } from "@/supabase/types";
import { LazyImage } from "../lazy-image";
import Link from "next/link";
import { ClientRouting } from "@/models/routing/client";

export function PostsGrid({
  posts,
  onFetchMorePosts,
}: {
  posts: Database["public"]["Tables"]["posts"]["Row"][];
  //
  // this is a callback that we are going to call when we do infinite scroll,
  // and we have reached to one of the lasts post, so we fetch new ones
  onFetchMorePosts?: () => Database["public"]["Tables"]["posts"]["Row"][];
}) {
  return (
    <ul className="grid xl:grid-cols-3 lg:grid-cols-3 grid-cols-2  grid-rows-[repeat(auto-fill,_minmax(1fr,_500px)] gap-2">
      {posts.length > 0 &&
        posts.map((post) => (
          <li
            key={post.id}
            className="w-full h-full flex rounded-md overflow-hidden"
          >
            <Link
              href={ClientRouting.post().page(JSON.stringify(post.id) || "")}
              className="w-full h-full"
            >
              <LazyImage
                src={post.asset_url}
                alt={post.title}
                className="w-full h-full object-cover object-center"
                skeletonClassName="w-full h-full"
              />
            </Link>
          </li>
        ))}
    </ul>
  );
}
