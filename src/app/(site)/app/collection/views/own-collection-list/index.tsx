import { CollectionFolder } from "@/components/feature/collection/folder";
import { getSuapabaseServerComponent } from "@/supabase/models/index.models";

export async function OwnCollectionList() {
  const supabase = getSuapabaseServerComponent();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <p>could not get session, please reload the page</p>;

  const { data: ownCollections } = await supabase
    .from("collection")
    .select("*")
    .eq("user_id", user.id);

  return (
    <ul className="flex flex-wrap gap-4">
      {ownCollections &&
        ownCollections.length > 0 &&
        ownCollections.map((collection) => (
          <li key={collection.id}>
            <CollectionFolder collection={collection} />
          </li>
        ))}
    </ul>
  );
}
