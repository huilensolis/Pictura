"use client";

import { ClientRouting } from "@/models/routing/client";
import { Database } from "@/supabase/types";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export function CollectionFolderContinerRedirectOnClick({
  collectionId,
  children,
}: {
  children: ReactNode;
  collectionId: Database["public"]["Tables"]["collection"]["Row"]["id"];
}) {
  const router = useRouter();
  function redirectToCollection() {
    router.push(ClientRouting.collection().home(collectionId));
  }

  return (
    <article
      onClick={redirectToCollection}
      className="cursor-pointer w-72 flex flex-col gap-2 border border-neutral-300 rounded-md"
    >
      {children}
    </article>
  );
}
