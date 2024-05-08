import { ReactNode } from "react";

export function CollectionContainer({ children }: { children: ReactNode }) {
  return (
    <ul className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 auto-rows-auto gap-4">
      {children}
    </ul>
  );
}
