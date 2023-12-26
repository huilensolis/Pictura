import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { redirect } from "next/navigation";

export async function protectRouteFromUnauthUsers() {
  const supabase = getSuapabaseServerComponent();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (!session || error) {
    console.log({
      message: "there is no session, redirecting to sing up",
      session: session,
    });
    redirect("/auth/sign-up");
  }
}

export async function protectRouteFromAuthUsers() {
  const supabase = getSuapabaseServerComponent();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/app");
  }
}
