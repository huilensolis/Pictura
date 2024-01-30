import { Feed } from "./components/feed";
import { NewPostBox } from "./components/new-post-box";
import { protectRouteFromUnauthUsers } from "@/utils/auth/server-side-validations";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const dynamic = "force-dynamic";

export default function AppPage() {
  protectRouteFromUnauthUsers();
  return (
    <div className="w-full h-full flex min-h-screen">
      <div className="md:grid hidden w-full h-full min-h-screen">
        <DesktopLayout />
      </div>
      <div className="md:hidden grid min-h-screen w-full h-full">
        <MobileLayout />
      </div>
    </div>
  );
}

function DesktopLayout() {
  return (
    <div className="w-full h-full flex flex-col justify-start">
      <NewPostBox />
      <Suspense
        fallback={
          <ul className="w-full flex flex-col">
            {Array(8)
              .fill("")
              .map((_, i) => (
                <li key={i}>
                  <Skeleton className="h-[700px] w-full border-t border-neutral-300 dark:border-cm-lighter-gray" />
                </li>
              ))}
          </ul>
        }
      >
        <Feed />
      </Suspense>
    </div>
  );
}

function MobileLayout() {
  return (
    <div className="w-full h-full">
      <main className="w-full h-full">
        <NewPostBox />
        <Suspense
          fallback={
            <ul className="w-full flex flex-col">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <li key={i}>
                    <Skeleton className="h-[700px] w-full border-t border-neutral-300 dark:border-cm-lighter-gray" />
                  </li>
                ))}
            </ul>
          }
        >
          <Feed />
        </Suspense>
      </main>
    </div>
  );
}
