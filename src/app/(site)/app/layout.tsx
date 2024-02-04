import { SyncTheme } from "@/components/feature/syncTheme";
import { ReactNode } from "react";
import { AppLeftAside } from "./components/left-aside";
import { AppRightAside } from "./components/right-aside";
import { MobileNavMenu } from "./components/mobile-nav";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-screen bg-neutral-200 dark:bg-cm-darker-gray md:pb-0 pb-20">
      <div className="min-h-screen w-full flex justify-center items-start max-w-[1400px] relative">
        <div className="md:flex hidden sticky top-0 left-0 w-full max-w-[300px] h-full min-h-screen">
          <AppLeftAside />
        </div>
        <div className="md:hidden w-full flex fixed left-0 bottom-0 z-50">
          <MobileNavMenu />
        </div>
        <div className="h-full w-full min-h-screen border-x border-neutral-300 dark:border-cm-lighter-gray">
          {children}
        </div>
        <div className="w-full h-full max-w-sm hidden xl:flex">
          <AppRightAside />
        </div>
        <SyncTheme />
      </div>
    </div>
  );
}
