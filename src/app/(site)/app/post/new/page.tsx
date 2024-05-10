import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { NewPostBox } from "./components/new-post-box";
import { redirect } from "next/navigation";
import { ClientRouting } from "@/models/routing/client";
import { Heading } from "@/components/ui/typography/heading";

export default async function newPostPage() {
  const supabase = getSuapabaseServerComponent();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) redirect(ClientRouting.auth.signIn);

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", session?.user.id);

  return (
    <>
      <Heading level={6}>New Post</Heading>
      <NewPostBox />
      {posts && (
        <span className="text-neutral-900 dark:text-neutral-50">
          Created {posts.length} posts of{" "}
          {Number(process.env.MAX_POSTS_PER_USER) || 24} limit
        </span>
      )}
    </>
  );
}
