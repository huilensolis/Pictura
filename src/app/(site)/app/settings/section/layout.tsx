import { ReactNode } from "react";
import { SettingsAside } from "../components/settings-aside";
import { BackwardsNav } from "@/components/feature/nav/backwards";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full flex justify-start items-start">
      <div className="lg:inline-block hidden w-max h-screen sticky top-0 border-r border-neutral-300 dark:border-neutral-700">
        <SettingsAside />
      </div>
      <div className="flex flex-col w-full min-h-screen h-full">
        <div className="w-full flex items-start justify-center min-h-screen h-full">
          <div className="flex flex-col gap-4 w-full max-w-2xl items-center justify-start py-10 px-5">
            <header className="w-full flex">
              <div className="inline-block lg:hidden">
                <BackwardsNav catchHref="/app/settings" />
              </div>
            </header>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
