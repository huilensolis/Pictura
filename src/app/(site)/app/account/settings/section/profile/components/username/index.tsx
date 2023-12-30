"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { IFormUsernameArea } from "./form.models";
import { useUser } from "@/hooks/use-user";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect, useState } from "react";
import { useUserProfile } from "@/hooks/use-user-profile";
import { LoadingSpinner } from "@/components/ui/spinner";
import { Database } from "@/supabase/types";

export function ProfileConfigUsername({
  defaultUsername = "",
}: {
  defaultUsername?: string;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isUsernameAvailable, setIsUsernameAvailable] =
    useState<boolean>(false);

  const { updateUserProfile, validateIfUsernameIsAvailabe } = useUserProfile();

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
        try {
          await updateUserProfile(
            {
              username: debouncedSearchValue,
            } as Database["public"]["Tables"]["profiles"]["Row"],
            user.id,
          );
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
  } = useForm<IFormUsernameArea>({ reValidateMode: "onChange" });

  return (
    <div className="w-full">
      <Input
        type="text"
        placeholder="Username"
        label="username"
        id="username"
        disabled={false}
        register={register}
        defaultValue={defaultUsername}
        validationScheme={{
          required: "Area required",
          validate: () => {
            if (!isUsernameAvailable) return false;
            return true;
          },
          onChange(event: React.ChangeEvent<HTMLInputElement>) {
            setSearchValue(event.target.value);
          },
        }}
        error={errors.username}
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
    </div>
  );
}
