import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { Heading } from "@/components/ui/typography/heading";
import { PostsGrid } from "@/components/feature/posts-grid";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export async function Feed() {
  const supabase = await getSuapabaseServerComponent();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(28);

  const doesPostsExist = posts && posts.length > 0 && !error;

  return (
    <>
      {doesPostsExist ? (
        <main className="w-full h-full px-2">
          <Suspense
            fallback={
              <ul className="break-inside-avoid gap-2 px-2 [column-count:3] md:[column-count:3]">
                {Array(16)
                  .fill(" ")
                  .map((_, i) => (
                    <Skeleton key={i} className="w-full h-96 mb-2" />
                  ))}
              </ul>
            }
          >
            <PostsGrid posts={posts} />
          </Suspense>
        </main>
      ) : (
        <article className="flex items-center justify-center w-full max-h-96 py-16 text-center border-y border-neutral-300">
          <Heading level={7}>Something wen wrong, reload the page</Heading>
        </article>
      )}
    </>
  );
}
