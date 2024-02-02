import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { SearchForm } from "./components/SearchForm/SearchForm";
import { PostsGrid } from "@/components/feature/posts-grid";

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
    .order("created_at", { ascending: false });

  return (
    <div className="w-full h-full flex min-h-screen">
      <div className="flex flex-col gap-2 w-full h-full min-h-screen p-2">
        <SearchForm defaultSearchValue={searchValue} />
        <div>
          {posts?.length !== undefined && posts?.length > 0 && (
            <PostsGrid posts={posts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
