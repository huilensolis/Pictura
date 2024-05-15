"use client";

import { ReactNode } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export function PostsGridContainer({ children }: { children: ReactNode }) {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 1024: 3, 400: 2, 0: 1 }}
      className="w-full flex"
    >
      <Masonry columnsCount={3} gutter="10px">
        {children}
      </Masonry>
    </ResponsiveMasonry>
  );
}
