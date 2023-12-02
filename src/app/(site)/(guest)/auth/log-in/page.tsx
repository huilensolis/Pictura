"use client";

import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SubmitHandler, useForm } from "react-hook-form";

import { PrimaryButton } from "@/components/ui/buttons/primary/primary";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { AuthFormAreas } from "../auth-form.models";
import { validateEmail } from "@/utils/validations/gmail";

export default function LogInPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormAreas>({ mode: "onTouched" });

  const handleSignUp: SubmitHandler<AuthFormAreas> = (data) => {
    console.log(data);
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
        onSubmit={handleSubmit(handleSignUp)}
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
          disabled={isSubmitting || errors.root?.message ? true : false}
        >
          {isSubmitting ? "Loggin In..." : "Log In"}
        </PrimaryButton>
      </form>
    </section>
  );
}
