import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { Database } from "@/supabase/types";
import { LazyImage } from "../../lazy-image";

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
    <article>
      <h1>
        {firstPostsOfCollection.length && firstPostsOfCollection.length > 0 && (
          <ul>
            {firstPostsOfCollection.map(({ data }) => (
              <>
                {data && (
                  <li key={data.id}>
                    <LazyImage src={data.asset_url} alt={data.title} />
                  </li>
                )}
              </>
            ))}
          </ul>
        )}
        {collection.title}
      </h1>
    </article>
  );
}
