"use client";

import { PrimaryButton } from "@/components/ui/buttons/primary";
import { useSupabase } from "@/hooks/use-supabase";
import { ClientRouting } from "@/models/routing/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CloseSession() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { supabase } = useSupabase();

  async function closeSession() {
    setLoading(true);
    await supabase.auth.signOut({ scope: "local" });
    setLoading(false);
    router.push(ClientRouting.auth.signIn);
  }

  return (
    <PrimaryButton
      type="button"
      onClick={closeSession}
      disabled={loading}
      isLoading={loading}
    >
      Close Session
    </PrimaryButton>
  );
}
