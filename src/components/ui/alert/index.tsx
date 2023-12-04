import { AlertProps, AlertTypes } from "./alert.models";

import { ErrorAlert } from "./error";
import { InfoAlert } from "./info";
import { SuccesAlert } from "./succes";
import { WarningAlert } from "./warning";

const ALERTCOMPONENTTYPES: AlertTypes = {
  INFO: InfoAlert,
  WARNING: WarningAlert,
  SUCCES: SuccesAlert,
  ERROR: ErrorAlert,
};

export function Alert({
  title,
  type,
  children,
  description,
  onClose,
}: AlertProps) {
  const AlertComponent =
    ALERTCOMPONENTTYPES[type.toUpperCase() as keyof AlertTypes];

  if (!AlertComponent) {
    throw new Error("Alert type is not supported.");
  }

  return (
    <AlertComponent title={title} description={description} onClose={onClose}>
      {children && children}
    </AlertComponent>
  );
}
