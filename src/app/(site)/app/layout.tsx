import { SyncTheme } from "@/components/feature/syncTheme";
import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-screen bg-neutral-200 dark:bg-cm-darker-gray">
      <div className="min-h-screen w-full flex flex-col justify-start items-center max-w-[1400px]">
        {children}
        <SyncTheme />
      </div>
    </div>
  );
}
