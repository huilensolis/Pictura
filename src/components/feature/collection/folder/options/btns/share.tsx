"use client";

import { Share2 } from "lucide-react";
import { ClientRouting } from "@/models/routing/client";
import { Database } from "@/supabase/types";
import { copyToClipboard } from "@/utils/copy-to-clipboard";
import { MouseEvent } from "react";

export function ShareCollectionBtn({
  collectionId,
}: {
  collectionId: Database["public"]["Tables"]["collection"]["Row"]["id"];
}) {
  function handleCopyToClickBoard(e: MouseEvent<HTMLElement>) {
    e.stopPropagation();
    copyToClipboard(ClientRouting.collection().home(collectionId));
  }
  return (
    <button
      className="p-2 duration-150 hover:bg-neutral-300 dark:hover:bg-cm-lighter-gray rounded-md"
      onClick={handleCopyToClickBoard}
    >
      <Share2 />
    </button>
  );
}
