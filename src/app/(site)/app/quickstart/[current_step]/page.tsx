"use client";

import { ProfileConfigExtra } from "@/components/feature/profile-config/extra";
import { ProfileConfigPictures } from "@/components/feature/profile-config/pictures";
import { ProfileConfigUsernameAndName } from "@/components/feature/profile-config/username-name";
import { useRouter } from "next/navigation";
import { IQuickStartStep } from "./quickstart.models";
import { PrimaryButton } from "@/components/ui/buttons/primary/";
import { PlainButton } from "@/components/ui/buttons/secundary";
import { ProfileConfigTheme } from "@/components/feature/profile-config/theme";
import { useProtectRouteFromUnauthUsers } from "@/utils/auth/client-side-validations";

const STEPS: IQuickStartStep[] = [
  {
    url: "profile pictures",
    component: ProfileConfigPictures,
  },
  {
    url: "name and username",
    component: ProfileConfigUsernameAndName,
  },
  {
    url: "extra",
    component: ProfileConfigExtra,
  },
  {
    url: "theme",
    component: ProfileConfigTheme,
  },
];

export default function QuickStartPage({
  params: { current_step },
}: {
  params: { current_step: string };
}) {
  useProtectRouteFromUnauthUsers();

  const doesStepExist = STEPS.find(
    (step) => step.url.toLowerCase().split(" ").join("-") === current_step,
  );

  const currentStep = doesStepExist ?? STEPS[0];

  const currentIndex = STEPS.findIndex(
    (step) => step.url.toLowerCase() === currentStep.url.toLowerCase(),
  );

  const CurrentStepComponent = currentStep.component;

  const router = useRouter();

  const stepBack = STEPS[currentIndex - 1];

  const stepNext = STEPS[currentIndex + 1];

  function goNextStep() {
    if (!stepNext) return router.push("/");
    router.push(
      `${location.origin}/app/quickstart/${stepNext.url
        .toLowerCase()
        .split(" ")
        .join("-")}`,
    );
  }

  function goBackStep() {
    if (!stepBack) return router.refresh();

    router.push(
      `${location.origin}/app/quickstart/${stepBack.url
        .toLowerCase()
        .split(" ")
        .join("-")}`,
    );
  }

  function redirectToApp() {
    router.push("/app");
  }

  return (
    <>
      <CurrentStepComponent />
      <section className="w-full flex justify-center items-center gap-4">
        {stepBack && <PlainButton onClick={goBackStep}>back</PlainButton>}
        {stepNext ? (
          <PrimaryButton onClick={goNextStep}>next</PrimaryButton>
        ) : (
          <PrimaryButton onClick={redirectToApp}>finish</PrimaryButton>
        )}
      </section>
    </>
  );
}
