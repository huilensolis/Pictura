import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { Database } from "@/supabase/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Heading } from "@/components/ui/typography/heading";
import { CollectionFolderOptions } from "./options";
import { getShortName } from "@/utils/get-short-name";
import { CollectionFolderContinerRedirectOnClick } from "./container.component";
import { LazyImage } from "../../lazy-image";

export async function CollectionFolder({
  collection,
  doesUserOwnCollection,
}: {
  collection: Database["public"]["Tables"]["collection"]["Row"];
  doesUserOwnCollection: boolean;
}) {
  const supabase = getSuapabaseServerComponent();
  const { data: collectionItems } = await supabase
    .from("collection_item")
    .select("*")
    .limit(3)
    .eq("collection_id", collection.id);

  const { data: collectionPosts } = collectionItems
    ? await supabase
        .from("posts")
        .select("*")
        .in(
          "id",
          collectionItems.map((item) => item.post_id),
        )
    : { data: null };

  return (
    <CollectionFolderContinerRedirectOnClick collectionId={collection.id}>
      <header className="flex flex-wrap w-full h-52 rounded-t-md overflow-hidden">
        <ul className="grid grid-cols-2 grid-rows-2 h-full w-full">
          {collectionPosts &&
            collectionPosts.length > 0 &&
            collectionPosts.map((post, i, posts) => (
              <li
                key={post.id}
                className={`${
                  // if there are 2 posts, we make each image occupie 50%
                  posts.length === 2
                    ? "col-span-1 row-span-2"
                    : // if there are 3 posts, we check for the index, the first image occupies 50% of the cols and 100% of the row, and the 2d and 3d img occupie 50% of the row and 50% of the col
                      posts.length === 3
                      ? `${
                          i === 0
                            ? "row-span-2 col-span-1"
                            : "row-span-1 col-span-1"
                        }`
                      : // if there are 1 image, we make the image occupie 100% the col and 100% the row
                        "col-span-2 row-span-2"
                }`}
              >
                <LazyImage
                  src={post.asset_url}
                  alt={post.title}
                  className="w-full object-cover object-center h-full"
                  skeletonBgColor={post.asset_color || undefined}
                />
              </li>
            ))}
          {!collectionPosts ||
            (collectionPosts.length === 0 && (
              <Skeleton className="w-full h-full row-span-2 col-span-2" />
            ))}
        </ul>
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
