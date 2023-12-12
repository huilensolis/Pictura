"use client";

import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { PrimaryButton } from "@/components/ui/buttons/primary";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { AuthFormAreas } from "../auth-form.models";
import { validateEmail } from "@/utils/validations/gmail";
import { useState } from "react";
import { Alert } from "@/components/ui/alert";
import { useProtectRouteFromAuthUsers } from "@/utils/auth/client-side-validations";

export default function LogInPage() {
  const [errorLogginIn, setErrorLogginIn] = useState<boolean>(false);

  useProtectRouteFromAuthUsers();

  const supabase = createClientComponentClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormAreas>({ mode: "onTouched" });

  const handleLogIn: SubmitHandler<AuthFormAreas> = async (data) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        password: data.password,
        email: data.email,
      });
      if (error) {
        setErrorLogginIn(true);
        return;
      }
      setErrorLogginIn(false);
      router.push(`${location.origin}/app`);
    } catch (error) {
      setErrorLogginIn(true);
    }
  };

  return (
    <section className="flex flex-col gap-6 max-w-[530px]">
      <article className="flex flex-col gap-2">
        <div className="mb-2">
          <Logo />
        </div>
        <h1 className="text-neutral-900 dark:text-neutral-50 text-3xl font-medium">
          Log In
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Get acces to a pixel art feed, create your profile and interact!
        </p>
      </article>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(handleLogIn)}
      >
        <Input
          type="text"
          id="email"
          label="Email"
          placeholder="myemail@gmail.com"
          register={register}
          error={errors.email?.message ? errors.email : null}
          validationScheme={{
            required: { value: true, message: "email is required" },
            validate: (value: string) => {
              const isEmailCorrectFormat = validateEmail(value);

              if (!isEmailCorrectFormat) return "Invalid email format";
              else return true;
            },
          }}
        />
        <Input
          type="password"
          id="password"
          label="Password"
          placeholder="*********"
          register={register}
          error={errors.password?.message ? errors.password : null}
          validationScheme={{
            required: { value: true, message: "password is required" },
            minLength: {
              value: 8,
              message: "password must be at least 8 characters",
            },
          }}
        />
        <PrimaryButton
          isDisabled={isSubmitting || errors.root?.message ? true : false}
          isLoading={isSubmitting}
          style={{ marginTop: "0.5rem" }}
        >
          Log In
        </PrimaryButton>
        <div className="flex flex-col gap-2 mt-2">
          <span className="text-neutral-600 dark:text-neutral-400 text-center">
            Dont have an account yet?{" "}
            <Link
              href="/auth/sign-up"
              className="text-blue-500 dark:text-blue-400 font-bold hover:underline"
            >
              Sing Up
            </Link>
          </span>
          <span className="flex md:flex-row flex-col items-center justify-center gap-1 text-neutral-600 dark:text-neutral-400 text-center">
            Forgot your password?{" "}
            <Link
              href="/auth/recuperate-password"
              className="text-blue-500 dark:text-blue-400 font-bold hover:underline"
            >
              Recuperate Password
            </Link>
          </span>
        </div>
        {errorLogginIn && (
          <Alert
            type="error"
            title="Error"
            description="There has been an error trying to log in"
            onClose={() => setErrorLogginIn(false)}
          >
            <div className="flex flex-col text-neutral-900 dark:text-neutral-50">
              <span className="dark:text-red-500 text-red-600">
                For security reasons, we can not know why the attemp failed.
              </span>
              <span>Make sure that:</span>
              <ol>
                <li>
                  <span>- Your account exists</span>
                </li>
                <li>
                  <span>- Your password is correct</span>
                </li>
                <li>
                  <span>
                    - You are using the correct authentication provider
                  </span>
                </li>
              </ol>
            </div>
          </Alert>
        )}
      </form>
    </section>
  );
}
