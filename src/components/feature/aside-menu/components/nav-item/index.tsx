"use client";

import Link from "next/link";
import { ILink } from "../../shared.models";
import { usePathname } from "next/navigation";

export function AsideNavLink({ title, href, icon: Icon }: ILink) {
  const fullPath = usePathname();

  const pathSections = fullPath?.split("/");
  const actualSection = pathSections[pathSections.length - 1];
  const isActive = href === actualSection;

  return (
    <Link
      href={href}
      className={`p-3 w-full flex gap-4 justify-start items-center rounded-md group transition-colors delay-[25ms] ${
        isActive && "dark:bg-cm-lighter-gray bg-neutral-300"
      }`}
    >
      <Icon
        className={`w-6 h-6 ${
          isActive
            ? "dark:text-neutral-50"
            : "dark:group-hover:text-neutral-50 group-hover:text-neutral-900 dark:text-neutral-400 text-neutral-500"
        }`}
      />
      <span
        className={`text-blue-600 dark:text-neutral-400 font-medium ${
          isActive
            ? "dark:text-neutral-50 text-neutral-900"
            : "dark:group-hover:text-neutral-50 group-hover:text-neutral-900 text-neutral-500"
        } transition-all delay-75`}
      >
        {title}
      </span>
    </Link>
  );
}
