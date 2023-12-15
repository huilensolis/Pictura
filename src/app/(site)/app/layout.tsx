import { SyncTheme } from "@/components/feature/syncTheme";
import { ReactNode } from "react";

export default async function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-screen bg-neutral-100 dark:bg-neutral-900 sm:px-0 px-2">
      <div className="max-w-5xl w-full flex flex-col justify-center items-center">
        {children}
        <SyncTheme />
      </div>
    </div>
  );
}
