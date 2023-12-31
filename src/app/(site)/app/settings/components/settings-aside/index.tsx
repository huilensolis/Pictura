"use client";

import { Aside } from "@/components/feature/aside-menu";
import { ILink } from "@/components/feature/aside-menu/shared.models";
import {
  ChevronLeftIcon,
  CircleUserIcon,
  CreditCardIcon,
  LockIcon,
  SunMoonIcon,
} from "lucide-react";
import Link from "next/link";

const LINKS: ILink[] = [
  {
    title: "Edit Profile",
    icon: CircleUserIcon,
    href: "profile",
  },
  {
    title: "Reset Password",
    icon: LockIcon,
    href: "reset-password",
  },
  {
    title: "Manage Subscription",
    icon: CreditCardIcon,
    href: "",
  },
  {
    title: "Accesibility",
    icon: SunMoonIcon,
    href: "accesibility",
  },
];

export function SettingsAside() {
  return (
    <div className="w-full h-full bg-neutral-200 dark:bg-cm-gray">
      <div className="px-5 pt-5">
        <Link
          href="/app/account/settings/"
          className="w-max flex justify-center items-center p-2 bg-neutral-300 dark:bg-neutral-700 rounded-xl dark:text-neutral-200 text-neutral-900"
        >
          <ChevronLeftIcon />
        </Link>
      </div>
      <Aside
        header={{
          title: "Account Settings",
          subtitle: "Configurate your account",
        }}
        links={LINKS}
      />
    </div>
  );
}
