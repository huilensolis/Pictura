"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { deleteAccount as actionDeleteAccount } from "./actions/delete-account";
import { useSupabase } from "@/hooks/use-supabase";
import { useRouter } from "next/navigation";

export function DeleteAccountBtn() {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { supabase } = useSupabase();

  const STRING = "Delete my account";

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ "delete-account": string }>({ mode: "onChange" });

  const router = useRouter();

  async function deleteAccount() {
    try {
      setLoading(true);
      const { data, error: errorGettingUser } = await supabase.auth.getUser();

      if (!data || errorGettingUser || !data.user.id) return;

      const formData = new FormData();
      formData.append("userId", data.user.id);

      await actionDeleteAccount();

      const { error } = await supabase.auth.signOut();

      if (error) throw new Error("error signing out");

      router.refresh();
    } catch (error) {
      router.refresh();
    } finally {
      setLoading(false);
    }
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
        disabled={!isValid || loading}
        className="w-full px-4 py-2 bg-red-500 disabled:grayscale transition-all delay-75 text-center font-medium text-neutral-50 rounded-sm"
      >
        {loading ? "Loading..." : "Delete Account"}
      </button>
    </form>
  );
}
