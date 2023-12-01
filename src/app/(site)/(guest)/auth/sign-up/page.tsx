"use client";

import { PrimaryButton } from "@/components/ui/buttons/primary/primary";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";

export default function SingUpPage() {
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
      <form className="flex flex-col gap-2">
        <Input
          type="text"
          id="email"
          label="Email"
          placeholder="myemail@gmail.com"
        />
        <PrimaryButton>Sing Up</PrimaryButton>
      </form>
    </section>
  );
}
