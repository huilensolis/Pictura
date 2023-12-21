import { ReactNode } from "react";

export type IHeadingProps = {
  children: ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  extraClasses?: string;
};
