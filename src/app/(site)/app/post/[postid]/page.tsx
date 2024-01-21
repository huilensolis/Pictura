import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { Post } from "../../components/feed/post";
import { BackwardsNav } from "@/components/feature/nav/backwards";
import { Heading } from "@/components/ui/typography/heading";
import { LazyImage } from "@/components/feature/lazy-image";
import Link from "next/link";

export default async function PostPage({
  params: { postid },
}: {
  params: { postid: string };
}) {
  const supabase = getSuapabaseServerComponent();

  const { data: postData, error: postError } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postid)
    .single();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const doesUserOwnPost = Boolean(
    user && user.id && !error && user.id === postData?.user_id,
  );

  return (
    <div>
      {postData && !postError ? (
        <div className="flex flex-col gap-1">
          <nav className="w-full pt-4 pb-3 px-5 flex items-center gap-4">
            <BackwardsNav catchHref="/app" />
            <Heading level={9}>Back to feed</Heading>
          </nav>
          <Post post={postData} doesUserOwnPost={doesUserOwnPost} postHref="" />
          <RecentPosts />
        </div>
      ) : (
        <Error404Box />
      )}
    </div>
  );
}

async function RecentPosts() {
  const supabase = getSuapabaseServerComponent();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(4);
  return (
    <>
      {data && !error && data.length > 1 && (
        <ul className="xl:grid flex flex-col gap-1 xl:grid-cols-2 xl:grid-rows-[repeat(auto-fill,_384px)]">
          {data.map((post) => (
            <li key={post.id}>
              <Link href={`/app/post/${post.id}`}>
                <LazyImage
                  src={post.asset_url}
                  alt={post.title}
                  className="w-full h-full object-cover object-center"
                  skeletonClassName="w-full h-full"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function Error404Box() {
  return (
    <div className="w-full p-5 border-y border-neutral-300 dark:border-cm-lighter-gray">
      <span className="text-neutral-800 dark:text-neutral-300">
        404 not found
      </span>
    </div>
  );
}
