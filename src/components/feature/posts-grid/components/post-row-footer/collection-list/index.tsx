"use client";

import { CollectionItem } from "@/app/(site)/app/post/[postid]/components/post/components/options/components/add-to-collection/components/collection-item";
import { CollectionListSkeleton } from "@/app/(site)/app/post/[postid]/components/post/components/options/components/add-to-collection/components/collection-list-skeleton";
import { DropdownMenuItem } from "@/components/ui/drop-down";
import { useSupabase } from "@/hooks/use-supabase";
import { Database } from "@/supabase/types";
import { useEffect, useState } from "react";

export function CollectionList({
  postId,
}: {
  postId: Database["public"]["Tables"]["posts"]["Row"]["id"];
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [collections, setCollections] = useState<
    Database["public"]["Tables"]["collection"]["Row"][]
  >([]);

  const { supabase } = useSupabase();

  useEffect(() => {
    async function fetchCollections({
      abortController,
    }: {
      abortController: AbortController;
    }) {
      try {
        setLoading(true);
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const { data: collectionsData } = await supabase
          .from("collection")
          .select("*")
          .eq("user_id", user.id)
          .abortSignal(abortController.signal);

        if (collectionsData && collectionsData.length > 0) {
          setCollections(collectionsData);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    const abortController = new AbortController();
    if (!loading) {
      fetchCollections({ abortController });
    }

    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <>
      {loading && <CollectionListSkeleton />}
      {!loading &&
        collections.length > 0 &&
        collections.map((collection) => (
          <DropdownMenuItem key={collection.id}>
            <CollectionItem postId={postId} collection={collection} />
          </DropdownMenuItem>
        ))}
    </>
  );
}
