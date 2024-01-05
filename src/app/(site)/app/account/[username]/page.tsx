import { BackwardsNav } from "@/components/feature/nav/backwards";
import { Heading } from "@/components/ui/typography/heading";
import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { Database } from "@/supabase/types";
import { CalendarIcon, LinkIcon, MapPinIcon } from "lucide-react";
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
  const suapabase = getSuapabaseServerComponent();

  const { data, error } = await suapabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  const doesUserProfileExist = Boolean(data && !error);

  function Profile({
    data,
  }: {
    data: Database["public"]["Tables"]["profiles"]["Row"];
  }) {
    const dateWhenUserJoined = data.created_at
      ? new Date(data.created_at).getFullYear()
      : null;

    return (
      <div className="flex flex-col gap-4 py-10">
        <nav className="w-full flex gap-2 px-2">
          <BackwardsNav />
          <Heading level={9}>{data?.name}</Heading>
        </nav>
        <header>
          <div className="w-full relative mb-16">
            <div className="w-full h-56">
              <img
                src={data?.banner_url ?? ""}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="w-32 h-32 rounded-full overflow-hidden absolute -bottom-[25%] left-8 border-[3px] border-neutral-50 dark:border-cm-darker-gray">
              <img
                src={data?.avatar_url ?? ""}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
          <article className="flex flex-col gap-2 px-4">
            <div>
              <Heading level={9}>{data?.name}</Heading>
              <span className="text-neutral-500">@{data?.username}</span>
            </div>
            {data?.description && (
              <p className="text-balance text-neutral-900 dark:text-neutral-200">
                {data.description}
              </p>
            )}
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
        <Profile data={data} />
      ) : (
        <UserProfileNotFound />
      )}
    </div>
  );
}

function UserProfileSkeleton() {
  return <>skeleton</>;
}
