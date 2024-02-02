"use client";

import { Heading } from "@/components/ui/typography/heading";
import Link from "next/link";
import { DesktopAsideProps } from "./desktop-aside.models";

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
        {links.map((linkItem) => {
          const Icon = linkItem.icon;

          return (
            <li
              key={linkItem.href}
              className={`w-full py-3 px-3 text-neutral-700 dark:text-neutral-400 hover:text-neutral-300 transition-all duration-75  ${
                showBorderOnLinks &&
                "border-b border-neutral-300 dark:border-neutral-700"
              }`}
            >
              <Link
                href={linkItem.href}
                className="w-full flex justify-center items-center gap-4"
              >
                <Icon className="w-6 h-6" />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
