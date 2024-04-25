import { BookmarkedCollectionList } from "../bookmarked-collection-list";
import { OwnCollectionList } from "../own-collection-list";

export async function DefaultCollectionList() {
  return (
    <>
      <OwnCollectionList />
      <BookmarkedCollectionList />
    </>
  );
}
