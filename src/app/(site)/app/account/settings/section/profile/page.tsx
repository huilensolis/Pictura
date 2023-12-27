"use client";

import { useProtectRouteFromUnauthUsers } from "@/utils/auth/client-side-validations";
import { ProfileConfigUsername } from "./components/username";
import { TextArea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { ProfileFormAreas } from "./form.models";
import { useEffect, useState } from "react";
import { useUserProfile } from "@/hooks/use-user-profile";
import { useUser } from "@/hooks/use-user";
import { PrimaryButton } from "@/components/ui/buttons/primary";
import { Database } from "@/supabase/types";
import { Alert } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

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
    try {
      setIsUpdatingData(true);
      await updateUserProfile(
        data as Database["public"]["Tables"]["profiles"]["Row"],
        user?.id as string,
      );
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
        <form className="w-full" onSubmit={handleSubmit(updateProfile)}>
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
          <div className="w-full flex flex-col gap-2 h-[contet]">
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
  return <>skeleton</>;
}
