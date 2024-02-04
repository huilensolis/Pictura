"use client";

import { Heading } from "@/components/ui/typography/heading";
import { DesktopAsideProps } from "./desktop-aside.models";
import { IconLink } from "../../nav/icon-link";

export function DesktopAside({
  links,
  header,
  showBorderOnLinks = false,
}: DesktopAsideProps) {
  return (
    <nav className="w-full dark:bg-cm-gray bg-neutral-200 p-5">
      {header && header.title && header.subtitle && (
        <article className="flex flex-col w-full">
          <Heading extraClasses="font-semibold" level={8}>
            {header.title}
          </Heading>
          <p className="text-neutral-600 dark:text-neutral-400 mb-12">
            {header.subtitle}
          </p>
        </article>
      )}
      <ul className="flex flex-col gap-4 justify-center items-center">
        {links.map((linkItem) => (
          <li
            key={linkItem.href}
            className={`w-full text-neutral-700 dark:text-neutral-400 hover:text-neutral-300 transition-all duration-75  ${
              showBorderOnLinks &&
              "border-b border-neutral-300 dark:border-neutral-700"
            }`}
          >
            <IconLink href={linkItem.href} icon={linkItem.icon} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
