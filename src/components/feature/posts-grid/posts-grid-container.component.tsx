import { Database } from "@/supabase/types";
import { getImageDetails } from "@/services/images/get-details";
import { PostsGrid } from "./posts-grid.component";
import { TPostsGridItem } from "./posts-grid.models";

export async function PostsGridContainer({
  posts,
}: {
  posts: Database["public"]["Tables"]["posts"]["Row"][];
}) {
  const postsWithImageDetails = new Map<
    number,
    { width: number; height: number }
  >();
  console.log("start fetching");
  for await (const post of posts) {
    const { details } = await getImageDetails(post.asset_url);

    if (!details) continue;

    const { width, height } = details;

    postsWithImageDetails.set(post.id, { width, height });
  }
  console.log("end fetching");
  const postsWithDetails: TPostsGridItem[] = posts.map((post) => {
    const width = postsWithImageDetails.get(post.id)?.width;
    const height = postsWithImageDetails.get(post.id)?.height;

    return { ...post, imageHeight: height ?? 400, imageWidth: width ?? 400 };
  });

  return <PostsGrid posts={postsWithDetails} />;
}
