import { CollectionFolder } from "@/components/feature/collection/folder";
import { getSuapabaseServerComponent } from "@/supabase/models/index.models";

export async function OwnCollectionList({ userId }: { userId: string }) {
  const supabase = getSuapabaseServerComponent();

  const { data: ownCollections } = await supabase
    .from("collection")
    .select("*")
    .eq("user_id", userId);

  return (
    <>
      {ownCollections &&
        ownCollections.length > 0 &&
        ownCollections.map((collection) => (
          <li key={collection.id}>
            <CollectionFolder
              collection={collection}
              doesUserOwnCollection={collection.user_id === userId}
            />
          </li>
        ))}
    </>
  );
}
