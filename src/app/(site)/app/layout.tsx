import { SyncTheme } from "@/components/feature/syncTheme";
import { protectRouteFromUnauthUsers } from "@/utils/auth/server-side-validations";
import { ReactNode } from "react";

export default async function AppLayout({ children }: { children: ReactNode }) {
  await protectRouteFromUnauthUsers();
  return (
    <div className="flex justify-center items-center w-full h-full min-h-screen bg-neutral-100 dark:bg-cm-darker-gray sm:px-0 px-2">
      <div className="min-h-screen w-full flex flex-col justify-start items-center">
        {children}
        <SyncTheme />
      </div>
    </div>
  );
}
