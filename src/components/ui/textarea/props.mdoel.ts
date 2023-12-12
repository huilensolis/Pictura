import React from "react";
import {
  type UseFormRegister,
  type RegisterOptions,
  type FieldError,
} from "react-hook-form";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  placeholder?: string;
  id: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  error: FieldError | null;
  validationScheme: RegisterOptions;
  register: UseFormRegister<any>;
}
