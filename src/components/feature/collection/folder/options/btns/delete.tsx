"use client";

import { BaseButton } from "@/components/ui/buttons/base-button";
import { useSupabase } from "@/hooks/use-supabase";
import { Database } from "@/supabase/types";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

export function DeleteCollectionBtn({
  collection,
}: {
  collection: Database["public"]["Tables"]["collection"]["Row"];
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const { supabase } = useSupabase();

  const router = useRouter();

  async function handleClickOnDeleteBtn(e: MouseEvent<HTMLElement>) {
    e.stopPropagation();

    try {
      setLoading(true);

      const { error } = await supabase
        .from("collection")
        .delete()
        .eq("id", collection.id);

      if (error) throw new Error(error?.message);
      router.refresh();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <BaseButton
      isLoading={loading}
      className="p-2 duration-150 hover:bg-neutral-300 dark:hover:bg-cm-lighter-gray rounded-md"
      onClick={handleClickOnDeleteBtn}
    >
      <Trash />
    </BaseButton>
  );
}
