"use client";

import { useProtectRouteFromUnauthUsers } from "@/utils/auth/client-side-validations";
import { MobileNavMenu } from "./components/mobile-nav";
import { Feed } from "./components/feed";
import { AppRightAside } from "./components/right-aside";

export default function AppPage() {
  useProtectRouteFromUnauthUsers();
  return (
    <div className="w-full h-full flex min-h-screen">
      <div className="sm:grid hidden w-full h-full min-h-screen">
        <DesktopPage />
      </div>
      <div className="sm:hidden grid min-h-screen w-full h-full">
        <MobilePage />
      </div>
    </div>
  );
}

function DesktopPage() {
  return (
    <div className="w-full h-full flex justify-start">
      <Feed />
      <div className="w-full h-full max-w-sm hidden xl:flex">
        <AppRightAside />
      </div>
    </div>
  );
}

function MobilePage() {
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
