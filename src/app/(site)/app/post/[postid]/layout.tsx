import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="w-full flex flex-col p-2 gap-2 pb-10">{children}</div>;
}
