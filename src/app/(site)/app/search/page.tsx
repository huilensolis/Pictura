import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { SearchForm } from "./components/SearchForm/SearchForm";
import { PostsGrid } from "@/components/feature/posts-grid";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchParams {
  search_query?: string;
}

interface Props {
  searchParams: SearchParams;
}

const SearchPage: React.FC<Props> = async ({ searchParams }) => {
  const supabase = await getSuapabaseServerComponent();
  const searchValue = searchParams?.search_query ?? "";

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .ilike("title", `%${searchValue}%`)
    .order("created_at", { ascending: false })
    .limit(24);

  return (
    <div className="w-full h-full flex min-h-screen">
      <div className="flex flex-col gap-2 w-full h-full min-h-screen p-2">
        <SearchForm defaultSearchValue={searchValue} />
        <div>
          {posts?.length !== undefined && posts?.length > 0 && (
            <Suspense
              fallback={
                <ul className="break-inside-avoid gap-2 [column-count:3] md:[column-count:3]">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
