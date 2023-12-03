"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export function SignOutBtn() {
  const router = useRouter();

  const supabase = createClientComponentClient();
  async function handleLogOut() {
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <button
      onClick={handleLogOut}
      className="flex justify-center items-center bg-neutral-50 rounded-xl h-10 px-3 text-neutral-800 font-semibold hover:bg-neutral-400"
    >
      Log Out
    </button>
  );
}
