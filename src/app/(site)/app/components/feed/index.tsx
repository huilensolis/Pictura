import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { Post } from "./post";
import { Heading } from "@/components/ui/typography/heading";
import { Rabbit } from "lucide-react";
import Link from "next/link";
import { PostsGrid } from "@/components/feature/posts-grid";

export async function Feed() {
  const supabase = getSuapabaseServerComponent();

  const {
    data: { user },
    error: errorGettingUser,
  } = await supabase.auth.getUser();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  const doesPostsExist = !error && posts && posts.length >= 1;

  function getIfUserOwnsPost(post_user_id: string): boolean {
    if (errorGettingUser) return false;
    return Boolean(post_user_id === user?.id);
  }

  return (
    <main className="w-full h-full">
      {doesPostsExist && <PostsGrid posts={posts} />}
      {!doesPostsExist && (
        <article className="flex items-center justify-center w-full max-h-96 py-16 text-center border-y border-neutral-300">
          <Heading level={7}>Something wen wrong, reload the page</Heading>
        </article>
      )}
      {!doesPostsExist && posts?.length === 0 && (
        <article className="flex flex-col items-center justify-center w-full max-h-96 py-16 text-center border-y border-neutral-300">
          <Heading level={7}>This looks kinda empty.</Heading>
          <span className="text-center w-full text-neutral-600">
            Lets try to fill this empty space, posting some new Pixel arts on
            the box above
          </span>
          <Rabbit className="w-36 h-36 mt-2 text-neutral-700" />
        </article>
      )}
    </main>
  );
}
