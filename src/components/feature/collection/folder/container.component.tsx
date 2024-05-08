"use client";

import { ClientRouting } from "@/models/routing/client";
import { Database } from "@/supabase/types";
import { useRouter } from "next/navigation";
import { MouseEvent, ReactNode } from "react";

export function CollectionFolderContinerRedirectOnClick({
  collectionId,
  children,
}: {
  children: ReactNode;
  collectionId: Database["public"]["Tables"]["collection"]["Row"]["id"];
}) {
  const router = useRouter();
  function redirectToCollection(e: MouseEvent<HTMLElement>) {
    e.stopPropagation();
    router.push(ClientRouting.collection().home(collectionId));
  }

  return (
    <article
      onClick={redirectToCollection}
      className="h-full w-full cursor-pointer w-72 flex flex-col gap-2 border border-neutral-300 rounded-md"
    >
      {children}
    </article>
  );
}
