import React, { HTMLInputTypeAttribute } from "react";
import {
  type UseFormRegister,
  type RegisterOptions,
  type FieldError,
} from "react-hook-form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  id: string;
  disabled?: boolean;
  error: FieldError | undefined;
  validationScheme: RegisterOptions;
  register: UseFormRegister<any>;
}
