"use client";

import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { IFormAreas } from "./form.models";
import { ChangeEvent, useEffect, useState } from "react";
import { useUserProfile } from "@/hooks/use-user-profile";
import { useUser } from "@/hooks/use-user";
import { Database } from "@/supabase/types";

export function ProfileConfigExtra() {
  const [defaultValues, setDefaultValues] = useState<IFormAreas>({
    website: "",
    location: "",
    description: "",
  });
  const [haveDefaultValuesBeenFetched, setHaveDefaultValuesBeenFetched] =
    useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useUser();

  const { register, formState } = useForm<IFormAreas>({
    mode: "onChange",
  });

  const { errors } = formState;

  const { getCurrentUserProfile, updateProfileStoreData } = useUserProfile();

  useEffect(() => {
    async function fetchDefaultValues() {
      setHaveDefaultValuesBeenFetched(true);
      const { data, error } = await getCurrentUserProfile(user?.id as string);
      if (error || !data) {
        setIsLoading(false);
        return;
      }
      setDefaultValues({
        website: data.website ?? "",
        location: data.location ?? "",
        description: data.description ?? "",
      });
      setIsLoading(false);
    }
    if (user && !haveDefaultValuesBeenFetched && !isLoading) {
      setIsLoading(true);
      fetchDefaultValues();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  function updateProfileStoreDescription(description: string) {
    if (errors.description) return;
    updateProfileStoreData({
      description,
    } as Database["public"]["Tables"]["profiles"]["Row"]);
  }

  function updateProfileStoreLocation(location: string) {
    if (errors.location) return;
    updateProfileStoreData({
      location,
    } as Database["public"]["Tables"]["profiles"]["Row"]);
  }

  function updateProfileStoreWebsite(website: string) {
    if (errors.website) return;
    updateProfileStoreData({
      website,
    } as Database["public"]["Tables"]["profiles"]["Row"]);
  }

  return (
    <div className="w-full flex flex-col gap-2 h-[contet]">
      <TextArea
        id="description"
        label="Description"
        validationScheme={{
          required: false,
          maxLength: { value: 160, message: "Maximum of 160 characters" },
          onChange: (e: ChangeEvent<HTMLTextAreaElement>) =>
            updateProfileStoreDescription(e.target.value),
        }}
        disabled={false}
        register={register}
        error={errors.description ?? null}
        defaultValue={defaultValues.description}
        placeholder={`Hello there! I am Huilen Solis, a Frontend Engineer seeking his first development job. I am a pixel art enthusiasm. I like pixel art wallpapers and lofi gif backgrounds!

Want to connect? check out my portfolio bellow.`}
      />
      <Input
        type="text"
        id="location"
        label="Location"
        defaultValue={defaultValues.location}
        validationScheme={{
          required: false,
          minLength: { value: 3, message: "Minimum of 3 characters" },
          maxLength: { value: 80, message: "Maximum of 80 characters" },
          onChange: (e: ChangeEvent<HTMLTextAreaElement>) =>
            updateProfileStoreLocation(e.target.value),
        }}
        register={register}
        error={errors.location ?? null}
        placeholder="Cordoba, Argentina"
      />
      <Input
        type="url"
        id="website"
        label="Any website you would like to share on your profile?"
        defaultValue={defaultValues.website}
        register={register}
        error={errors.website ?? null}
        validationScheme={{
          required: false,
          minLength: { value: 4, message: "Minimum of 4 characters" },
          validate: (inputValue: string) => {
            if (inputValue.length === 0) return true;
            try {
              const url = new URL(inputValue);
              if (url.protocol !== "https:")
                return "make sure to include the https on the url";
              return true;
            } catch (error) {
              return "invalid url format";
            }
          },
          onChange: (e: ChangeEvent<HTMLTextAreaElement>) =>
            updateProfileStoreWebsite(e.target.value),
        }}
        placeholder="https://my-portfolio.com"
      />
    </div>
  );
}
