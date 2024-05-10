import { UserCard } from "@/components/feature/user-card";
import { getSuapabaseServerComponent } from "@/supabase/models/index.models";

export async function UserProfileCard() {
  const supabase = getSuapabaseServerComponent();

  const {
    error: errorGettingSession,
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || errorGettingSession) return <></>;

  const { data: userProfile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", session.user.id)
    .single();

  if (!userProfile || error) return <></>;

  return (
    <UserCard
      userProfile={userProfile}
      className="hover:bg-neutral-300 dark:hover:bg-cm-lighter-gray transition-all duration-150"
    />
  );
}
