"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function PrefetchAppPage() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/app");
  }, []);
  return <></>;
}
