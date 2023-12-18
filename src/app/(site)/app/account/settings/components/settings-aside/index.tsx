"use client";

import { Aside } from "@/components/feature/aside-menu";
import { ILink } from "@/components/feature/aside-menu/shared.models";
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
    <div className="sticky top-0">
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
