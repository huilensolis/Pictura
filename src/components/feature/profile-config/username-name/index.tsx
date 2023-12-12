"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { IFormUsernameNameAreas } from "./form.models";
import { useUser } from "@/hooks/use-user";
import { PrimaryButton } from "@/components/ui/buttons/primary";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { useUserProfile } from "@/hooks/use-user-profile";
import { LoadingSpinner } from "@/components/ui/spinner";

export function ProfileConfigUsernameAndName() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isUsernameAvailable, setIsUsernameAvailable] =
    useState<boolean>(false);
  const [errorWhileUpdatingData, setErrorWhileUpdatingData] =
    useState<boolean>(false);
  const [succesWhileUpdatingData, setSuccesWhileUpdatingData] =
    useState<boolean>(false);

  const { validateIfUsernameIsAvailabe } = useUser();
  const { debouncedValue: debouncedSearchValue } = useDebounce(
    searchValue,
    500
  );

  useEffect(() => {
    async function validateUsername() {
      setIsLoading(true);
      try {
        const isThisUsernameAvailable = await validateIfUsernameIsAvailabe(
          debouncedSearchValue
        );
        setIsUsernameAvailable(isThisUsernameAvailable);
      } catch (error) {
        setIsUsernameAvailable(false);
      }
      setIsLoading(false);
    }
    if (debouncedSearchValue) {
      validateUsername();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormUsernameNameAreas>({ reValidateMode: "onChange" });

  const { updateUserProfile } = useUserProfile();

  const { user } = useUser();

  async function onSubmit(data: IFormUsernameNameAreas) {
    if (!data.username || !data.name) return;
    if (typeof data.username !== "string" || typeof data.name !== "string")
      return;

    if (!user || user.id) return;

    try {
      await updateUserProfile(
        {
          username: data.username,
          name: data.name,
        } as any,
        user?.id
      );
      setErrorWhileUpdatingData(false);
      setSuccesWhileUpdatingData(true);
    } catch (error) {
      setErrorWhileUpdatingData(true);
      setSuccesWhileUpdatingData(false);
    }
  }
  const isSubmitBtnDisabled =
    isSubmitting || (errors.root?.message ? true : false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
        validationScheme={{ required: "Area required" }}
        error={errors.name ? errors.name : null}
      />
      {errorWhileUpdatingData && (
        <div className="m-4">
          <Alert
            type="error"
            title="Error"
            description="Something went wrong"
            onClose={() => setErrorWhileUpdatingData(false)}
          />
        </div>
      )}
      {succesWhileUpdatingData && (
        <div className="m-4">
          <Alert
            type="succes"
            description="Data Updated"
            title="Data Updated"
            onClose={() => setSuccesWhileUpdatingData(false)}
          />
        </div>
      )}
      <div className="mt-2 w-full">
        <PrimaryButton
          type="submit"
          isDisabled={isSubmitting || isSubmitBtnDisabled}
        >
          Save Data
        </PrimaryButton>
      </div>
    </form>
  );
}
