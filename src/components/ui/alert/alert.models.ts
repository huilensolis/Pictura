import { ReactNode } from "react";

export type AlertProps = {
  children?: ReactNode;
  title: string;
  type: "info" | "succes" | "error" | "warning";
  description: string;
  onClose?: () => void;
};

export type AlertTypes = {
  INFO: (props: AlertItemProps) => JSX.Element;
  SUCCES: (props: AlertItemProps) => JSX.Element;
  ERROR: (props: AlertItemProps) => JSX.Element;
  WARNING: (props: AlertItemProps) => JSX.Element;
};

export type AlertItemProps = {
  title: string;
  description: string;
  children?: ReactNode;
  onClose?: () => void;
};
