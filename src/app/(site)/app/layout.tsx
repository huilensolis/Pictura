import { ReactNode } from "react";

export default async function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-screen bg-neutral-100 dark:bg-neutral-900">
      <div className="max-w-5xl w-full">{children}</div>
    </div>
  );
}
