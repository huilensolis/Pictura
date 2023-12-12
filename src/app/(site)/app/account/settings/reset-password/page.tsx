"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import { PrimaryButton } from "@/components/ui/buttons/primary";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { useState } from "react";
import { Alert } from "@/components/ui/alert";
import Link from "next/link";
import { Iform } from "./form.models";
import { useUser } from "@/hooks/use-user";

export default function ResetPasswordPage() {
  const [wasPasswordUpated, setPasswordUpdated] = useState<boolean>(false);
  const [wasAnErrorUpadingPassword, setWasAnErrorUpdatingPassword] =
    useState<boolean>(false);

  const { updatePassword } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<Iform>({ mode: "onTouched" });

  const handleRecuperatePassword: SubmitHandler<Iform> = async (data) => {
    try {
      await updatePassword(data.password);
      setPasswordUpdated(true);
      setWasAnErrorUpdatingPassword(false);
    } catch (error) {
      setWasAnErrorUpdatingPassword(true);
    }
  };

  return (
    <section className="flex flex-col gap-6 max-w-[530px]">
      <article className="flex flex-col gap-2">
        <div className="mb-2">
          <Logo />
        </div>
        <h1 className="text-neutral-900 dark:text-neutral-50 text-3xl font-medium">
          Reset Password
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Type your new password, make sure to rememer it next time.
        </p>
      </article>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(handleRecuperatePassword)}
      >
        <Input
          type="password"
          id="password"
          label="password"
          placeholder="********"
          register={register}
          error={errors.password?.message ? errors.password : null}
          validationScheme={{
            required: { value: true, message: "new Password is required" },
            minLength: {
              value: 8,
              message: "password must be at least 8 characters",
            },
          }}
        />
        <Input
          type="password"
          id="confirm-password"
          label="Confirm Password"
          placeholder="********"
          register={register}
          error={
            errors["confirm-password"]?.message
              ? errors["confirm-password"]
              : null
          }
          validationScheme={{
            required: { value: true, message: "new Password is required" },
            minLength: {
              value: 8,
              message: "password must be at least 8 characters",
            },
            validate: (value: string) => {
              const password = getValues("password");
              const confirmPassword = value;
              if (password !== confirmPassword) return "passwords do not match";
              else return true;
            },
          }}
        />
        <PrimaryButton
          isDisabled={isSubmitting || errors.root?.message ? true : false}
          style={{ marginTop: "0.5rem" }}
          isLoading={isSubmitting}
        >
          Update Password
        </PrimaryButton>
        {wasAnErrorUpadingPassword && (
          <Alert
            type="error"
            title="Error"
            description="There is been an error trying to update the password, please try again later"
            onClose={() => setWasAnErrorUpdatingPassword(false)}
          >
            <div>
              <span className="text-neutral-600 dark:text-neutral-400">
                If the error persist, please contact us on
                <a href="https://www.x.com/picturaasdfasd" target="_blank">
                  X/Twitter
                </a>
              </span>
            </div>
          </Alert>
        )}
        {wasPasswordUpated && (
          <Alert
            type="succes"
            title="Succes"
            description="Password Upadeted"
            onClose={() => setPasswordUpdated(false)}
          >
            <div>
              <span className="text-neutral-600 dark:text-neutral-400">
                Now you can{" "}
                <Link
                  href={`${location.origin}/app`}
                  className="font-bold text-green-600 dark:text-green-500"
                >
                  go back to app
                </Link>
              </span>
            </div>
          </Alert>
        )}
      </form>
    </section>
  );
}
