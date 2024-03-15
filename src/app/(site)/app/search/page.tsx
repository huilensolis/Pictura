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
  return (
    <div className="w-full h-full flex min-h-screen">
      <div className="flex flex-col gap-2 w-full h-full min-h-screen p-2">
        <SearchForm defaultSearchValue={searchValue} />
        <SearchedPostsGrid key={searchValue} searchValue={searchValue} />
      </div>
    </div>
  );
}
