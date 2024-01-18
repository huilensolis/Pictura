"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { deleteAccount as actionDeleteAccount } from "./actions/delete-account";
import { useSupabase } from "@/hooks/use-supabase";

export function DeleteAccountBtn() {
  const [showInput, setShowInput] = useState<boolean>(false);

  const { supabase } = useSupabase();

  const STRING = "Delete my account";

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ "delete-account": string }>({ mode: "onChange" });

  async function deleteAccount() {
    const { data, error } = await supabase.auth.getUser();

    if (!data || error || !data.user.id) return;

    const formData = new FormData();
    formData.append("userId", data.user.id);

    actionDeleteAccount(formData);
  }

  return (
    <form
      onSubmit={handleSubmit(deleteAccount)}
      className="flex flex-col gap-4"
    >
      {showInput && (
        <Input
          type="text"
          label={`Type "${STRING}" to delete your account`}
          id="delete-account"
          error={errors["delete-account"]}
          register={register}
          validationScheme={{
            required: { value: true, message: "Area required" },
            validate: (inputValue: string) => {
              if (inputValue !== STRING) {
                return `Text doesnt match with ${STRING}`;
              }

              return true;
            },
          }}
        />
      )}
      <button
        onClick={showInput ? () => {} : () => setShowInput(true)}
        type={showInput ? "submit" : "button"}
        disabled={!isValid}
        className="w-full px-4 py-2 bg-red-500 disabled:grayscale transition-all delay-75 text-center font-medium text-neutral-50 rounded-sm"
      >
        Delete Account
      </button>
    </form>
  );
}
