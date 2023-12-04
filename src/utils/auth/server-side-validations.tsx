import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function protectRouteFromUnauthUsers() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (!session || error) {
    console.log("there is no session, redirecting to sing up");
    redirect("/auth/sign-up");
  }
}

export async function protectRouteFromAuthUsers() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/app");
  }
}
