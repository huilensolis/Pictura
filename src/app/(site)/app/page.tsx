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
    <main className="w-full h-full flex flex-col justify-start">
      <Feed />
    </main>
  );
}

function MobileLayout() {
  return (
    <main className="w-full h-full py-2">
      <Feed />
    </main>
  );
}
