import { ReactNode } from "react";
import { Header } from "../components/header/header";
import Image from "next/image";

export const dynamic = "force-static";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="flex w-full h-screen lg:px-0 px-4 bg-neutral-100 dark:bg-neutral-900">
      <section className="w-full h-full flex flex-col items-center">
        <Header />
        <div className="h-full w-full flex flex-col justify-center items-center">
          {children}
        </div>
      </section>
      <section className="h-full w-full bg-blue-500 dark:bg-blue-400 lg:inline-block hidden">
        <Image
          alt="blue gradient"
          src="/BG20.png"
          width={500}
          height={1000}
          className="object-cover object-top h-full w-full"
        />
      </section>
    </main>
  );
}
