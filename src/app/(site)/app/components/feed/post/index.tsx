import { Heading } from "@/components/ui/typography/heading";
import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { Database } from "@/supabase/types";

export async function Post({
  post,
}: {
  post: Database["public"]["Tables"]["posts"]["Row"];
}) {
  const { title, profile_id, asset_url } = post;

  const supabase = getSuapabaseServerComponent();

  const { data: postOwnerProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", profile_id)
    .single();

  return (
    <article className="w-full h-full bg-neutral-200 border border-neutral-300">
      <header className="w-full flex flex-col items-start justify-center gap-4 px-5 py-5">
        {postOwnerProfile && (
          <section className="flex gap-4 w-full items-center justify-start">
            <img
              src={postOwnerProfile.avatar_url}
              className="w-14 h-14 rounded-full object-cover object-center"
            />
            <h3 className="text-neutral-700 font-medium text-xl">
              {postOwnerProfile.name}
            </h3>
          </section>
        )}
        <section>
          <h3 className="text-neutral-800 font-bold text-2xl">{title}</h3>
        </section>
      </header>
      <img
        src={asset_url}
        className="w-full h-full object-cover object-center"
      />
    </article>
  );
}
