"use client";

import Link from "next/link";
import { type INavLink } from "./header.interface";
import { Logo } from "@/components/ui/logo";
import { ThemeSwitcher } from "@/components/feature/theme-switcher";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function Header() {
  const { user } = useUser();

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
  const router = useRouter();

  const supabase = createClientComponentClient();
  async function handleLogOut() {
    await supabase.auth.signOut();
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
        {user && (
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
                onClick={handleLogOut}
              >
                Log Out
              </button>
            </li>
          </ul>
        )}
        {!user && (
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
        )}
      </header>
    </div>
  );
}
