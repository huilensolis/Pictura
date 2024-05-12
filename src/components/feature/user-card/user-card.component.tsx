import { ClientRouting } from "@/models/routing/client";
import { Database } from "@/supabase/types";
import Link from "next/link";
import { LazyImage } from "../lazy-image";
import { ImageOff } from "lucide-react";
import { getShortName } from "@/utils/get-short-name";
import { cn } from "@/utils/cn";

export function UserCard({
  userProfile,
  className = "",
}: {
  userProfile: Database["public"]["Tables"]["profiles"]["Row"];
  className?: HTMLElement["className"];
}) {
  return (
    <Link href={ClientRouting.profile(userProfile.username || "")}>
      <article
        className={cn(
          "flex items-center gap-4 py-1 px-2 rounded-md w-full",
          className,
        )}
      >
        {userProfile.avatar_url ? (
          <LazyImage
            alt={`${userProfile.name}'s Profile Picture`}
            className="w-12 h-12 rounded-full object-cover object-center aspect-square"
            skeletonClassName="w-12 h-12 rounded-full animate-pulse"
            src={userProfile.avatar_url}
            width={48}
            height={48}
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center bg-neutral-300 rounded-full">
            <ImageOff className="text-neutral-400 2-5 h-5" />
          </div>
        )}
        <div>
          <span className="text-neutral-800 dark:text-neutral-50 font-semibold text-lg">
            {getShortName(userProfile.name ?? "no name yet", 15)}
          </span>
          <p className="text-neutral-600 dark:text-gray-300">
            @{getShortName(userProfile.username ?? "no username yet", 9)}
          </p>
        </div>
      </article>
    </Link>
  );
}
