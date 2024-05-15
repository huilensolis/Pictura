import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { EditPostForm } from "./components/form";
import { LazyImage } from "@/components/feature/lazy-image";
import { Heading } from "@/components/ui/typography/heading";

export default async function EditPostPage({
  params: { postid },
}: {
  params: { postid: string };
}) {
  const supabase = getSuapabaseServerComponent();

  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postid)
    .single();

  if (!data) {
    return <p>we cuould not find any post here :(</p>;
  }

  return (
    <main className="flex justify-center w-full h-full">
      <div className="flex py-10 flex-col gap-2">
        <Heading level={6}>Edit Post</Heading>
        <div className="flex gap-2 justify-center items-cente">
          <LazyImage
            className="h-full object-cover object-center"
            alt={data.title}
            src={data.asset_url}
            skeletonBgColor={data.asset_color ?? undefined}
            skeletonClassName="w-96 h-96"
            width={384}
          />
          <EditPostForm post={data} />
        </div>
      </div>
    </main>
  );
}
