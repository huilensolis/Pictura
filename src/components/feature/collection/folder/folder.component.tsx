import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { Database } from "@/supabase/types";
import { LazyImage } from "../../lazy-image";
import { Skeleton } from "@/components/ui/skeleton";
import { Heading } from "@/components/ui/typography/heading";
import { CollectionFolderOptions } from "./options";
import { getShortName } from "@/utils/get-short-name";
import { CollectionFolderContinerRedirectOnClick } from "./container.component";

export async function CollectionFolder({
  collection,
  doesUserOwnCollection,
}: {
  collection: Database["public"]["Tables"]["collection"]["Row"];
  doesUserOwnCollection: boolean;
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
    <CollectionFolderContinerRedirectOnClick collectionId={collection.id}>
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
      <footer className="p-3 flex flex-col gap-2">
        <section className="flex flex-col gap-1">
          <Heading level={10}>{getShortName(collection.title, 30)}</Heading>
          {collection.description && (
            <p className="text-neutral-800 text-pretty">
              {getShortName(collection.description, 50)}
            </p>
          )}
        </section>
        <section>
          <CollectionFolderOptions
            collection={collection}
            doesUserOwnCollection={doesUserOwnCollection}
          />
        </section>
      </footer>
    </CollectionFolderContinerRedirectOnClick>
  );
}
