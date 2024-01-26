"use client";

import { Aside } from "@/components/feature/aside-menu";
import { ILink } from "@/components/feature/aside-menu/shared.models";
import {
  ChevronLeftIcon,
  CircleUserIcon,
  LockIcon,
  SunMoonIcon,
  UserRoundCog,
} from "lucide-react";
import Link from "next/link";

const LINKS: ILink[] = [
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
        <Link
          href="/app/settings/"
          className="w-max flex justify-center items-center p-2 bg-neutral-300 dark:bg-neutral-700 rounded-xl dark:text-neutral-200 text-neutral-900"
        >
          <ChevronLeftIcon />
        </Link>
      </div>
      <Aside links={LINKS} />
    </div>
  );
}
