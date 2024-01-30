"use client";

import { NAV_LINKS } from "../../models/nav-links";
import { IconLink } from "@/components/feature/nav/icon-link";

export function MobileNavMenu() {
  return (
    <nav className="w-full py-2 flex items-center justify-center">
      <ul className="flex items-center justify-center gap-8 py-2 px-8 bg-neutral-200 border border-neutral-300 rounded-full">
        {NAV_LINKS.map((navLink) => (
          <li key={navLink.href}>
            <IconLink href={navLink.href} icon={navLink.icon} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
