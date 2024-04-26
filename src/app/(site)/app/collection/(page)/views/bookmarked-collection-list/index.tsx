import { CollectionFolder } from "@/components/feature/collection/folder";
import { getSuapabaseServerComponent } from "@/supabase/models/index.models";

export async function BookmarkedCollectionList() {
  const supabase = getSuapabaseServerComponent();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <p>could not get session, please reload the page</p>;

  const { data: bookmarkedCollections } = await supabase
    .from("collection_bookmark")
    .select("*")
    .eq("user_id", user?.id);

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
    <ul className="flex flex-col gap-2">
      {collections &&
        collections.length > 0 &&
        collections.map(({ data }) => (
          <>
            {data && (
              <li key={data.id}>
                <CollectionFolder collection={data} />
              </li>
            )}
          </>
        ))}
    </ul>
  );
}
