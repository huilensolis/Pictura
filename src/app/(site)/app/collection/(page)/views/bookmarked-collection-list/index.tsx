import { CollectionFolder } from "@/components/feature/collection/folder";
import { getSuapabaseServerComponent } from "@/supabase/models/index.models";

export async function BookmarkedCollectionList({ userId }: { userId: string }) {
  const supabase = getSuapabaseServerComponent();

  const { data: bookmarkedCollections } = await supabase
    .from("collection_bookmark")
    .select("*")
    .eq("user_id", userId);

  if (!bookmarkedCollections) return <></>;

  const collections = await Promise.all(
    bookmarkedCollections.map(
      async (bookmarkedCollectionItem) =>
        await supabase
          .from("collection")
          .select("*")
          .eq("id", bookmarkedCollectionItem.id)
          .single(),
    ),
  );
  return (
    <>
      {collections &&
        collections.length > 0 &&
        collections.map(({ data }) => (
          <>
            {data && (
              <li key={data.id}>
                <CollectionFolder
                  collection={data}
                  doesUserOwnCollection={data.user_id === userId}
                />
              </li>
            )}
          </>
        ))}
    </>
  );
}
