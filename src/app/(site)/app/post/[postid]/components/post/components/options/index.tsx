"use client";

import { useSupabase } from "@/hooks/use-supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Option } from "./option.models";
import { deleteFromCloundinary, downloadImage } from "@/utils/utils";
import { Download, Pencil, Share2, Trash2 } from "lucide-react";
import { PlainButton } from "@/components/ui/buttons/plain";

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

  const [indexOfOptionLoading, setIndexOfOptionLoading] = useState<
    number | null
  >(null);

  const OWNER_OPTIONS: Option[] = [
    { alt: "Edit", icon: Pencil, action: () => {} },
    {
      alt: "Delete",
      icon: Trash2,
      isDangerous: true,
      action: async () => {
        const indexOfOption = 1;
        setIndexOfOptionLoading(indexOfOption);
        try {
          const { error } = await supabase
            .from("posts")
            .delete()
            .eq("id", post_id)
            .single();
          setIndexOfOptionLoading(null);
          if (error) throw new Error("Error trying to delete");
          deleteFromCloundinary(image_url);
          if (typeof window !== "undefined") {
            if (window.history.length > 1) {
              window.history.back(); // Go back to the previous page
            } else {
              router.push("/app"); // Navigate to '/app' if no history
            }
          }
          router.refresh();
        } catch (e) {
          //
        }
      },
    },
  ];

  const PUBLIC_OPTIONS: Option[] = [
    { alt: "Share", icon: Share2, action: () => {} },
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
      {FINAL_OPTIONS.map((option, index) => (
        <li key={option.alt}>
          <PlainButton
            isDisabled={indexOfOptionLoading === index}
            isLoading={indexOfOptionLoading === index}
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
