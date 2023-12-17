import { ReactNode } from "react";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full flex flex-col gap-4 justify-start items-center">
      {children}
    </div>
  );
}
