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
    <div className="w-full h-full bg-neutral-200">
      <div className="w-full px-8 pt-5">
        <BackwardsNav />
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
