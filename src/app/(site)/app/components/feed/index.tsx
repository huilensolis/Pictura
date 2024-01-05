import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { Post } from "./post";
import { Heading } from "@/components/ui/typography/heading";

export async function Feed() {
  const supabase = getSuapabaseServerComponent();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  const doPostsExist = !error && posts && posts.length >= 1;

  return (
    <main className="w-full h-full bg-orange-300">
      {doPostsExist && (
        <ul className="flex flex-col">
          {posts.map((post) => (
            <li
              key={post.id}
              className="w-full max-h-[50rem] overflow-y-hidden"
            >
              <Post post={post} />
            </li>
          ))}
        </ul>
      )}
      {!posts ||
        (posts?.length === 0 && (
          <article className="flex items-center justify-center w-full max-h-96">
            <Heading level={7}>Something wen wrong, reload the page</Heading>
          </article>
        ))}
    </main>
  );
}
