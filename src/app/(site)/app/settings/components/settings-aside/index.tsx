"use client";

import { DesktopAside } from "@/components/feature/aside-menu/desktop-aside";
import { BackwardsNav } from "@/components/feature/nav/backwards";
import { IRLink } from "@/components/feature/nav/models";
import {
  CircleUserIcon,
  LockIcon,
  SunMoonIcon,
  UserRoundCog,
} from "lucide-react";

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
    href: "accessibility",
  },
  {
    icon: UserRoundCog,
    href: "account",
  },
];

const LINKS_MAPPED: IRLink[] = LINKS.map((linkItem): IRLink => {
  const newHref = `/app/settings/section/${linkItem.href}`;

  return {
    ...linkItem,
    href: newHref,
  };
});

console.log(LINKS_MAPPED);

export function SettingsAside() {
  return (
    <div className="w-full h-full bg-neutral-200 dark:bg-cm-gray">
      <div className="pt-5 flex items-center justify-center">
        <BackwardsNav catchHref="/app" />
      </div>
      <DesktopAside links={LINKS_MAPPED} />
    </div>
  );
}
