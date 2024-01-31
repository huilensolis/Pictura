import { LazyImage } from "@/components/feature/lazy-image";
import { BackwardsNav } from "@/components/feature/nav/backwards";
import { Heading } from "@/components/ui/typography/heading";
import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import Link from "next/link";
import { Post } from "../../components/feed/post";
import { PostsGrid } from "@/components/feature/posts-grid";

export default async function PostPage({
  params: { postid },
}: {
  params: { postid: string };
}) {
  const supabase = getSuapabaseServerComponent();

  const { data: postData, error: postError } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postid)
    .single();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const doesUserOwnPost = Boolean(
    user && user.id && !error && user.id === postData?.user_id,
  );

  return (
    <div>
      {postData && !postError ? (
        <div className="flex flex-col gap-1">
          <nav className="w-full pt-4 pb-3 px-5 flex items-center gap-4">
            <BackwardsNav catchHref="/app" />
            <Heading level={9}>Back to feed</Heading>
          </nav>
          <Post post={postData} doesUserOwnPost={doesUserOwnPost} postHref="" />
          <RecentPosts />
        </div>
      ) : (
        <Error404Box />
      )}
    </div>
  );
}

async function RecentPosts() {
  const supabase = getSuapabaseServerComponent();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);
  return (
    <>
      {posts && !error && posts.length !== undefined && posts.length > 0 && (
        <PostsGrid posts={posts} />
      )}
    </>
  );
}

function Error404Box() {
  return (
    <div className="w-full p-5 border-y border-neutral-300 dark:border-cm-lighter-gray">
      <span className="text-neutral-800 dark:text-neutral-300">
        404 not found
      </span>
    </div>
  );
}
