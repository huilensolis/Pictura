import { SyncTheme } from "@/components/feature/syncTheme";
import { protectRouteFromUnauthUsers } from "@/utils/auth/server-side-validations";
import { ReactNode } from "react";

export const dynamic = "force-static";

export default async function AppLayout({ children }: { children: ReactNode }) {
  await protectRouteFromUnauthUsers();
  return (
    <div className="flex justify-center items-center w-full h-full min-h-screen bg-neutral-200 dark:bg-cm-darker-gray">
      <div className="min-h-screen w-full flex flex-col justify-start items-center">
        {children}
        <SyncTheme />
      </div>
    </div>
  );
}
