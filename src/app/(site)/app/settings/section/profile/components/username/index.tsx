"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { IFormUsernameArea } from "./form.models";
import { useUser } from "@/hooks/use-user";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/spinner";
import { useSupabase } from "@/hooks/use-supabase";

export function ProfileConfigUsername({
  defaultUsername = "",
}: {
  defaultUsername?: string;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean>(true);

  const { user } = useUser();

  const { supabase } = useSupabase();
  const { debouncedValue: debouncedSearchValue } = useDebounce(
    searchValue,
    500,
  );

  const {
    register,
    formState: { errors },
    setError,
  } = useForm<IFormUsernameArea>({ mode: "onChange" });

  useEffect(() => {
    async function validateUsername() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("username", debouncedSearchValue)
          .single();

        if (!data || error) {
          setIsUsernameAvailable(true);
          return;
        }
        setIsUsernameAvailable(false);
      } catch (error) {
        setIsUsernameAvailable(false);
      } finally {
        setIsLoading(false);
      }
      if (
        debouncedSearchValue === searchValue &&
        user?.id &&
        !errors.username
      ) {
        try {
          const { error } = await supabase
            .from("profiles")
            .update({ username: debouncedSearchValue })
            .eq("user_id", user.id)
            .single();

          if (error) throw error;
        } catch (error) {
          //
        }
      }
    }
    if (debouncedSearchValue && !errors.username) {
      validateUsername();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (!isUsernameAvailable)
      setError("username", { message: "username is not available" });
  }, [isUsernameAvailable]);

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
          maxLength: { value: 9, message: "Max length is 9" },
          onChange(event: React.ChangeEvent<HTMLInputElement>) {
            setSearchValue(event.target.value);
          },
          validate: (value: string) => {
            console.log(value);
            if (value.toLowerCase() !== value) {
              return "Username must be in lowercase";
            }
            return true;
          },
        }}
        error={errors.username}
      />
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
