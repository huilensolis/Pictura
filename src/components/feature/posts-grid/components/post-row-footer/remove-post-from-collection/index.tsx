"use client";

import { BaseButton } from "@/components/ui/buttons/base-button";
import { useSupabase } from "@/hooks/use-supabase";
import { Database } from "@/supabase/types";
import { FolderMinus } from "lucide-react";
import { useState } from "react";

export function RemovePostFromCollectionBtn({
  collectionId,
  postId,
}: {
  collectionId: Database["public"]["Tables"]["collection"]["Row"]["id"];
  postId: Database["public"]["Tables"]["posts"]["Row"]["id"];
}) {
  const [loading, setLoading] = useState(false);

  const { supabase } = useSupabase();

  async function removePostFromCollection() {
    setLoading(true);

    try {
      await supabase
        .from("collection_item")
        .delete()
        .eq("post_id", postId)
        .eq("collection_id", collectionId);

      location.reload();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <BaseButton
      isLoading={loading}
      disabled={loading}
      onClick={removePostFromCollection}
      className="dark:text-neutral-300 text-neutral-800 hover:bg-neutral-300 dark:hover:bg-cm-lighter-gray rounded-sm transition-all duration-150"
    >
      <FolderMinus />
    </BaseButton>
  );
}
