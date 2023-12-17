"use client";

import { useProtectRouteFromUnauthUsers } from "@/utils/auth/client-side-validations";

export default function ProfileConfigPage() {
  useProtectRouteFromUnauthUsers();
  return <>test</>;
}
