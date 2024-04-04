import { Feed } from "./components/feed";
import { protectRouteFromUnauthUsers } from "@/utils/auth-validations/server-side-validations";

export const dynamic = "force-dynamic";

export default function AppPage() {
  protectRouteFromUnauthUsers();
  return (
    <div className="w-full h-full flex min-h-screen px-2">
      <Feed />
    </div>
  );
}
