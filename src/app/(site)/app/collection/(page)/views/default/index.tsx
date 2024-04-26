import { BookmarkedCollectionList } from "../bookmarked-collection-list";
import { OwnCollectionList } from "../own-collection-list";

export async function DefaultCollectionList({ userId }: { userId: string }) {
  return (
    <>
      <OwnCollectionList userId={userId} />
      <BookmarkedCollectionList userId={userId} />
    </>
  );
}
