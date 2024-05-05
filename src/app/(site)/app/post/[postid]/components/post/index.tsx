import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { Database } from "@/supabase/types";
import { PostOptions } from "./components/options";
import { LazyImage } from "@/components/feature/lazy-image";
import Link from "next/link";

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
    <article className="w-full h-full flex flex-col-reverse gap-2 items-start justify-end bg-neutral-200 dark:bg-neutral-900">
      <header className="flex flex-col items-start justify-center gap-2 w-full xl:min-w-64 min-w-full">
        <h3 className="w-full text-neutral-800 dark:text-neutral-300 font-bold text-2xl text-balance">
          {title}
        </h3>
        {postOwnerProfile && (
          <Link
            href={`/app/profile/${postOwnerProfile.username}`}
            className="w-full"
          >
            <section className="flex gap-2 w-full justify-start items-center">
              {postOwnerProfile.avatar_url ? (
                <LazyImage
                  src={postOwnerProfile.avatar_url}
                  alt={post.title}
                  className="w-12 h-12 rounded-full object-cover object-center flex-0"
                  skeletonClassName="w-12 h-12 rounded-full"
                  width={48}
                  height={48}
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-neutral-300" />
              )}
              <h3 className="text-neutral-800 dark:text-neutral-300 font-semibold text-xl">
                {postOwnerProfile.name}
              </h3>
            </section>
          </Link>
        )}
        <PostOptions
          post_id={post.id}
          doesUserOwnPost={doesUserOwnPost}
          image_url={post.asset_url}
        />
      </header>
      <LazyImage
        src={asset_url}
        alt={title}
        className="w-full h-full min-h-96 max-h-[1300px] object-cover object-center rounded-md"
        skeletonClassName="w-full h-96 rounded-md"
        skeletonBgColor={post.asset_color || undefined}
      />
    </article>
  );
}
