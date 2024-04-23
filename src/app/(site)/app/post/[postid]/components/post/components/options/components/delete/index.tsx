"use client";

import { PlainButton } from "@/components/ui/buttons/plain";
import { useSupabase } from "@/hooks/use-supabase";
import { deleteImageAsset } from "@/services/images/delete";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeletePostBtn({
  imageUrl,
  postId,
}: {
  imageUrl: string;
  postId: number;
}) {
  const { supabase } = useSupabase();

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  async function deletePost() {
    try {
      setLoading(true);
      const { error } = await supabase.from("posts").delete().eq("id", postId);

      if (error) throw new Error("Error trying to delete");

      await deleteImageAsset(imageUrl);

      if (typeof window !== "undefined") {
        if (window.history.length > 1) {
          return window.history.back(); // Go back to the previous page
        } else {
          return router.push("/app"); // Navigate to '/app' if no history
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
  return (
    <PlainButton
      onClick={deletePost}
      isLoading={loading}
      className="px-2 py-2  dark:hover:brightness-125 hover:brightness-90 transition-all duration-75 bg-red-500"
    >
      <Trash2 className="text-neutral-50 dark:text-neutral-300" />
    </PlainButton>
  );
}
