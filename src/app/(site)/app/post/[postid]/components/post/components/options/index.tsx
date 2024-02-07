"use client";

import { useRouter } from "next/navigation";
import { deleteFromCloundinary } from "@/services/images/delete";
import { Download, Pencil, Trash2 } from "lucide-react";
import { PlainButton } from "@/components/ui/buttons/plain";
import { useSupabase } from "@/hooks/use-supabase";
import { Option } from "./option.models";
import { downloadImage } from "@/services/images/download";

export function PostOptions({
  post_id,
  image_url,
  doesUserOwnPost,
}: {
  post_id: number;
  image_url: string;
  doesUserOwnPost: boolean;
}) {
  const { supabase } = useSupabase();

  const router = useRouter();

  const OWNER_OPTIONS: Option[] = [
    { alt: "Edit", icon: Pencil, action: () => {} },
    {
      alt: "Delete",
      icon: Trash2,
      isDangerous: true,
      action: async () => {
        try {
          const { error } = await supabase
            .from("posts")
            .delete()
            .eq("id", post_id)
            .single();

          if (error) throw new Error("Error trying to delete");

          await deleteFromCloundinary(image_url);

          if (typeof window !== "undefined") {
            if (window.history.length > 1) {
              return window.history.back(); // Go back to the previous page
            } else {
              return router.push("/app"); // Navigate to '/app' if no history
            }
          }
          router.refresh();
        } catch (e) {
          console.log(e);
        }
      },
    },
  ];

  const PUBLIC_OPTIONS: Option[] = [
    {
      alt: "Download",
      icon: Download,
      action: async () => await downloadImage(image_url),
    },
  ];

  const FINAL_OPTIONS = [...PUBLIC_OPTIONS];
  if (doesUserOwnPost) {
    FINAL_OPTIONS.push(...OWNER_OPTIONS);
  }

  return (
    <ul id="dropdown" className="flex gap-2">
      {FINAL_OPTIONS.map((option, _index) => (
        <li key={option.alt}>
          <PlainButton
            onClick={option.action}
            className={`px-2 py-2 hover:${
              option.isDangerous ? "bg-red-500" : "bg-neutral-300"
            }`}
          >
            {<option.icon />}
          </PlainButton>
        </li>
      ))}
    </ul>
  );
}
