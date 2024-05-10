import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex flex-col gap-4 px-2 py-10">{children}</div>
  );
}
