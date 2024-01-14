import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { Database } from "@/supabase/types";
import { PostOptions } from "./components/options";
import { LazyImage } from "@/components/feature/lazy-image";

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
    <article className="w-full h-full bg-neutral-200 dark:bg-neutral-900 border-t border-neutral-300 dark:border-cm-lighter-gray overflow-hidden">
      <header className="flex items-center justify-between px-5 py-5">
        <section className="w-full flex flex-col items-start justify-center gap-4">
          {postOwnerProfile && (
            <section className="flex flex-none gap-4 w-full items-center justify-start">
              {postOwnerProfile.avatar_url ? (
                <LazyImage
                  src={postOwnerProfile.avatar_url}
                  alt={post.title}
                  className="w-12 h-12 rounded-full object-cover object-center"
                  skeletonClassName="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-neutral-300" />
              )}
              <h3 className="text-neutral-800 dark:text-neutral-300 font-semibold text-xl">
                {postOwnerProfile.name}
              </h3>
            </section>
          )}
        </section>
        <PostOptions post_id={post.id} doesUserOwnPost={doesUserOwnPost} />
      </header>
      <section className="px-5 pb-5">
        <h3 className="text-neutral-800 dark:text-neutral-300 font-bold text-2xl">
          {title}
        </h3>
      </section>
      <LazyImage
        src={asset_url}
        alt={title}
        className="w-full h-full object-cover object-center"
        skeletonClassName="w-full h-[500px]"
      />
    </article>
  );
}
