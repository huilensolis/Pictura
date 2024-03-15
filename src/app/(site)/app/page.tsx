import { Feed } from "./components/feed";
import { protectRouteFromUnauthUsers } from "@/utils/auth-validations/server-side-validations";

export const dynamic = "force-dynamic";

export default function AppPage() {
  protectRouteFromUnauthUsers();
  return (
    <div className="w-full h-full px-2 flex min-h-screen">
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
