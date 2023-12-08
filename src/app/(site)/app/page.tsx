"use client";

import { useProtectRouteFromUnauthUsers } from "@/utils/auth/client-side-validations";

export default function AppPage() {
  useProtectRouteFromUnauthUsers();
  return (
    <>
      <h1>app page</h1>
    </>
  );
}
