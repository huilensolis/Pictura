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

export default function SettingsPage() {
  return (
    <div className="w-full flex justify-center items-start bg-neutral-200 dark:bg-cm-gray h-screen">
      <div className="w-full max-w-2xl flex flex-col items-center justify-center">
        <div className="w-full flex px-5 pt-10 pb-1">
          <Link
            href="/app"
            className="w-max flex justify-center items-center p-2 bg-neutral-300 dark:bg-neutral-700 rounded-xl dark:text-neutral-200 text-neutral-900"
          >
            <ChevronLeftIcon />
          </Link>
        </div>
        <div className="w-full">
          <SettingsMenu />;
        </div>
      </div>
    </div>
  );
}
interface ITLink extends ILink {
  title: string;
}
const LINKS: ITLink[] = [
  {
    title: "Edit Profile",
    icon: CircleUserIcon,
    href: "settings/section/profile",
  },
  {
    title: "Reset Password",
    icon: LockIcon,
    href: "settings/section/reset-password",
  },
  {
    title: "Manage Subscription",
    icon: CreditCardIcon,
    href: "",
  },
  {
    title: "Accesibility",
    icon: SunMoonIcon,
    href: "settings/section/accesibility",
  },
];

function SettingsMenu() {
  return (
    <Aside
      header={{
        title: "Account Settings",
        subtitle: "Configurate your account",
      }}
      showBorderOnLinks
      links={LINKS}
    />
  );
}
