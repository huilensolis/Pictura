import { CalendarIcon, ImageOff, LinkIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";

import { LazyImage } from "@/components/feature/lazy-image";
import { BackwardsNav } from "@/components/feature/nav/backwards";
import { Heading } from "@/components/ui/typography/heading";
import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { Database } from "@/supabase/types";
import { UserPosts } from "./components/user-posts";

export default async function UserProfile({
  params: { username },
}: {
  params: { username: string };
}) {
  const supabase = getSuapabaseServerComponent();

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
    <>
      {doesUserProfileExist && userProfile ? (
        <Profile profile={userProfile} currentUserId={user?.id || ""} />
      ) : (
        <UserProfileNotFound />
      )}
    </>
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
    <>
      <nav className="w-full flex gap-2">
        <BackwardsNav catchHref="/app" />
        <div className="w-full flex items-center justify-center px-2">
          <Heading level={9}>Back</Heading>
        </div>
      </nav>
      <header>
        <div className="w-full relative mb-16">
          <div className="h-56 w-full">
            {profile.banner_url ? (
              <LazyImage
                src={profile.banner_url}
                className="w-full h-56 object-cover object-center rounded-md"
                skeletonClassName="w-full h-56"
                alt={profile.name || profile.username || ""}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-neutral-300 rounded-md">
                <ImageOff className="text-neutral-400 2-5 h-5" />
              </div>
            )}
          </div>
          <div className="w-32 h-32 rounded-full overflow-hidden absolute -bottom-[25%] left-8 border-[2px] border-neutral-50 dark:border-cm-darker-gray">
            {profile.avatar_url ? (
              <LazyImage
                src={profile.avatar_url}
                className="w-full h-full object-cover object-center"
                skeletonClassName="w-full h-full"
                alt={profile.name || profile.username || ""}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-neutral-300 rounded-full">
                <ImageOff className="text-neutral-400 2-5 h-5" />
              </div>
            )}
          </div>
        </div>
        <article className="flex flex-col gap-2">
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
      <UserPosts profileId={profile.id} />
    </>
  );
}
