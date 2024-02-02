import { BackwardsNav } from "@/components/feature/nav/backwards";
import { Heading } from "@/components/ui/typography/heading";
import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { PostsGrid } from "@/components/feature/posts-grid";
import { Database } from "@/supabase/types";
import { Post } from "./components/post";

export default async function PostPage({
  params: { postid },
}: {
  params: { postid: string };
}) {
  const supabase = await getSuapabaseServerComponent();

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
      <div className="flex flex-col gap-1">
        <nav className="w-full pt-4 pb-3 px-5 flex items-center gap-4">
          <BackwardsNav catchHref="/app" />
          <Heading level={9}>Back</Heading>
        </nav>
        {postData && !postError ? (
          <>
            <Post
              post={postData}
              doesUserOwnPost={doesUserOwnPost}
              postHref=""
            />
            <RecentPosts excludePost={postData} />
          </>
        ) : (
          <Error404Box />
        )}
      </div>
    </div>
  );
}

async function RecentPosts({
  excludePost,
}: {
  excludePost: Database["public"]["Tables"]["posts"]["Row"];
}) {
  const supabase = await getSuapabaseServerComponent();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(9);

  if (!posts || posts.length === 0) return;

  const filteredPosts = posts.filter((post) => post.id !== excludePost.id);
  return (
    <>
      {!error &&
        filteredPosts.length !== undefined &&
        filteredPosts.length > 0 && <PostsGrid posts={filteredPosts} />}
    </>
  );
}

function Error404Box() {
  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center py-32 border-y border-neutral-300 dark:border-cm-lighter-gray">
      <span className="text-neutral-800 dark:text-neutral-300">
        404 not found
      </span>
      <p className="text-neutral-800 dark:text-neutral-300 ">
        we could not find this post, we are sorry : (
      </p>
    </div>
  );
}
