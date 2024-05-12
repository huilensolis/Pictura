"use client";

import { useState } from "react";
import { type FieldError, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useProtectRouteFromUnauthUsers } from "@/utils/auth-validations/client-side-validations";
import { ProfileConfigUsername } from "./components/username";
import { TextArea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { type ProfileFormAreas } from "./form.models";
import { PrimaryButton } from "@/components/ui/buttons/primary";
import { Database } from "@/supabase/types";
import { Alert } from "@/components/ui/alert";
import { ImagePicker } from "@/components/ui/image-picker";
import { useBase64Image } from "@/hooks/use-base-64-image";
import { useUserProfile } from "@/hooks/use-user-profile";
import { FormSkeleton } from "./components/form-skeleton/form-skeleton.component";
import { updateProfile } from "@/actions/update-profile";

export default function ProfileConfigPage() {
  const [isUpdatingData, setIsUpdatingData] = useState<boolean>(false);
  const [errorUpdatingData, setErrorUpdatingData] = useState<string | null>(
    null,
  );

  useProtectRouteFromUnauthUsers();

  const router = useRouter();

  const { userProfile, isLoading } = useUserProfile();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ProfileFormAreas>({ mode: "onChange" });

  const { parseImageToBase64 } = useBase64Image();

  async function updateUserProfile(data: ProfileFormAreas) {
    if (!userProfile || !data) return;

    const formatedData: Database["public"]["Tables"]["profiles"]["Update"] = {
      name: data.name,
      website: data.website,
      location: data.location,
      description: data.description,
    };

    if (data.banner.length !== 0) {
      try {
        const bannerImageFile = data.banner[0];
        if (!bannerImageFile) {
          throw new Error("no image file found");
        }

        const base64Image = await parseImageToBase64({
          image: bannerImageFile,
        });
        if (!base64Image) throw new Error("error parsin image");

        formatedData.banner_url = base64Image;
      } catch {
        setErrorUpdatingData(
          "there is been an error updating your banner picture",
        );
      }
    }

    if (data.avatar.length !== 0) {
      try {
        const avatarImageFile = data.avatar[0];
        if (!avatarImageFile) {
          throw new Error("no avatar file found");
        }

        const base64Image = await parseImageToBase64({
          image: avatarImageFile,
        });
        if (!base64Image) throw new Error("error parsin image");

        formatedData.avatar_url = base64Image;
      } catch (error) {
        setErrorUpdatingData(
          "there is been an error updating your avatar picture",
        );
      }
    }

    try {
      setIsUpdatingData(true);

      await updateProfile(formatedData);

      setErrorUpdatingData(null);
      setIsUpdatingData(false);

      router.refresh();
    } catch (error) {
      setErrorUpdatingData("There has been an error updating your profile : (");
      setIsUpdatingData(false);
    }
  }

  return (
    <>
      {isLoading && <FormSkeleton />}
      {!isLoading && (
        <form
          className="w-full flex flex-col gap-2"
          onSubmit={handleSubmit(updateUserProfile)}
        >
          <div className="relative flex h-full w-full mb-16">
            <div className="w-full h-56">
              <ImagePicker
                label="Banner"
                id="banner"
                register={register}
                validationScheme={{
                  required: false,
                  validate: {
                    size: (files: File[]) => {
                      const file = files[0];

                      if (!file) return undefined;

                      const maxSizeInBytes = 400; // in KB

                      const maxSizeInKB = maxSizeInBytes * 1000;

                      if (file.size > maxSizeInKB) {
                        return "image max weight is 400kb";
                      }

                      return undefined;
                    },
                  },
                }}
                error={(errors.banner as FieldError) ?? undefined}
                imagePlaceHolderClasses="w-full h-full rounded-lg"
                placeholderImageUrl={userProfile?.banner_url ?? null}
                showErrorMessages={false}
              />
              {errors.banner?.message && (
                <span className="text-red-600 dark:text-red-500 pl-44">
                  {errors.banner.message}
                </span>
              )}
            </div>
            <div className="h-32 w-full absolute top-40 left-5">
              <ImagePicker
                label="Avatar"
                id="avatar"
                register={register}
                validationScheme={{
                  required: false,
                  validate: {
                    size: (files: File[]) => {
                      const file = files[0];

                      if (!file) return undefined;

                      const maxSizeInKB = 400; // in KB

                      const maxSizeInBytes = maxSizeInKB * 1024;

                      if (file.size > maxSizeInBytes) {
                        return "image max weight is 400kb";
                      }

                      return undefined;
                    },
                  },
                }}
                error={(errors.avatar as FieldError) ?? undefined}
                placeholderImageUrl={userProfile?.avatar_url ?? null}
                imagePlaceHolderClasses="w-32 h-32 rounded-full border-neutral-200 dark:border-cm-darker-gray border-2"
              />
            </div>
          </div>
          <ProfileConfigUsername
            defaultUsername={userProfile?.username ?? ""}
          />
          <Input
            type="text"
            placeholder="Name"
            label="name"
            id="name"
            disabled={false}
            register={register}
            defaultValue={userProfile?.name ?? ""}
            validationScheme={{
              maxLength: { value: 24, message: "Maximum of 24 characters" },
            }}
            error={errors.name}
          />
          <TextArea
            id="description"
            label="Description"
            validationScheme={{
              maxLength: { value: 160, message: "Maximum of 160 characters" },
            }}
            disabled={false}
            register={register}
            error={errors.description}
            defaultValue={userProfile?.description ?? ""}
            placeholder={`Hello there! I am Huilen Solis, a Frontend Engineer seeking his first development job. I am a pixel art enthusiasm. I like pixel art wallpapers and lofi gif backgrounds!

Want to connect? check out my portfolio bellow.`}
          />
          <Input
            type="text"
            id="location"
            label="Location"
            defaultValue={userProfile?.location ?? ""}
            validationScheme={{
              minLength: { value: 3, message: "Minimum of 3 characters" },
              maxLength: { value: 80, message: "Maximum of 80 characters" },
            }}
            register={register}
            error={errors.location}
            placeholder="Cordoba, Argentina"
          />
          <Input
            type="url"
            id="website"
            label="Website URL"
            defaultValue={userProfile?.website ?? ""}
            register={register}
            error={errors.website}
            validationScheme={{
              minLength: { value: 4, message: "Minimum of 4 characters" },
              validate: (inputValue: string) => {
                if (inputValue.length === 0) return true;
                try {
                  const url = new URL(inputValue);
                  if (url.protocol !== "https:")
                    return "make sure to include 'https' in the url";
                  return true;
                } catch (error) {
                  return "invalid url format";
                }
              },
            }}
            placeholder="https://my-portfolio.com"
          />
          <div className="mt-1">
            <PrimaryButton
              type="submit"
              isLoading={isUpdatingData || isSubmitting}
            >
              Save
            </PrimaryButton>
          </div>
          {errorUpdatingData && (
            <Alert
              type="error"
              title="Error updating profile"
              description={errorUpdatingData}
              onClose={() => setErrorUpdatingData(null)}
            />
          )}
        </form>
      )}
    </>
  );
}
