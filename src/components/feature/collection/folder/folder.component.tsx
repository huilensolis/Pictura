import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { Database } from "@/supabase/types";
import { LazyImage } from "../../lazy-image";
import { Skeleton } from "@/components/ui/skeleton";
import { Heading } from "@/components/ui/typography/heading";

export async function CollectionFolder({
  collection,
}: {
  collection: Database["public"]["Tables"]["collection"]["Row"];
}) {
  const supabase = getSuapabaseServerComponent();

  const { data: collectionItems, error } = await supabase
    .from("collection_item")
    .select("*")
    .eq("collection_id", collection.id)
    .limit(4);

  if (error || !collectionItems) return <p>there has been an error</p>;

  const firstPostsOfCollection = await Promise.all(
    collectionItems.map(
      async (item) =>
        await supabase
          .from("posts")
          .select("*")
          .eq("id", item.post_id)
          .single(),
    ),
  );

  return (
    <article className="w-72 flex flex-col gap-2">
      <header className="flex flex-wrap h-full w-full max-h-60">
        {firstPostsOfCollection && firstPostsOfCollection.length > 0 ? (
          firstPostsOfCollection.map(({ data }) => (
            <>
              {data && (
                <li key={data.id}>
                  <LazyImage src={data.asset_url} alt={data.title} />
                </li>
              )}
            </>
          ))
        ) : (
          <Skeleton className="w-full h-60 rounded-sm" />
        )}
      </header>
      <Heading level={10}>{collection.title}</Heading>
    </article>
  );
}
