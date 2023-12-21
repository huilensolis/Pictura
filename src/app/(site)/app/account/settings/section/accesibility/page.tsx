import { Heading } from "@/components/ui/typography/heading";
import { ProfileConfigTheme } from "../profile/components/theme";

export default function SettingsAccesibilityPage() {
  return (
    <article className="w-full flex flex-col items-start justify-center">
      <Heading level={6}>Theme</Heading>
      <ProfileConfigTheme />
    </article>
  );
}
