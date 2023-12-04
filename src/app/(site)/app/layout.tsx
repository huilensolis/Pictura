import { protectRouteFromUnauthUsers } from "@/utils/auth/server-side-validations";
import { ReactNode } from "react";

export default async function AppLayout({ children }: { children: ReactNode }) {
  // we protect all the childen routes from the unauthenticated users.
  await protectRouteFromUnauthUsers();

  return (
    <div className="flex justify-center items-center w-full h-full min-h-screen bg-neutral-100 dark:bg-neutral-900">
      <div className="max-w-5xl w-full">{children}</div>
    </div>
  );
}
