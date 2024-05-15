import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full px-2 flex flex-col items-center">
      <div className="py-10 flex flex-col gap-4">{children}</div>
    </div>
  );
}
