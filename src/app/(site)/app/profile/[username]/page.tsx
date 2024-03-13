import { CalendarIcon, LinkIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { LazyImage } from "@/components/feature/lazy-image";
import { BackwardsNav } from "@/components/feature/nav/backwards";
import { Skeleton } from "@/components/ui/skeleton";
import { Heading } from "@/components/ui/typography/heading";
import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { Database } from "@/supabase/types";
import { UserPosts } from "./components/user-posts";

export default function ProfilePage({
  params: { username },
}: {
  params: { username: string };
}) {
  return (
    <Suspense fallback={<UserProfileSkeleton />}>
      <UserProfile username={username} />
    </Suspense>
  );
}

async function UserProfile({ username }: { username: string }) {
  const supabase = await getSuapabaseServerComponent();

  const { data: userProfile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  const doesUserProfileExist = Boolean(userProfile && !error);

  const {
    data: { user: user },
  } = await supabase.auth.getUser();

  return (
    <div className="w-full h-full">
      {doesUserProfileExist && userProfile ? (
        <Profile profile={userProfile} currentUserId={user?.id || ""} />
      ) : (
        <UserProfileNotFound />
      )}
    </div>
  );
}

function UserProfileNotFound() {
  return <>404</>;
}

function Profile({
  profile,
  currentUserId,
}: {
  profile: Database["public"]["Tables"]["profiles"]["Row"];
  currentUserId: Database["public"]["Tables"]["users"]["Row"]["id"];
}) {
  const dateWhenUserJoined = profile.created_at
    ? new Date(profile.created_at).getFullYear()
    : null;

  return (
    <div className="flex flex-col gap-4 pt-4">
      <nav className="w-full flex gap-2 px-2">
        <BackwardsNav catchHref="/app" />
        <div className="w-full flex items-center justify-center px-2">
          <Heading level={9}>{profile?.name}</Heading>
        </div>
      </nav>
      <header>
        <div className="w-full relative mb-16">
          <div className="h-56 w-full">
            <LazyImage
              src={profile?.banner_url ?? ""}
              className="w-full h-56 object-cover object-center"
              skeletonClassName="w-full h-56"
              alt={profile.name || profile.username || ""}
            />
          </div>
          <div className="w-32 h-32 rounded-full overflow-hidden absolute -bottom-[25%] left-8 border-[2px] border-neutral-50 dark:border-cm-darker-gray">
            <LazyImage
              src={profile?.avatar_url ?? ""}
              className="w-full h-full object-cover object-center"
              skeletonClassName="w-full h-full"
              alt={profile.name || profile.username || ""}
            />
          </div>
        </div>
        <article className="flex flex-col gap-2 px-4">
          <section className="flex justify-between items-center flex-wrap">
            <div className="flex flex-col justify-between">
              <Heading level={9}>{profile?.name}</Heading>
              <span className="text-neutral-500">
                @{profile?.username ?? "_"}
              </span>
            </div>
            {currentUserId === profile.user_id && (
              <Link
                href="/app/settings/section/profile"
                className="bg-neutral-700 px-6 py-2 rounded-sm text-neutral-300"
              >
                Edit Profile
              </Link>
            )}
          </section>
          {profile?.description && (
            <p className="w-3/4 text-pretty text-neutral-900 dark:text-neutral-200">
              {profile.description}
            </p>
          )}
          <section className="flex gap-4 flex-wrap">
            {profile?.location && (
              <div className="flex justify-center items-center gap-2 text-neutral-600 dark:text-neutral-400">
                <MapPinIcon className="w-4 h-4" />
                <span>{profile.location}</span>
              </div>
            )}
            {profile?.website && (
              <div className="flex justify-center items-center gap-2 text-neutral-600 dark:text-neutral-400">
                <LinkIcon className="w-4 h-4" />
                <a
                  href={profile.website}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                >
                  {profile.website}
                </a>
              </div>
            )}
            {dateWhenUserJoined && (
              <div className="flex justify-center items-center gap-2 text-neutral-600 dark:text-neutral-400">
                <CalendarIcon className="w-4 h-4" />
                <span>joined in {dateWhenUserJoined}</span>
              </div>
            )}
          </section>
        </article>
      </header>
      <div className="px-2">
        <UserPosts profileId={profile.id} />
      </div>
    </div>
  );
}

function UserProfileSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="px-2 pt-4">
        <Skeleton className="w-full h-10 rounded-lg" />
      </div>
      <header className="relative w-full mb-10">
        <Skeleton className="w-full h-56" />
        <Skeleton className="w-32 h-32 rounded-full absolute left-8 -bottom-10" />
      </header>
      <header className="flex flex-col gap-2 px-4">
        <div className="flex flex-col gap-1">
          <Skeleton className="w-32 h-5 rounded-lg" />
          <Skeleton className="w-28 h-4 rounded-lg" />
        </div>
        <Skeleton className="w-10/12 h-32 rounded-lg" />
        <div className="flex gap-4">
          <Skeleton className="w-48 h-5 rounded-lg" />
          <Skeleton className="w-48 h-5 rounded-lg" />
          <Skeleton className="w-48 h-5 rounded-lg" />
        </div>
      </header>
      <ul className="flex flex-wrap gap-1">
        {Array(12)
          .fill("")
          .map((_, i) => (
            <li key={i} className="w-[calc(50%-(0.25rem/2))] h-96">
              <Skeleton className="w-full h-full" />
            </li>
          ))}
      </ul>
    </div>
  );
}
