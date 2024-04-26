import { Database } from "@/supabase/types";
import { Share2 } from "lucide-react";

export function ShareCollectionBtn({
  collectionId,
}: {
  collectionId: Database["public"]["Tables"]["collection"]["Row"]["id"];
}) {
  return (
    <button className="p-2 duration-150 hover:bg-neutral-300 rounded-md">
      <Share2 />
    </button>
  );
}
