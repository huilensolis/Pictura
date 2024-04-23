"use client";

import { revalidatePathOnEdge } from "@/actions/revalidate-path";
import { PrimaryButton } from "@/components/ui/buttons/primary";
import { useSupabase } from "@/hooks/use-supabase";
import { ClientRouting } from "@/models/routing/client";
import { Database } from "@/supabase/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type TForm = {
  title: string;
};

export function EditPostForm({
  post,
}: {
  post: Database["public"]["Tables"]["posts"]["Row"];
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors, isValid },
    register,
    watch,
  } = useForm<TForm>({ mode: "onChange" });

  const { supabase } = useSupabase();

  const router = useRouter();

  async function updatePost(data: TForm) {
    if (data.title === post.title) return; // no changes performed

    if (typeof data.title === "undefined") return;

    try {
      setLoading(true);

      const { error } = await supabase
        .from("posts")
        .update({ title: data.title })
        .eq("id", post.id);

      if (error) throw new Error("error updating post");

      setError(false);
      await revalidatePathOnEdge(ClientRouting.post().page(post.id), "page");
      router.push(ClientRouting.post().page(post.id));
    } catch (error) {
      console.log({ error });
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(updatePost)} className="flex flex-col gap-2">
      <textarea
        placeholder="Title"
        defaultValue={post.title}
        className="bg-transparent placeholder:font-bold text-4xl w-full max-w-96 h-[340px] border border-neutral-300 dark:border-cm-lighter-gray resize-none p-2 text-neutral-800 dark:text-neutral-300 font-bold placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none"
        {...register("title", {
          maxLength: {
            value: 150,
            message: "Max title characteres is 150",
          },
          required: { value: true, message: "Title is required" },
        })}
      />
      {errors.title?.type === "maxLength" && (
        <span className="text-red-500">
          {watch("title").length} of 150 characteres
        </span>
      )}
      {errors.title?.type === "required" && (
        <span className="text-red-500">Title required</span>
      )}
      <PrimaryButton
        isLoading={loading}
        type="submit"
        disabled={!isValid || loading}
      >
        Post
      </PrimaryButton>
      {error && (
        <p className="text-red-500 w-full text-center">
          There has been an error trying to publish your post
        </p>
      )}
    </form>
  );
}
