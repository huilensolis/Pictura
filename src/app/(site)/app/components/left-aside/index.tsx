"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkIcon } from "lucide-react";
import { useUserProfile } from "@/hooks/use-user-profile";
import { Database } from "@/supabase/types";
import { Skeleton } from "@/components/ui/skeleton";
import { LazyImage } from "@/components/feature/lazy-image";
import { NAV_LINKS } from "../../models/nav-links/";
import { type ILink } from "../../models/nav-links/nav-links.models";
import { CustomNavLink } from "@/components/feature/nav/link";

export function AppLeftAside() {
  return (
    <aside className="h-screen w-full flex flex-col items-end gap-1 px-4 py-2 bg-neutral-200 dark:bg-cm-gray">
      <div className="w-max h-full flex flex-col justify-between gap-4">
        <div className="flex w-full h-full flex-col gap-4">
          <header className="pl-2 flex font-bold items-center gap-3"></header>
          <nav>
            <ul className="flex flex-col gap-4 w-max">
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
          </nav>
        </div>
        <div>
          <UserProfile />
        </div>
      </div>
    </aside>
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
