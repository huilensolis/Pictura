"use client";

import { NAV_LINKS } from "../../../models/nav-links/";
import { CustomNavLink } from "@/components/feature/nav/link";

export function NavLinks() {
  return (
    <ul className="flex flex-col gap-4 w-full">
      {NAV_LINKS.map((linkItem) => (
        <li key={linkItem.href}>
          <CustomNavLink
            title={linkItem.title}
            href={linkItem.href}
            icon={linkItem.icon}
          />
        </li>
      ))}
    </ul>
  );
}
