import { Database } from "@/supabase/types";
import { DeleteCollectionBtn } from "./btns/delete";
import { ShareCollectionBtn } from "./btns/share";
import { EditCollectionFolderBtn } from "./btns/edit";

export function CollectionFolderOptions({
  doesUserOwnCollection,
  collection,
}: {
  doesUserOwnCollection: boolean;
  collection: Database["public"]["Tables"]["collection"]["Row"];
}) {
  return (
    <ul className="flex items-center gap-2">
      <li>
        <ShareCollectionBtn collectionId={collection.id} />
      </li>
      {doesUserOwnCollection && (
        <>
          <li className="flex">
            <EditCollectionFolderBtn collectionId={collection.id} />
          </li>
          <li>
            <DeleteCollectionBtn collection={collection} />
          </li>
        </>
      )}
    </ul>
  );
}
