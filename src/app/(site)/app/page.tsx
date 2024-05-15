import { getSuapabaseServerComponent } from "@/supabase/models/index.models";
import { Feed } from "./components/feed";
import { protectRouteFromUnauthUsers } from "@/utils/auth-validations/server-side-validations";

export const dynamic = "force-dynamic";

export default async function AppPage() {
  protectRouteFromUnauthUsers();

  const supabase = getSuapabaseServerComponent();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="w-full h-full flex min-h-screen px-2">
      <Feed userId={user?.id || ""} />
    </div>
  );
}
