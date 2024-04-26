import { ClientRouting } from "@/models/routing/client";
import { Database } from "@/supabase/types";
import { Pencil } from "lucide-react";
import Link from "next/link";

export function EditCollectionFolderBtn({
  collectionId,
}: {
  collectionId: Database["public"]["Tables"]["collection"]["Row"]["id"];
}) {
  return (
    <Link
      href={ClientRouting.collection().edit(collectionId)}
      className="p-2 duration-150 hover:bg-neutral-300 rounded-md"
    >
      <Pencil />
    </Link>
  );
}
