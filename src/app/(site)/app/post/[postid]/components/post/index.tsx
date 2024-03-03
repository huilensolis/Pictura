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

  const supabase = await getSuapabaseServerComponent();

  const { data: postOwnerProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", profile_id)
    .single();

  return (
    <article className="w-full h-full flex lg:gap-4 gap-2 flex-col-reverse lg:flex-row-reverse items-start justify-end bg-neutral-200 dark:bg-neutral-900 overflow-hidden">
      <header className="flex items-center justify-between w-96">
        <section className="w-full flex flex-col items-start justify-center gap-4">
          <PostOptions
            post_id={post.id}
            doesUserOwnPost={doesUserOwnPost}
            image_url={post.asset_url}
          />
          <h3 className="text-neutral-800 dark:text-neutral-300 font-bold text-2xl">
            {title}
          </h3>
          {postOwnerProfile && (
            <Link href={`/app/profile/${postOwnerProfile.username}`}>
              <section className="flex flex-none gap-4 w-full items-center justify-start">
                {postOwnerProfile.avatar_url ? (
                  <LazyImage
                    src={postOwnerProfile.avatar_url}
                    alt={post.title}
                    className="w-12 h-12 rounded-full object-cover object-center"
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
        </section>
      </header>
      <LazyImage
        src={asset_url}
        alt={title}
        className="w-full h-full max-h-[1200px] object-cover object-center rounded-md"
        skeletonClassName="w-full"
        height={post.asset_height}
      />
    </article>
  );
}
