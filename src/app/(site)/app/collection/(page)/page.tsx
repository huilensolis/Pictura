import React from "react";
import { Heading } from "@/components/ui/typography/heading";
import { CollectionsNavBar } from "./nav-bar";
import { TFilter } from "./models";
import { DefaultCollectionList } from "./views/default";
import { OwnCollectionList } from "./views/own-collection-list";
import { BookmarkedCollectionList } from "./views/bookmarked-collection-list";
import { getSuapabaseServerComponent } from "@/supabase/models/index.models";

export default async function CollectionPage({
  searchParams: { filter = "default" },
}: {
  searchParams: { filter: TFilter };
}) {
  const supabase = getSuapabaseServerComponent();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return (
      <main className="flex flex-col gap-4 px-2 py-10">
        <Heading level={6}>Collections</Heading>
        <p>could not get session, please reload the page</p>
      </main>
    );

  const FILTERS_VIEWS: Record<TFilter, React.JSX.Element> = {
    own: <OwnCollectionList userId={user.id} />,
    bookmarked: <BookmarkedCollectionList userId={user.id} />,
    default: <DefaultCollectionList userId={user.id} />,
  };

  const FilteredView = FILTERS_VIEWS[filter];

  return (
    <main className="flex flex-col gap-4 px-2 py-10">
      <Heading level={6}>Collections</Heading>
      {user && (
        <>
          <CollectionsNavBar filter={filter} />
          {FilteredView}
        </>
      )}
    </main>
  );
}
