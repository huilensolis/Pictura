"use client";

import Link from "next/link";
import { IRLink } from "../models";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function IconLink({ href, icon: Icon }: IRLink) {
  const [isActive, setActive] = useState<boolean>(false);

  const pathName = usePathname();

  useEffect(() => {
    const isHomeHref = href === "/app";

    if (isHomeHref) {
      if (pathName === "/app") {
        setActive(true);
      } else {
        setActive(false);
      }
      return;
    }

    const isPathActive = Boolean(
      pathName === href || pathName.startsWith(href),
    );

    if (isPathActive) console.log(href);

    setActive(isPathActive);
  }, [pathName]);

  return (
    <Link
      href={href}
      className={`p-2 w-full flex gap-4 justify-start items-center rounded-md group transition-colors delay-[25ms] ${
        isActive && "dark:bg-cm-lighter-gray bg-neutral-300"
      }`}
    >
      <Icon
        className={`w-6 h-6 ${
          isActive
            ? "dark:text-neutral-50 text-neutral-900"
            : "dark:group-hover:text-neutral-50 group-hover:text-neutral-900 dark:text-neutral-400 text-neutral-500"
        }`}
      />
    </Link>
  );
}
