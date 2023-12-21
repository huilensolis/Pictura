"use client";

import { useProtectRouteFromUnauthUsers } from "@/utils/auth/client-side-validations";
import { MobileNavMenu } from "./mobile-nav";
import { Feed } from "./components/feed";
import { AppRightAside } from "./components/right-aside";
import { AppLeftAside } from "./components/left-aside";

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
    <div className="w-full h-full xl:grid flex xl:grid-cols-3 justify-center">
      <div className="xl:w-full w-80 max-w-none h-full flex justify-end items-start">
        <div className="w-full h-full xl:max-w-sm">
          <AppLeftAside />
        </div>
      </div>
      <Feed />
      <div className="w-full h-full hidden xl:flex justify-start items-start">
        <div className="w-full h-full max-w-sm">
          <AppRightAside />
        </div>
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
