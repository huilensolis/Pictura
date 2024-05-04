"use client";

import { PlainButton } from "@/components/ui/buttons/plain";
import { PrimaryButton } from "@/components/ui/buttons/primary";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/drop-down";
import { Skeleton } from "@/components/ui/skeleton";
import { useSupabase } from "@/hooks/use-supabase";
import { Database } from "@/supabase/types";
import { getShortName } from "@/utils/get-short-name";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { CollectionListSkeleton } from "./components/collection-list-skeleton";
import { CollectionItem } from "./components/collection-item";

export function AddPostToCollectionBtn({
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
    <div className="w-full flex">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center gap-1 px-4 py-2">
          <ChevronDown /> Save to collection
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-neutral-200 max-w-80">
          <DropdownMenuLabel>Select Collection</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col w-full">
            {loading && <CollectionListSkeleton />}
            {!loading &&
              collections.length > 0 &&
              collections.map((collection) => (
                <DropdownMenuItem key={collection.id}>
                  <CollectionItem postId={postId} collection={collection} />
                </DropdownMenuItem>
              ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
