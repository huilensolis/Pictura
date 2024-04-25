import React from "react";
import { Heading } from "@/components/ui/typography/heading";
import { CollectionsNavBar } from "./nav-bar";
import { TFilter } from "./models";
import { DefaultCollectionList } from "./views/default";
import { OwnCollectionList } from "./views/own-collection-list";
import { BookmarkedCollectionList } from "./views/bookmarked-collection-list";

const FILTERS_VIEWS: Record<
  TFilter,
  () => Promise<React.JSX.Element> | React.JSX.Element
> = {
  own: OwnCollectionList,
  bookmarked: BookmarkedCollectionList,
  default: DefaultCollectionList,
};

export default async function CollectionPage({
  searchParams: { filter = "default" },
}: {
  searchParams: { filter: TFilter };
}) {
  const FilteredView = FILTERS_VIEWS[filter];

  return (
    <main className="flex flex-col gap-4 px-2 py-10">
      <Heading level={6}>Collections</Heading>
      <CollectionsNavBar filter={filter} />
      <FilteredView />
    </main>
  );
}
