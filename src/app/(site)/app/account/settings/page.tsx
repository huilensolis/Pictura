"use client";

import { Aside } from "@/components/feature/aside-menu";
import { ILink } from "@/components/feature/aside-menu/shared.models";
import { BackwardsNav } from "@/components/feature/nav/backwards";
import {
  CircleUserIcon,
  CreditCardIcon,
  LockIcon,
  SunMoonIcon,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="w-full flex justify-center items-start bg-neutral-200 dark:bg-cm-gray h-screen">
      <div className="w-full max-w-2xl flex flex-col items-center justify-center">
        <div className="w-full flex px-5 pt-10">
          <BackwardsNav />
        </div>
        <div className="w-full">
          <SettingsMenu />;
        </div>
      </div>
    </div>
  );
}

const LINKS: ILink[] = [
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

export function SettingsMenu() {
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
