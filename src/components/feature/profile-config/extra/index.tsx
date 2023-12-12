"use client";

import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { IFormAreas } from "./form.models";
import { PrimaryButton } from "@/components/ui/buttons/primary";
import { useEffect, useState } from "react";
import { useUserProfile } from "@/hooks/use-user-profile";
import { Alert } from "@/components/ui/alert";
import { useUser } from "@/hooks/use-user";

export function ProfileConfigExtra() {
  const [error, setError] = useState(false);
  const [defaultValues, setDefaultValues] = useState<IFormAreas>({
    website: "",
    location: "",
    description: "",
  });
  const [haveDefaultValuesBeenFetched, setHaveDefaultValuesBeenFetched] =
    useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useUser();

  const { register, formState, handleSubmit } = useForm<IFormAreas>({
    mode: "onChange",
  });

  const { isSubmitting, errors, isValid, isValidating, isDirty } = formState;

  const { updateUserProfile, getCurrentUserProfile } = useUserProfile();

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

  async function handleSubmitExtraAreasForm(data: IFormAreas) {
    let finalValue = {};
    for (const key of Object.keys(data) as string[]) {
      const valueOnObject = data[key as keyof IFormAreas];

      if (
        valueOnObject.length > 0 &&
        valueOnObject !== defaultValues[key as keyof IFormAreas]
      ) {
        finalValue = {
          ...finalValue,
          [key]: valueOnObject,
        };
      }
    }
    try {
      if (Object.keys(finalValue).length <= 0) {
        return;
      }
      await updateUserProfile(finalValue as any, user?.id as string);
      setError(false);
    } catch (error) {
      setError(true);
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleSubmitExtraAreasForm)}
      className="w-full flex flex-col gap-2 h-[contet]"
    >
      <TextArea
        id="description"
        label="Description"
        validationScheme={{
          required: false,
          maxLength: { value: 160, message: "Maximum of 160 characters" },
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
        }}
        placeholder="https://my-portfolio.com"
      />
      <PrimaryButton
        isDisabled={(!isValid && isDirty) || isSubmitting || isValidating}
      >
        Save
      </PrimaryButton>
      {error && (
        <Alert
          type="error"
          title="Error"
          description="There is been an error while updating the data, please try again."
          onClose={() => setError(false)}
        />
      )}
    </form>
  );
}
