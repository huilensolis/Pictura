import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { Post } from "./post";
import { Heading } from "@/components/ui/typography/heading";
import { Rabbit } from "lucide-react";

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

  const doPostsExist = !error && posts && posts.length >= 1;

  function getIfUserOwnsPost(post_user_id: string): boolean {
    if (errorGettingUser) return false;
    return Boolean(post_user_id === user?.id);
  }

  return (
    <main className="w-full h-full">
      {doPostsExist && (
        <ul className="flex flex-col">
          {posts.map((post) => (
            <li key={post.id} className="w-full h-full overflow-y-hidden">
              <Post
                post={post}
                doesUserOwnPost={getIfUserOwnsPost(post.user_id)}
              />
            </li>
          ))}
        </ul>
      )}
      {!posts && (
        <article className="flex items-center justify-center w-full max-h-96 py-16 text-center border-y border-neutral-300">
          <Heading level={7}>Something wen wrong, reload the page</Heading>
        </article>
      )}
      {posts && posts?.length === 0 && (
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
