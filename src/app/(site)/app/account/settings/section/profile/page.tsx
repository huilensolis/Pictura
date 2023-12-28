"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useProtectRouteFromUnauthUsers } from "@/utils/auth/client-side-validations";
import { ProfileConfigUsername } from "./components/username";
import { TextArea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ProfileFormAreas } from "./form.models";
import { useUserProfile } from "@/hooks/use-user-profile";
import { useUser } from "@/hooks/use-user";
import { PrimaryButton } from "@/components/ui/buttons/primary";
import { Database } from "@/supabase/types";
import { Alert } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { ImagePicker } from "@/components/ui/image-picker";

export default function ProfileConfigPage() {
  const [isFetchingDefaultValues, setIsFetchingDefaultValues] =
    useState<boolean>(true);
  const [userProfileDefaultData, setUserProfileDefaultData] = useState<
    Database["public"]["Tables"]["profiles"]["Row"] | null
  >(null);

  const [isUpdatingData, setIsUpdatingData] = useState<boolean>(false);
  const [errorUpdatingData, setErrorUpdatingData] = useState<string | null>(
    null,
  );

  const { getCurrentUserProfile, updateUserProfile } = useUserProfile();

  const { user, isLoading: isUserLoading } = useUser();

  useProtectRouteFromUnauthUsers();

  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProfileFormAreas>({ mode: "onTouched" });

  useEffect(() => {
    async function SyncCurrentUserProfile(userId: string) {
      setIsFetchingDefaultValues(true);

      const { data } = await getCurrentUserProfile(userId);

      if (data) {
        setUserProfileDefaultData(data);
      }

      setIsFetchingDefaultValues(false);
    }

    if (user?.id && !isUserLoading) {
      SyncCurrentUserProfile(user.id);
    }
  }, [user]);

  async function updateProfile(data: ProfileFormAreas) {
    const formatedData: Database["public"]["Tables"]["profiles"]["Row"] = {
      name: data.name,
      website: data.website,
      avatar_url: "",
      banner_url: "",
      location: data.location,
      description: data.description,
    } as Database["public"]["Tables"]["profiles"]["Row"];

    try {
      setIsUpdatingData(true);
      await updateUserProfile(formatedData, user?.id as string);
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
      {isFetchingDefaultValues && <FormSkeleton />}
      {!isFetchingDefaultValues && (
        <form
          className="w-full flex flex-col gap-2"
          onSubmit={handleSubmit(updateProfile)}
        >
          <div className="relative flex h-full w-full mb-20">
            <div className="w-full h-56">
              <ImagePicker
                label="Header"
                id="header"
                register={register}
                validationScheme={{ required: false }}
                error={errors.header ?? null}
                imagePlaceHolderClasses="w-full h-full rounded-lg"
              />
            </div>
            <div className="h-full absolute -bottom-40 left-5">
              <ImagePicker
                label="picture"
                id="picture"
                register={register}
                validationScheme={{ required: false }}
                error={errors.picture ?? null}
                imagePlaceHolderClasses="w-32 h-32 rounded-full border-neutral-200 dark:border-cm-gray border-2"
              />
            </div>
          </div>
          <ProfileConfigUsername
            defaultUsername={userProfileDefaultData?.username ?? ""}
          />
          <Input
            type="text"
            placeholder="Name"
            label="name"
            id="name"
            disabled={false}
            register={register}
            defaultValue={userProfileDefaultData?.name ?? ""}
            validationScheme={{
              required: "Area required",
            }}
            error={errors.name ? errors.name : null}
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
            defaultValue={userProfileDefaultData?.description ?? ""}
            placeholder={`Hello there! I am Huilen Solis, a Frontend Engineer seeking his first development job. I am a pixel art enthusiasm. I like pixel art wallpapers and lofi gif backgrounds!

Want to connect? check out my portfolio bellow.`}
          />
          <Input
            type="text"
            id="location"
            label="Location"
            defaultValue={userProfileDefaultData?.location ?? ""}
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
            defaultValue={userProfileDefaultData?.website ?? ""}
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
          <div className="mt-1">
            <PrimaryButton type="submit" isLoading={isUpdatingData}>
              Save
            </PrimaryButton>
          </div>
          {errorUpdatingData && (
            <Alert
              type="error"
              title="Error updating profile"
              description={errorUpdatingData}
            />
          )}
        </form>
      )}
    </>
  );
}
function FormSkeleton() {
  return <>Form Skeleton</>;
}
