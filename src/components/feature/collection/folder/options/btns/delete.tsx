"use client";

import { Database } from "@/supabase/types";
import { Trash } from "lucide-react";
import { MouseEvent } from "react";

export function DeleteCollectionBtn({
  collection,
}: {
  collection: Database["public"]["Tables"]["collection"]["Row"];
}) {
  // TODO: open a modal to ask if the user is sure to delete this collection

  function handleClickOnDeleteBtn(e: MouseEvent<HTMLElement>) {
    e.stopPropagation();
  }

  return (
    <button
      className="p-2 duration-150 hover:bg-neutral-300 rounded-md"
      onClick={handleClickOnDeleteBtn}
    >
      <Trash />
    </button>
  );
}
