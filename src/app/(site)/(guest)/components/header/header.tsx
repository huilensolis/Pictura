"use client";

import Link from "next/link";
import { type INavLink } from "./header.interface";
import { Logo } from "@/components/ui/logo";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/use-session";
import { Skeleton } from "@/components/ui/skeleton";
import { ClientRouting } from "@/models/routing/client";

const NAVLINKS: INavLink[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
];

export function Header() {
  const { session, isLoading, logOut } = useSession();

  const router = useRouter();

  async function handleLogOut() {
    await logOut();
    router.refresh();
  }

  return (
    <div className="p-2 w-full max-w-4xl">
      <header className="w-full flex items-center justify-between bg-neutral-800 p-[5px] text-neutral-50 rounded-2xl dark:bg-neutral-800">
        <ul className="flex justify-center items-center h-full gap-2 text-sm font-normal">
          <Link href={ClientRouting.home}>
            <Logo />
          </Link>
          {NAVLINKS.map((link, index) => (
            <li key={index}>
              <Link href={link.href}>{link.title}</Link>
            </li>
          ))}
        </ul>
        {session && !isLoading && (
          <AuthenticatedButtons onLogout={handleLogOut} />
        )}
        {!session && !isLoading && <UnauthenticatedLinks />}
        {isLoading && <ButtonsKeleton />}
      </header>
    </div>
  );
}

function ButtonsKeleton() {
  return (
    <div className="flex gap-2 animate-pulse transition-colors delay-75">
      <Skeleton className="w-20 h-10 rounded-xl" />
      <Skeleton className="w-20 h-10 rounded-xl" />
    </div>
  );
}

function AuthenticatedButtons({ onLogout }: { onLogout: () => void }) {
  return (
    <ul className="flex justify-center items-center h-full gap-2 text-sm font-normal">
      <li>
        <Link
          href={ClientRouting.app}
          className="flex justify-center items-center bg-blue-600 rounded-xl h-10 px-3 text-neutral-50 font-semibold hover:brightness-105"
        >
          Launch App
        </Link>
      </li>
      <li>
        <button
          className="flex justify-center items-center bg-neutral-50 rounded-xl h-10 px-3 text-neutral-800 font-semibold hover:bg-neutral-400"
          onClick={onLogout}
        >
          Log Out
        </button>
      </li>
    </ul>
  );
}

function UnauthenticatedLinks() {
  return (
    <ul className="flex justify-center items-center h-full gap-2 text-sm font-normal">
      <li className="h-full">
        <Link
          href={ClientRouting.auth.signUp}
          className="flex justify-center items-center bg-neutral-50 rounded-xl h-10 px-3 text-neutral-800 font-semibold hover:bg-neutral-400"
        >
          Sign Up
        </Link>
      </li>

      <li className="h-full">
        <Link
          href={ClientRouting.auth.signIn}
          className="flex justify-center items-center bg-blue-600 rounded-xl h-10 px-3 text-neutral-50 font-semibold hover:brightness-105"
        >
          Log In
        </Link>
      </li>
    </ul>
  );
}
