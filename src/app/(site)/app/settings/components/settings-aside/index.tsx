"use client";

import { DesktopAside } from "@/components/feature/aside-menu/desktop-aside";
import { BackwardsNav } from "@/components/feature/nav/backwards";
import { IRLink } from "@/components/feature/nav/models";
import { ClientRouting } from "@/models/routing/client";
import {
  CircleUserIcon,
  LockIcon,
  SunMoonIcon,
  UserRoundCog,
} from "lucide-react";

const LINKS: IRLink[] = [
  {
    icon: CircleUserIcon,
    href: ClientRouting.configuration.editProfile,
  },
  {
    icon: LockIcon,
    href: ClientRouting.configuration.resetPassword,
  },
  {
    icon: SunMoonIcon,
    href: ClientRouting.configuration.accessibility,
  },
  {
    icon: UserRoundCog,
    href: ClientRouting.configuration.account,
  },
];

export function SettingsAside() {
  return (
    <div className="w-full h-full bg-neutral-200 dark:bg-cm-gray">
      <div className="pt-5 flex items-center justify-center">
        <BackwardsNav catchHref="/app" />
      </div>
      <DesktopAside links={LINKS} />
    </div>
  );
}
