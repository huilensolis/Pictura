import { Database } from "@/supabase/types";
import { PostsGridRow } from "./components/post";

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
    <ul className="break-inside-avoid gap-2 px-2 [column-count:2] lg:[column-count:3]">
      {posts.length > 0 &&
        posts.map((post) => <PostsGridRow key={post.id} post={post} />)}
    </ul>
  );
}
