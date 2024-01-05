import { SyncTheme } from "@/components/feature/syncTheme";
import { ReactNode } from "react";
import { AppLeftAside } from "./components/left-aside";
import { AppRightAside } from "./components/right-aside";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-screen bg-neutral-200 dark:bg-cm-darker-gray">
      <div className="min-h-screen w-full flex justify-center items-start max-w-[1400px] relative">
        <div className="sm:flex hidden sticky top-0 left-0 w-full max-w-[300px] h-full min-h-screen">
          <AppLeftAside />
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
