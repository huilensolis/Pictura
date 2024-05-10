import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full flex justify-center px-2 py-10">
      <div className="max-w-lg w-full flex flex-col gap-2">{children}</div>
    </main>
  );
}
