"use client";

import Link from "next/link";
import { ILink } from "./left-aside.models";
import {
  HomeIcon,
  LinkIcon,
  SearchIcon,
  SettingsIcon,
  StarIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useUserProfile } from "@/hooks/use-user-profile";
import { Database } from "@/supabase/types";
import { Skeleton } from "@/components/ui/skeleton";
import { LazyImage } from "@/components/feature/lazy-image";

// each navLink must start with '/'
const LINKS: ILink[] = [
  {
    title: "Home",
    href: "/app",
    icon: HomeIcon,
  },
  {
    title: "Search",
    href: "/app/search",
    icon: SearchIcon,
  },
  {
    title: "My Pins",
    href: "/app/pins",
    icon: StarIcon,
  },
  {
    title: "Configuration",
    href: "/app/settings/section/profile",
    icon: SettingsIcon,
  },
];

export function AppLeftAside() {
  return (
    <aside className="h-screen w-full flex flex-col items-end gap-1 px-4 py-2 bg-neutral-200 dark:bg-cm-gray">
      <div className="w-max h-full flex flex-col justify-between gap-4">
        <div className="flex w-full h-full flex-col gap-4">
          <header className="pl-2 flex font-bold items-center gap-3"></header>
          <nav>
            <ul className="flex flex-col gap-4 w-max">
              {LINKS.map((linkItem) => (
                <li key={linkItem.href}>
                  <CustomNavLink
                    title={linkItem.title}
                    href={linkItem.href}
                    icon={linkItem.icon}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div>
          <UserProfile />
        </div>
      </div>
    </aside>
  );
}

export function CustomNavLink({ title, href, icon: Icon }: ILink) {
  const fullPath = usePathname();

  const isCurrentSectionHome = fullPath === "/app";

  let isActive: boolean = false;

  if (isCurrentSectionHome) {
    const isHrefToHome = href === "/app";
    if (isHrefToHome) isActive = true;
  }

  if (!isCurrentSectionHome) {
    const currentSection = fullPath.split("/").slice(1, 3).join("/");

    isActive = Boolean(href.startsWith(`/${currentSection}`));
  }

  return (
    <Link
      href={href}
      className={`py-3 px-3 pr-8 w-max flex gap-4 justify-start items-center rounded-full group transition-all hover:bg-neutral-300 dark:hover:bg-cm-lighter-gray delay-75`}
    >
      <Icon
        className={`w-6 h-6 ${
          isActive
            ? "dark:text-neutral-50"
            : "dark:group-hover:text-neutral-50 group-hover:text-neutral-900 text-neutral-600 dark:text-neutral-300"
        }`}
      />
      <span
        className={`${
          isActive
            ? "dark:text-neutral-50 text-neutral-900 font-bold"
            : "font-medium dark:group-hover:text-neutral-50 group-hover:text-neutral-900 text-neutral-600 dark:text-neutral-300"
        } transition-all delay-75`}
      >
        {title}
      </span>
    </Link>
  );
}

function UserProfile() {
  const { userProfile, isLoading: isLoadingUserProfile } = useUserProfile();

  function ActualUserProfile({
    userProfile,
  }: {
    userProfile: Database["public"]["Tables"]["profiles"]["Row"];
  }) {
    const getShortName = (name: string, maxLength: number) => {
      if (name.length <= maxLength) return name;

      const dots = Array(3).fill(".");

      const stringDesiredLength = maxLength - dots.length;

      const shortname = name.split("").slice(0, stringDesiredLength).join("");

      return shortname + dots.join("");
    };
    return (
      <article className="flex items-center gap-4 hover:bg-neutral-300 dark:hover:bg-cm-lighter-gray transition-all delay-75 py-2 px-4 rounded-full">
        <LazyImage
          alt={`${userProfile?.name ?? ""}'s Profile Picture`}
          className="w-12 h-12 rounded-full object-cover object-center aspect-square"
          skeletonClassName="w-12 h-12 rounded-full"
          src={userProfile?.avatar_url ?? ""}
        />
        <div>
          <span className="text-neutral-800 dark:text-neutral-50 font-semibold text-lg">
            {getShortName(userProfile.name ?? "no name yet", 12)}
          </span>
          <p className="text-neutral-600 dark:text-gray-300">
            @{getShortName(userProfile.username ?? "no username yet", 12)}
          </p>
        </div>
        <LinkIcon className="ml-5 text-neutral-900 dark:text-neutral-50" />
      </article>
    );
  }

  return (
    <>
      {isLoadingUserProfile && <Skeleton className="w-64 h-16 rounded-full" />}
      {!isLoadingUserProfile && userProfile && (
        <Link href={`/app/profile/${userProfile.username}`}>
          <ActualUserProfile userProfile={userProfile} />
        </Link>
      )}
    </>
  );
}
