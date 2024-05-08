import { Database } from "@/supabase/types";
import { Heading } from "@/components/ui/typography/heading";
import { CollectionFolderOptions } from "./options";
import { getShortName } from "@/utils/get-short-name";
import { CollectionFolderContinerRedirectOnClick } from "./container.component";
import { CollectionCover } from "../cover";

export async function CollectionFolder({
  collection,
  doesUserOwnCollection,
}: {
  collection: Database["public"]["Tables"]["collection"]["Row"];
  doesUserOwnCollection: boolean;
}) {
  return (
    <CollectionFolderContinerRedirectOnClick collectionId={collection.id}>
      <header className="flex flex-wrap w-full h-52 rounded-t-md overflow-hidden">
        <CollectionCover collectionId={collection.id} />
      </header>
      <footer className="p-3 flex flex-col justify-between gap-2 h-full flex-1">
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
