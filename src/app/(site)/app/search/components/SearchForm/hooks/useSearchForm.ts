"use client";
import { useDebounce } from "@/hooks/use-debounce";
import { useRouting } from "@/hooks/useRouting";
import { useEffect, useState } from "react";

export const useSearchForm = (defaultSearchValue: string) => {
  const [searchValue, setSearchValue] = useState<string>(defaultSearchValue);
  const { debouncedValue } = useDebounce(searchValue, 500);
  const { goTo } = useRouting();

  useEffect(() => {
    const currentURL = new URL(location.origin + location.pathname);

    currentURL.searchParams.set("search_query", debouncedValue);

    goTo(currentURL.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const changeSearchValue = (value: string) => {
    setSearchValue(value);
  };

  return { valueToSearch: debouncedValue, changeSearchValue };
};
