"use client";

import Link from "next/link";
import { type INavLink } from "./header.interface";
import { Logo } from "@/components/ui/logo";
import { ThemeSwitcher } from "@/components/feature/theme-switcher";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/use-session";

const AUTHLINKS: INavLink[] = [
  {
    title: "Log In",
    href: "/auth/log-in",
  },
  {
    title: "Sign Up",
    href: "/auth/sign-up",
  },
];
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
          <Link href="/">
            <Logo />
          </Link>
          {NAVLINKS.map((link, index) => (
            <li key={index}>
              <Link href={link.href}>{link.title}</Link>
            </li>
          ))}
          <ThemeSwitcher />
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
      <figure className="bg-neutral-400 rounded-xl h-10 px-14" />
      <figure className="bg-neutral-400 rounded-xl h-10 px-14" />
    </div>
  );
}

function AuthenticatedButtons({ onLogout }: { onLogout: () => void }) {
  return (
    <ul className="flex justify-center items-center h-full gap-2 text-sm font-normal">
      <li>
        <Link
          href="/app"
          className="flex justify-center items-center bg-neutral-50 rounded-xl h-10 px-3 text-neutral-800 font-semibold hover:bg-neutral-400"
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
      {AUTHLINKS.map((link, index) => (
        <li key={index} className="h-full">
          <Link
            href={link.href}
            className="flex justify-center items-center bg-neutral-50 rounded-xl h-10 px-3 text-neutral-800 font-semibold hover:bg-neutral-400"
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
