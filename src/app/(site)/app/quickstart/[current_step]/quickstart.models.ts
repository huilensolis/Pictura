import { ReactElement } from "react";

export type IQuickStartStep = {
  url: string;
  component: () => ReactElement;
};
