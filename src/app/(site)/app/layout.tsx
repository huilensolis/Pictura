import { SyncTheme } from "@/components/feature/syncTheme";
import { protectRouteFromUnauthUsers } from "@/utils/auth/server-side-validations";
import { ReactNode } from "react";

export default async function AppLayout({ children }: { children: ReactNode }) {
  protectRouteFromUnauthUsers();
  return (
    <div className="flex justify-center items-center w-full h-full min-h-screen bg-neutral-100 dark:bg-cm-gray sm:px-0 px-2">
      <div className="max-w-5xl min-h-[calc(100dvh-4rem)] w-full flex flex-col justify-start items-center py-16">
        {children}
        <SyncTheme />
      </div>
    </div>
  );
}
