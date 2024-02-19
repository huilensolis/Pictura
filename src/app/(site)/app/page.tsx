import { Feed } from "./components/feed";
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
    <main className="w-full h-full flex flex-col justify-start py-2">
      <Suspense
        fallback={
          <ul className="w-full flex flex-wrap gap-2">
            {Array(8)
              .fill("")
              .map((_, i) => {
                const height = Math.floor(Math.random() * 10) > 5 ? 240 : 500;
                return (
                  <li key={i}>
                    <Skeleton
                      className="w-full rounded-md"
                      style={{ height }}
                    />
                  </li>
                );
              })}
          </ul>
        }
      >
        <Feed />
      </Suspense>
    </main>
  );
}

function MobileLayout() {
  return (
    <main className="w-full h-full py-2">
      <Suspense
        fallback={
          <ul className="w-full grid grid-cols-2 gap-2">
            {Array(6)
              .fill("")
              .map((_, i) => (
                <li key={i}>
                  <Skeleton className="h-[500px] w-full rounded-md" />
                </li>
              ))}
          </ul>
        }
      >
        <Feed />
      </Suspense>
    </main>
  );
}
