import { SearchForm } from "./components/SearchForm/SearchForm";
import { SearchedPostsGrid } from "./components/searched-posts-grid";

type SearchParams = {
  search_query?: string;
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const searchValue = searchParams.search_query ?? " ";
  return (
    <>
      <SearchForm defaultSearchValue={searchValue} />
      <SearchedPostsGrid key={searchValue} searchValue={searchValue} />
    </>
  );
}
