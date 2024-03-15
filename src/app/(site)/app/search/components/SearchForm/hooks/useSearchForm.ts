"use client";
import { useDebounce } from "@/hooks/use-debounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useSearchForm = (defaultSearchValue: string) => {
  const [searchValue, setSearchValue] = useState<string>(defaultSearchValue);
  const { debouncedValue } = useDebounce(searchValue, 500);
  const router = useRouter();

  useEffect(() => {
    const currentURL = new URL(location.origin + location.pathname);

    currentURL.searchParams.set("search_query", debouncedValue);

    router.push(currentURL.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const changeSearchValue = (value: string) => {
    setSearchValue(value);
  };

  return { valueToSearch: debouncedValue, changeSearchValue };
};
