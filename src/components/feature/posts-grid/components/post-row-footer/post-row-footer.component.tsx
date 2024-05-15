import { Database } from "@/supabase/types";

export function PostRowFooter({
  collectionId,
  userId,
  postTitle,
}: {
  collectionId?: Database["public"]["Tables"]["collection"]["Row"]["id"];
  userId: Database["public"]["Tables"]["users"]["Row"]["id"];
  postTitle: Database["public"]["Tables"]["posts"]["Row"]["title"];
}) {
  return <footer>{postTitle}</footer>;
}
