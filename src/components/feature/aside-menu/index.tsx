"use client";

import { Heading } from "@/components/ui/typography/heading";
import { IAsideMenuProps } from "./aside-menu.models";
import { AsideNavLink } from "./components/nav-item";

export function Aside({ links, header: { title, subtitle } }: IAsideMenuProps) {
  return (
    <nav className="w-[20rem] h-full min-h-screen border-r border-neutral-200 dark:border-neutral-700 dark:bg-cm-gray bg-neutral-200 px-5 py-10">
      <article className="flex flex-col h-full w-full px-3">
        <Heading extraClasses="font-semibold" level={8}>
          {title}
        </Heading>
        <p className="text-neutral-600 dark:text-neutral-400 mb-12">
          {subtitle}
        </p>
      </article>
      <ul className="flex flex-col gap-4 justify-center items-center">
        {links.map((linkItem) => (
          <li key={linkItem.href} className="w-full">
            <AsideNavLink
              title={linkItem.title}
              href={linkItem.href}
              icon={linkItem.icon}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
