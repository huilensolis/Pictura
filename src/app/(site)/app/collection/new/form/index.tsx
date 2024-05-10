"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { TFormAreas } from "../models";
import { TextArea } from "@/components/ui/textarea";
import { PrimaryButton } from "@/components/ui/buttons/primary";
import { useState } from "react";
import { useSupabase } from "@/hooks/use-supabase";
import { useRouter } from "next/navigation";
import { ClientRouting } from "@/models/routing/client";
import { revalidatePathOnEdge } from "@/actions/revalidate-path";

export function NewCollectionForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const { handleSubmit, register, formState } = useForm<TFormAreas>({
    mode: "onChange",
  });

  const { errors, isValid } = formState;

  const { supabase } = useSupabase();

  const router = useRouter();

  async function createNewCollection(data: TFormAreas) {
    if (!data) return;
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("error getting user");

      const { error } = await supabase.from("collection").insert({
        title: data.title,
        description: data.description,
        user_id: user.id,
      });
      if (error) throw new Error("error inserting collection");

      await revalidatePathOnEdge(
        ClientRouting.collection().list({ filter: "default" }),
        "page",
      );

      router.push(ClientRouting.collection().list({ filter: "default" }));
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }
  return (
    <form
      onSubmit={handleSubmit(createNewCollection)}
      className="flex flex-col gap-2 w-full"
    >
      <Input
        register={register}
        label="Title"
        id="title"
        error={errors.title}
        type="text"
        validationScheme={{
          maxLength: {
            value: 40,
            message: "Max title length is 40 characteres",
          },
        }}
      />
      <TextArea
        id="description"
        label="Description"
        register={register}
        validationScheme={{
          maxLength: {
            value: 250,
            message: "Max description length is 250 characteres",
          },
        }}
        error={errors.description}
      />
      <PrimaryButton disabled={loading || !isValid} isLoading={loading}>
        Create
      </PrimaryButton>
      {error && (
        <p className="text-red-500">there has been an error, try again</p>
      )}
    </form>
  );
}
