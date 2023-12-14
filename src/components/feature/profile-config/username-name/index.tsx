"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { IFormUsernameNameAreas } from "./form.models";
import { useUser } from "@/hooks/use-user";
import { useDebounce } from "@/hooks/use-debounce";
import { ChangeEvent, useEffect, useState } from "react";
import { useUserProfile } from "@/hooks/use-user-profile";
import { LoadingSpinner } from "@/components/ui/spinner";
import { Database } from "@/supabase/types";

export function ProfileConfigUsernameAndName() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isUsernameAvailable, setIsUsernameAvailable] =
    useState<boolean>(false);

  const {
    updateUserProfile,
    updateProfileStoreData,
    validateIfUsernameIsAvailabe,
  } = useUserProfile();

  const { user } = useUser();

  const { debouncedValue: debouncedSearchValue } = useDebounce(
    searchValue,
    500,
  );

  useEffect(() => {
    async function validateUsername() {
      setIsLoading(true);
      try {
        const isThisUsernameAvailable = await validateIfUsernameIsAvailabe(
          debouncedSearchValue,
          user?.id as string,
        );
        setIsUsernameAvailable(isThisUsernameAvailable);
      } catch (error) {
        setIsUsernameAvailable(false);
      }
      setIsLoading(false);

      if (
        debouncedSearchValue === searchValue &&
        user?.id &&
        !errors.username
      ) {
        console.log(!errors.username);
        try {
          await updateUserProfile(
            {
              username: debouncedSearchValue,
            } as Database["public"]["Tables"]["profiles"]["Row"],
            user.id,
          );
          updateProfileStoreData({
            username: debouncedSearchValue,
          } as Database["public"]["Tables"]["profiles"]["Row"]);
        } catch (error) {
          //
        }
      }
    }
    if (debouncedSearchValue) {
      validateUsername();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  const {
    register,
    formState: { errors },
  } = useForm<IFormUsernameNameAreas>({ reValidateMode: "onChange" });

  function updateProfileName(name: string) {
    if (errors.name) return;
    updateProfileStoreData({
      name,
    } as Database["public"]["Tables"]["profiles"]["Row"]);
  }

  return (
    <form className="w-full">
      <Input
        type="text"
        placeholder="Username"
        label="username"
        id="username"
        disabled={false}
        register={register}
        validationScheme={{
          required: "Area required",
          validate: () => {
            if (!isUsernameAvailable) return false;
            return true;
          },
          onChange(event) {
            setSearchValue(event.target.value);
          },
        }}
        error={errors.username ? errors.username : null}
      />
      {!isLoading &&
        debouncedSearchValue &&
        debouncedSearchValue.length > 0 &&
        !isUsernameAvailable && (
          <span className="text-red-500 dark:text-red-400">
            username is not available
          </span>
        )}
      {isLoading && (
        <div className="flex gap-2 mt-1">
          <LoadingSpinner size={20} />
          <span className="text-neutral-900 dark:text-neutral-50">
            Checking username Availability
          </span>
        </div>
      )}
      <Input
        type="text"
        placeholder="Name"
        label="name"
        id="name"
        disabled={false}
        register={register}
        validationScheme={{
          required: "Area required",
          onChange: (e: ChangeEvent<HTMLInputElement>) =>
            updateProfileName(e.target.value),
        }}
        error={errors.name ? errors.name : null}
      />
    </form>
  );
}
