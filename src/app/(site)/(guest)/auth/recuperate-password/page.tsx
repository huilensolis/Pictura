"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SubmitHandler, useForm } from "react-hook-form";

import { PrimaryButton } from "@/components/ui/buttons/primary";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { validateEmail } from "@/utils/validations/gmail";
import { useState } from "react";
import { Alert } from "@/components/ui/alert";
import Link from "next/link";
import { IForm } from "./recuperate-password.models";
import { useProtectRouteFromAuthUsers } from "../../../../../utils/auth/client-side-validations";

export default function LogInPage() {
  const [errorSendingEmail, setErrorSendingEmail] = useState<boolean>(false);
  const [wasEmailSent, setWasEmailSent] = useState<boolean>(false);
  const [emailWasAlreadySentBefore, setEmailWasAlreadySentBefore] =
    useState<boolean>(false);

  useProtectRouteFromAuthUsers();

  const supabase = createClientComponentClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IForm>({ mode: "onTouched" });

  const handleRecuperatePassword: SubmitHandler<IForm> = async (data) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${location.origin}/auth/recuperate-password/callback`,
      });
      if (error && error.status !== 429) {
        setErrorSendingEmail(true);
        setWasEmailSent(false);
        return;
      }
      if (error && error.status === 429) {
        setEmailWasAlreadySentBefore(true);
        setWasEmailSent(false);
        return;
      }

      setErrorSendingEmail(false);
      setWasEmailSent(true);
      setEmailWasAlreadySentBefore(false);
    } catch (error) {
      setErrorSendingEmail(true);
      setWasEmailSent(false);
      setEmailWasAlreadySentBefore(false);
    }
  };

  return (
    <section className="flex flex-col gap-6 max-w-[530px]">
      <article className="flex flex-col gap-2">
        <div className="mb-2">
          <Logo />
        </div>
        <h1 className="text-neutral-900 dark:text-neutral-50 text-3xl font-medium">
          Recuperate Password
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Write your email and we will send you a link to reset your password.
        </p>
      </article>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(handleRecuperatePassword)}
      >
        <Input
          type="text"
          id="email"
          label="Email"
          placeholder="myemail@gmail.com"
          register={register}
          error={errors.email}
          validationScheme={{
            required: { value: true, message: "email is required" },
            validate: (value: string) => {
              const isEmailCorrectFormat = validateEmail(value);

              if (!isEmailCorrectFormat) return "Invalid email format";
              else return true;
            },
          }}
        />
        <PrimaryButton
          isDisabled={isSubmitting || errors.root?.message ? true : false}
          style={{ marginTop: "0.5rem" }}
          isLoading={isSubmitting}
        >
          Send Password Recuperation Email
        </PrimaryButton>
        <div className="flex flex-col gap-2 mt-2">
          <span className="text-neutral-600 dark:text-neutral-400 text-center">
            have an account already?{" "}
            <Link
              href="/auth/log-in"
              className="text-blue-500 dark:text-blue-400 font-bold hover:underline"
            >
              Log In
            </Link>
          </span>
        </div>
        {errorSendingEmail && (
          <Alert
            type="error"
            title="Error"
            description="It looks like this email is not registered in our platform"
            onClose={() => setErrorSendingEmail(false)}
          />
        )}
        {wasEmailSent && (
          <Alert
            type="succes"
            title="We sent you an email to valdiate your identity"
            description="Check your inbox"
            onClose={() => setWasEmailSent(false)}
          />
        )}
        {emailWasAlreadySentBefore && (
          <Alert
            type="error"
            title="We have already sent an email to recuperate your password"
            description="For security reasons, you can not send many emails in a short period of time. Try again in a couple minutes!"
            onClose={() => setWasEmailSent(false)}
          />
        )}
      </form>
    </section>
  );
}
