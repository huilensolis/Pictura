import { LucideIcon } from "lucide-react";

export type Option = {
  action: () => void;
  alt: string;
  icon: LucideIcon;
  isDangerous?: boolean;
};
