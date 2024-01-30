"use client";

import { ChevronLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export function BackwardsNav({ catchHref }: { catchHref: string }) {
  const router = useRouter();

  function navigateBackwards() {
    if (catchHref) router.push(catchHref);
    else router.back();
  }

  return (
    <button
      onClick={navigateBackwards}
      className="flex justify-center items-center p-2 bg-neutral-300 dark:bg-neutral-700 rounded-xl dark:text-neutral-200 text-neutral-900"
    >
      <ChevronLeftIcon />
    </button>
  );
}
