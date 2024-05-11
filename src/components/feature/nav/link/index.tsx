"use client";

import { ILink } from "@/app/(site)/app/models/nav-links/nav-links.models";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function CustomNavLink({ title, href, icon: Icon }: ILink) {
  const fullPath = usePathname();

  const isCurrentSectionHome = fullPath === "/app";

  let isActive: boolean = false;

  if (isCurrentSectionHome) {
    const isHrefToHome = href === "/app";
    if (isHrefToHome) isActive = true;
  }

  if (!isCurrentSectionHome) {
    const currentSection = fullPath.split("/").slice(1, 4).join("/");

    isActive = Boolean(href.startsWith(`/${currentSection}`));
  }

  return (
    <Link
      href={href}
      className={`py-3 px-3 pr-8 w-full flex gap-4 justify-start items-center rounded-md group transition-all hover:bg-neutral-300 dark:hover:bg-cm-lighter-gray duration-150`}
    >
      <Icon
        className={`w-6 h-6 ${
          isActive
            ? "dark:text-neutral-50"
            : "dark:group-hover:text-neutral-50 group-hover:text-neutral-900 text-neutral-800 dark:text-neutral-300"
        }`}
      />
      <span
        className={`${
          isActive
            ? "dark:text-neutral-50 text-neutral-900 font-bold"
            : "font-medium dark:group-hover:text-neutral-50 group-hover:text-neutral-900 text-neutral-800 dark:text-neutral-300"
        } transition-all delay-75`}
      >
        {title}
      </span>
    </Link>
  );
}
