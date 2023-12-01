"use client";

import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SubmitHandler, useForm } from "react-hook-form";

import { PrimaryButton } from "@/components/ui/buttons/primary/primary";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { singUpFormAreas } from "./sing-up.models";

export default function SingUpPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<singUpFormAreas>();

  const handleSignUp: SubmitHandler<singUpFormAreas> = (data) => {
    console.log(data);
  };

  return (
    <section className="flex flex-col gap-6 max-w-[530px]">
      <article className="flex flex-col gap-2">
        <div className="mb-2">
          <Logo />
        </div>
        <h1 className="text-neutral-900 dark:text-neutral-50 text-3xl font-medium">
          Sing Up
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
          label="email"
          placeholder="myemail@gmail.com"
          register={register}
          error={null}
          validationScheme={{ required: "email is required" }}
        />
        <Input
          type="password"
          id="password"
          label="Password"
          placeholder="*********"
          register={register}
          error={null}
          validationScheme={{ required: "password is required" }}
        />
        <PrimaryButton>Sing Up</PrimaryButton>
      </form>
    </section>
  );
}
