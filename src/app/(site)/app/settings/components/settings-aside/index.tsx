"use client";

import { Aside } from "@/components/feature/aside-menu";
import { BackwardsNav } from "@/components/feature/nav/backwards";
import { IRLink } from "@/components/feature/nav/models";
import {
  ChevronLeftIcon,
  CircleUserIcon,
  LockIcon,
  SunMoonIcon,
  UserRoundCog,
} from "lucide-react";
import Link from "next/link";

const LINKS: IRLink[] = [
  {
    icon: CircleUserIcon,
    href: "profile",
  },
  {
    icon: LockIcon,
    href: "reset-password",
  },
  {
    icon: SunMoonIcon,
    href: "accesibility",
  },
  {
    icon: UserRoundCog,
    href: "account",
  },
];

export function SettingsAside() {
  return (
    <div className="w-full h-full bg-neutral-200 dark:bg-cm-gray">
      <div className="px-5 pt-5">
        <BackwardsNav catchHref="/app" />
      </div>
      <Aside links={LINKS} />
    </div>
  );
}
