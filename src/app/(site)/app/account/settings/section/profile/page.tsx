"use client";

import { ProfileConfigExtra } from "@/components/feature/profile-config/extra";
import { ProfileConfigPictures } from "@/components/feature/profile-config/pictures";
import { ProfileConfigUsernameAndName } from "@/components/feature/profile-config/username-name";
import { useProtectRouteFromUnauthUsers } from "@/utils/auth/client-side-validations";

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
