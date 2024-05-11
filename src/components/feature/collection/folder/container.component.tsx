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
      className="h-full w-full cursor-pointer flex flex-col gap-2 border dark:border-cm-lighter-gray border-neutral-300 dark:text-neutral-300 rounded-md"
    >
      {children}
    </article>
  );
}
