import { ReactNode } from "react";
import { Header } from "../components/header/header";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex w-full h-screen lg:px-0 px-2">
      <section className="w-full h-full flex flex-col items-center bg-neutral-100 dark:bg-neutral-900">
        <Header />
        <div className="h-full w-full flex flex-col justify-center items-center">
          {children}
        </div>
      </section>
      <section className="h-full w-full bg-emerald-400 lg:inline-block hidden"></section>
    </main>
  );
}
