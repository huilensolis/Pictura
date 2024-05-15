import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { SearchForm } from "./components/SearchForm/SearchForm";
import { SearchedPostsGrid } from "./components/searched-posts-grid";

type SearchParams = {
  search_query?: string;
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const searchValue = searchParams.search_query ?? " ";

  const supabase = getSuapabaseServerComponent();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <>
      <SearchForm defaultSearchValue={searchValue} />
      <SearchedPostsGrid
        key={searchValue}
        searchValue={searchValue}
        userId={user?.id || ""}
      />
    </>
  );
}
