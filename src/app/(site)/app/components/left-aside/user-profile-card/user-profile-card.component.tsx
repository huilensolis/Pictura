import Link from "next/link";
import { ImageOff, LinkIcon } from "lucide-react";

import { LazyImage } from "@/components/feature/lazy-image";
import { ClientRouting } from "@/models/routing/client";
import { getShortName } from "@/utils/get-short-name";
import { getSuapabaseServerComponent } from "@/supabase/models/index.models";

export async function UserProfileCard() {
  const supabase = await getSuapabaseServerComponent();

  const {
    error: errorGettingSession,
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || errorGettingSession) return <></>;

  const { data: userProfile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", session.user.id)
    .single();

  if (!userProfile || error) return <></>;

  return (
    <Link
      href={ClientRouting.profile(
        userProfile.username ?? ClientRouting.configuration.editProfile,
      )}
    >
      <article className="w-full flex items-center gap-4 hover:bg-neutral-300 dark:hover:bg-cm-lighter-gray transition-all delay-75 py-2 px-4 rounded-full">
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
            {getShortName(userProfile.name ?? "no name yet", 9)}
          </span>
          <p className="text-neutral-600 dark:text-gray-300">
            @{getShortName(userProfile.username ?? "no username yet", 9)}
          </p>
        </div>
        <LinkIcon className="ml-5 text-neutral-900 dark:text-neutral-50" />
      </article>
    </Link>
  );
}
