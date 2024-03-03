import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { NewPostBox } from "./components/new-post-box";
import { redirect } from "next/navigation";
import { ClientRouting } from "@/models/routing/client";

export default async function newPostPage() {
  const supabase = await getSuapabaseServerComponent();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) redirect(ClientRouting.auth.signIn);

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", session?.user.id);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <NewPostBox />
      {posts && (
        <span>
          Created {posts.length} posts of{" "}
          {Number(process.env.MAX_POSTS_PER_USER) || 24} limit
        </span>
      )}
    </div>
  );
}
