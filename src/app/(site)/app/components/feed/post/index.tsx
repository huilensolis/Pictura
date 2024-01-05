import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { Database } from "@/supabase/types";
import { PostOptions } from "./components/options";

export async function Post({
  post,
  doesUserOwnPost,
}: {
  post: Database["public"]["Tables"]["posts"]["Row"];
  doesUserOwnPost: boolean;
}) {
  const { title, profile_id, asset_url } = post;

  const supabase = getSuapabaseServerComponent();

  const { data: postOwnerProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", profile_id)
    .single();

  return (
    <article className="w-full h-full bg-neutral-200 border border-neutral-300 overflow-hidden">
      <header className="flex items-center justify-between px-5 py-5">
        <section className="w-full flex flex-col items-start justify-center gap-4">
          {postOwnerProfile && (
            <section className="flex gap-4 w-full items-center justify-start">
              {postOwnerProfile.avatar_url ? (
                <img
                  src={postOwnerProfile.avatar_url}
                  className="w-14 h-14 rounded-full object-cover object-center"
                  alt={post.title}
                />
              ) : (
                <div className="h-14 w-14 rounded-full bg-neutral-300" />
              )}
              <h3 className="text-neutral-800 font-medium text-xl">
                {postOwnerProfile.name}
              </h3>
            </section>
          )}
        </section>
        <PostOptions post_id={post.id} doesUserOwnPost={doesUserOwnPost} />
      </header>
      <section className="px-5 pb-5">
        <h3 className="text-neutral-800 font-bold text-2xl">{title}</h3>
      </section>
      <img
        src={asset_url}
        className="w-full h-full object-cover object-center"
      />
    </article>
  );
}
