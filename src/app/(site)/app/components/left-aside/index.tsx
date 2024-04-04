import { Suspense } from "react";
import { NavLinks } from "./nav-links";
import { UserProfileCard } from "./user-profile-card";
import { Skeleton } from "@/components/ui/skeleton";

export function AppLeftAside() {
  return (
    <aside className="h-screen w-full flex flex-col items-center justify-between gap-4 px-4 py-2 pt-4 bg-neutral-200 dark:bg-cm-gray">
      <nav className="w-full">
        <NavLinks />
      </nav>
      <footer>
        <Suspense
          fallback={
            <Skeleton className="w-full h-16 rounded-full animate-pulse" />
          }
        >
          <UserProfileCard />
        </Suspense>
      </footer>
    </aside>
  );
}
