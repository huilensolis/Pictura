"use client";

import Link from "next/link";
import { LinkIcon } from "lucide-react";
import { useUserProfile } from "@/hooks/use-user-profile";
import { Database } from "@/supabase/types";
import { Skeleton } from "@/components/ui/skeleton";
import { LazyImage } from "@/components/feature/lazy-image";
import { NAV_LINKS } from "../../models/nav-links/";
import { CustomNavLink } from "@/components/feature/nav/link";
import { ClientRouting } from "@/models/routing/client";

export function AppLeftAside() {
  return (
    <aside className="h-screen w-full flex flex-col items-center justify-between gap-4 px-4 py-2 pt-4 bg-neutral-200 dark:bg-cm-gray">
      <nav className="w-full">
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
      </nav>
      <UserProfile />
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
      <article className="w-full flex items-center gap-4 hover:bg-neutral-300 dark:hover:bg-cm-lighter-gray transition-all delay-75 py-2 px-4 rounded-full">
        <LazyImage
          alt={`${userProfile?.name ?? ""}'s Profile Picture`}
          className="w-12 h-12 rounded-full object-cover object-center aspect-square"
          skeletonClassName="w-12 h-12 rounded-full"
          src={userProfile?.avatar_url ?? ""}
          width={48}
          height={48}
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
      {isLoadingUserProfile && (
        <Skeleton className="w-full h-16 rounded-full" />
      )}
      {!isLoadingUserProfile && userProfile && (
        <Link
          href={ClientRouting.profile(
            userProfile.username ?? ClientRouting.configuration.editProfile,
          )}
        >
          <ActualUserProfile userProfile={userProfile} />
        </Link>
      )}
    </>
  );
}
