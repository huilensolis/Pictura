import { LazyImage } from "@/components/feature/lazy-image";
import { BackwardsNav } from "@/components/feature/nav/backwards";
import { Heading } from "@/components/ui/typography/heading";
import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { Database } from "@/supabase/types";
import { CalendarIcon, LinkIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function AccountPage({
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
  const supabase = getSuapabaseServerComponent();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  const doesUserProfileExist = Boolean(data && !error);

  const getUser = await supabase.auth.getUser();

  const userId = getUser.data.user?.id || "";

  function Profile({
    data,
    userId,
  }: {
    data: Database["public"]["Tables"]["profiles"]["Row"];
    userId: Database["public"]["Tables"]["users"]["Row"]["id"];
  }) {
    const dateWhenUserJoined = data.created_at
      ? new Date(data.created_at).getFullYear()
      : null;

    return (
      <div className="flex flex-col gap-4 py-10">
        <nav className="w-full flex gap-2 px-2">
          <BackwardsNav />
          <div className="w-full flex items-center justify-center px-2">
            <Heading level={9}>{data?.name}</Heading>
          </div>
        </nav>
        <header>
          <div className="w-full relative mb-16">
            <LazyImage
              src={data?.banner_url ?? ""}
              className="w-full h-56 object-cover object-center"
              skeletonClassName="w-full h-56"
              alt={data.name || data.username || ""}
            />
            <div className="w-32 h-32 rounded-full overflow-hidden absolute -bottom-[25%] left-8 border-[2px] border-neutral-50 dark:border-cm-darker-gray">
              <LazyImage
                src={data?.avatar_url ?? ""}
                className="w-full h-full object-cover object-center"
                skeletonClassName="w-full h-full"
                alt={data.name || data.username || ""}
              />
            </div>
          </div>
          <article className="flex flex-col gap-2 px-4">
            <section className="flex justify-between items-center">
              <div className="flex flex-col justify-between">
                <Heading level={9}>{data?.name}</Heading>
                <span className="text-neutral-500">@{data?.username}</span>
              </div>
              {userId === data.user_id && (
                <Link
                  href="/app/settings/section/profile"
                  className="bg-neutral-700 px-6 py-2 rounded-sm text-neutral-300"
                >
                  Edit Profile
                </Link>
              )}
            </section>
            <section className="flex">
              {data?.description && (
                <p className="text-balance text-neutral-900 dark:text-neutral-200">
                  {data.description}
                </p>
              )}
            </section>
            <section className="flex gap-4">
              {data?.location && (
                <div className="flex justify-center items-center gap-2 text-neutral-900 dark:text-neutral-400">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{data.location}</span>
                </div>
              )}
              {data?.website && (
                <div className="flex justify-center items-center gap-2 text-neutral-900 dark:text-neutral-400">
                  <LinkIcon className="w-4 h-4" />
                  <a
                    href={data.website}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                  >
                    {data.website}
                  </a>
                </div>
              )}
              {dateWhenUserJoined && (
                <div className="flex justify-center items-center gap-2 text-neutral-900 dark:text-neutral-400">
                  <CalendarIcon className="w-4 h-4" />
                  <span>joined in {dateWhenUserJoined}</span>
                </div>
              )}
            </section>
          </article>
        </header>
      </div>
    );
  }
  function UserProfileNotFound() {
    return <>404</>;
  }

  return (
    <div className="w-full h-full">
      {doesUserProfileExist && data ? (
        <Profile data={data} userId={userId} />
      ) : (
        <UserProfileNotFound />
      )}
    </div>
  );
}

function UserProfileSkeleton() {
  return <>skeleton</>;
}
