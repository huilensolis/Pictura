"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { useProtectRouteFromUnauthUsers } from "@/utils/auth/client-side-validations";
import { ProfileConfigUsername } from "./components/username";
import { TextArea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ProfileFormAreas } from "./form.models";
import { useUserProfile } from "@/hooks/use-user-profile";
import { PrimaryButton } from "@/components/ui/buttons/primary";
import { Database } from "@/supabase/types";
import { Alert } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { ImagePicker } from "@/components/ui/image-picker";
import { postImage } from "@/services/api/upload-image";
import { useBase64Image } from "@/hooks/use-base-64-image";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileConfigPage() {
  const [isUpdatingData, setIsUpdatingData] = useState<boolean>(false);
  const [errorUpdatingData, setErrorUpdatingData] = useState<string | null>(
    null,
  );

  const {
    userProfile,
    isLoading: isLoadingUserProfile,
    updateUserProfile,
  } = useUserProfile();

  useProtectRouteFromUnauthUsers();

  const router = useRouter();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ProfileFormAreas>({ mode: "onChange" });

  const { parseImageToBase64 } = useBase64Image();

  async function updateProfile(data: ProfileFormAreas) {
    const formatedData: Database["public"]["Tables"]["profiles"]["Row"] = {
      name: data.name,
      website: data.website,
      location: data.location,
      description: data.description,
    } as Database["public"]["Tables"]["profiles"]["Row"];

    if (data.banner) {
      try {
        const bannerImageFile = data.banner[0];

        if (!bannerImageFile) {
          throw new Error("");
        }

        const base64Image = await parseImageToBase64({
          image: bannerImageFile,
        });
        if (!base64Image) throw new Error("No base64Image");

        const { error, assetSecureUrl } = await postImage({
          image: base64Image,
        });

        if (error || !assetSecureUrl) {
          throw new Error("server response wen wrong");
        }

        formatedData.banner_url = assetSecureUrl;
      } catch {
        setErrorUpdatingData(
          "there is been an error updating your banner picture",
        );
      }
    }

    if (data.avatar) {
      try {
        const avatarImageFile = data.avatar[0];

        if (!avatarImageFile) {
          throw new Error("");
        }
        const base64Image = await parseImageToBase64({
          image: avatarImageFile,
        });
        if (!base64Image) throw new Error("No base64Image");

        const { error, assetSecureUrl } = await postImage({
          image: base64Image,
        });

        if (error || !assetSecureUrl) {
          throw new Error("server response wen wrong");
        }

        formatedData.avatar_url = assetSecureUrl;
      } catch (error) {
        console.log(error);
        setErrorUpdatingData(
          "there is been an error updating your avatar picture",
        );
      }
    }

    try {
      setIsUpdatingData(true);
      await updateUserProfile(formatedData);
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
      {isLoadingUserProfile && <FormSkeleton />}
      {!isLoadingUserProfile && (
        <form
          className="w-full flex flex-col gap-2"
          onSubmit={handleSubmit(updateProfile)}
          encType="multipart/form-data"
        >
          <div className="relative flex h-full w-full mb-10">
            <div className="w-full h-56">
              <ImagePicker
                label="Banner"
                id="banner"
                register={register}
                validationScheme={{
                  required: false,
                }}
                error={errors.banner as any}
                imagePlaceHolderClasses="w-full h-full rounded-lg"
                placeholderImageUrl={userProfile?.banner_url ?? null}
              />
            </div>
            <div className="h-32 w-32 absolute -bottom-10 left-5">
              <ImagePicker
                label="Avatar"
                id="avatar"
                register={register}
                validationScheme={{ required: false }}
                error={errors.avatar as any}
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
              required: "Area required",
              maxLength: { value: 24, message: "Maximum of 24 characters" },
            }}
            error={errors.name}
          />
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
              required: false,
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
            label="Any website you would like to share on your profile?"
            defaultValue={userProfile?.website ?? ""}
            register={register}
            error={errors.website}
            validationScheme={{
              required: false,
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
function FormSkeleton() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <header className="relative w-full mb-10">
        <Skeleton className="w-full h-56 rounded-lg" />
        <Skeleton className="w-32 h-32 rounded-full absolute left-5 -bottom-10" />
      </header>
      <div className="flex flex-col gap-1">
        <Skeleton className="w-28 h-3 rounded-lg" />
        <Skeleton className="w-full h-10 rounded-lg" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="w-28 h-3 rounded-lg" />
        <Skeleton className="w-full h-10 rounded-lg" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="w-28 h-3 rounded-lg" />
        <Skeleton className="w-full h-44 rounded-lg" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="w-28 h-3 rounded-lg" />
        <Skeleton className="w-full h-10 rounded-lg" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="w-28 h-3 rounded-lg" />
        <Skeleton className="w-full h-10 rounded-lg" />
      </div>
      <Skeleton className="w-full h-12 rounded-lg" />
    </div>
  );
}
