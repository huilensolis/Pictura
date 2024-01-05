import { MobileNavMenu } from "./components/mobile-nav";
import { Feed } from "./components/feed";
import { NewPostBox } from "./components/new-post-box";
import { protectRouteFromUnauthUsers } from "@/utils/auth/server-side-validations";

export default function AppPage() {
  protectRouteFromUnauthUsers();
  return (
    <div className="w-full h-full flex min-h-screen">
      <div className="sm:grid hidden w-full h-full min-h-screen">
        <DesktopLayout />
      </div>
      <div className="sm:hidden grid min-h-screen w-full h-full">
        <MobileLayout />
      </div>
    </div>
  );
}

function DesktopLayout() {
  return (
    <div className="w-full h-full flex flex-col justify-start">
      <NewPostBox />
      <Feed />
    </div>
  );
}

function MobileLayout() {
  return (
    <div className="w-full h-full">
      <main className="w-full h-full">
        <Feed />
      </main>
      <div className="w-full flex absolute bottom-0">
        <MobileNavMenu />
      </div>
    </div>
  );
}
