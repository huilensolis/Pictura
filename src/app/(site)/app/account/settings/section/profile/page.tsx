"use client";

import { useProtectRouteFromUnauthUsers } from "@/utils/auth/client-side-validations";
import { ProfileConfigPictures } from "./components/pictures";
import { ProfileConfigUsernameAndName } from "./components/username-name";
import { ProfileConfigExtra } from "./components/extra";

export default function ProfileConfigPage() {
  useProtectRouteFromUnauthUsers();
  return (
    <>
      <ProfileConfigPictures />
      <ProfileConfigUsernameAndName />
      <ProfileConfigExtra />
    </>
  );
}
