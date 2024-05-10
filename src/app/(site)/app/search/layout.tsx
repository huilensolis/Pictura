import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full flex min-h-screen">
      <div className="flex flex-col gap-2 w-full h-full min-h-screen p-2">
        {children}
      </div>
    </div>
  );
}
