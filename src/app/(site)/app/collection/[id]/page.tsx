import { LazyImage } from "@/components/feature/lazy-image";
import { PostsGrid } from "@/components/feature/posts-grid";
import { Skeleton } from "@/components/ui/skeleton";
import { ClientRouting } from "@/models/routing/client";
import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { getShortName } from "@/utils/get-short-name";
import Link from "next/link";
import { Suspense } from "react";
import { CollectionPosts } from "./collection-posts";

export default async function CollectionPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const supabase = getSuapabaseServerComponent();
  const { data: collection } = await supabase
    .from("collection")
    .select("*")
    .eq("id", id)
    .single();

  if (!collection) return <p>not found</p>;

  return (
    <main className="flex flex-col px-2 py-10">
      <header className="md:grid md:grid-cols-2 flex flex-col gap-4 w-full max-w-3xl">
        <Skeleton className="w-full h-56" />
        <section className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl">{collection.title}</h1>
          {collection.description && (
            <p className="text-pretty text-neutral-700">
              {getShortName(collection.description, 250)}
            </p>
          )}
          <div>
            <Suspense
              fallback={
                <div className="flex gap-2 w-full">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex flex-col justify-between">
                    <Skeleton className="w-20 h-4 rounded-full" />
                    <Skeleton className="w-48 h-4 rounded-full" />
                  </div>
                </div>
              }
            >
              <CollectionOwner userId={collection.user_id} />
            </Suspense>
          </div>
        </section>
      </header>
      <CollectionPosts collection_id={collection.id} />
    </main>
  );
}

async function CollectionOwner({ userId }: { userId: string }) {
  const supabase = getSuapabaseServerComponent();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (!profile) return <></>;

  return (
    <Link href={ClientRouting.profile(profile.username || "")}>
      <article className="flex gap-2">
        {profile.avatar_url ? (
          <LazyImage
            src={profile.avatar_url}
            alt={profile.name || ""}
            className="h-12 w-12 rounded-full"
            skeletonClassName="h-12 w-12 rounded-full"
          />
        ) : (
          <Skeleton />
        )}
        <div className="flex flex-col justify-between">
          <span className="font-bold">{profile.username}</span>{" "}
          <span>created this collection</span>
        </div>
      </article>
    </Link>
  );
}
