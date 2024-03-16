import { Feed } from "./components/feed";
import { protectRouteFromUnauthUsers } from "@/utils/auth/server-side-validations";

export const dynamic = "force-dynamic";

export default function AppPage() {
  protectRouteFromUnauthUsers();
  return (
    <div className="w-full h-full flex min-h-screen">
      <Feed />
    </div>
  );
}
