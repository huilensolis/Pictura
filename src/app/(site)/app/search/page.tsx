import { SearchForm } from "./components/SearchForm/SearchForm";
import { SearchedPostsGrid } from "./components/searched-posts-grid";

interface SearchParams {
  search_query?: string;
}

interface Props {
  searchParams: SearchParams;
}

const SearchPage: React.FC<Props> = async ({ searchParams }) => {
  const searchValue = searchParams.search_query ?? "painting";
  return (
    <div className="w-full h-full flex min-h-screen">
      <div className="flex flex-col gap-2 w-full h-full min-h-screen p-2">
        <SearchForm defaultSearchValue={searchValue} />
        <SearchedPostsGrid key={searchValue} searchValue={searchValue} />
      </div>
    </div>
  );
};

export default SearchPage;
